import { ChatIcon } from "@/assets/icons";
import { Button } from "@/components";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { APP_CONFIG } from "@/constants";
import { useHookForm } from "@/hooks";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { EditIcon, RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { useAuthorize, useGetIP, useHandshake, useVerify } from "./auth.hooks";
import { verifySchema } from "./auth.schema";
import {ContractContextType, ContractsContextType} from "@/types";

export const OTPFeature = () => {
  const { BASE_URL, CLIENT_ID, SCOPE } = APP_CONFIG;
  const navigate = useNavigate();
  const deviceId = uuid();
  const { mutateAsync: handleVerifyOTP, status: verifyStatus } = useVerify();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useHookForm<typeof verifySchema>(verifySchema, {
    code: "",
  });
  const { mutateAsync: handleGetIP, status: getIpStatus } = useGetIP();
  const { mutateAsync: handleHandshake, status: handshakeStatus } =
    useHandshake();
  const { mutateAsync: handleAuthorize, status: authorizeStatus } =
    useAuthorize();
  const [contract] = useSessionStorage<ContractContextType>("CONTRACT");
  const [contracts] = useSessionStorage<ContractsContextType>("CONTRACTS");

  const [expireIn, setExpireIn] = useState<number>(
    parseInt(localStorage.getItem("expire_in") || "0")
  );
  const [timerActive, setTimerActive] = useState<boolean>(expireIn > 0);

  useEffect(() => {
    if (expireIn > 0) {
      const interval = setInterval(() => {
        setExpireIn((prevExpireIn) => {
          if (prevExpireIn <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return prevExpireIn - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expireIn]);

  const onSubmit = async (values: yup.InferType<typeof verifySchema>) => {
    await handleVerifyOTP({
      mobile: localStorage.getItem("phoneNumber") as string,
      otp: values.code,
      keyId: localStorage.getItem("keyId") as string,
    }).then((res) => {
      localStorage.setItem("token", res?.body.access_token);
      localStorage.setItem("refreshToken", res?.body.refresh_token);
      contract?navigate(`/?sign=${contract?.signature as string}`):navigate(`/contracts?sign=${contracts?.signature as string}`);
    });
  };

  const handleResendCode = async () => {
    setExpireIn(60);
    setTimerActive(true);
    localStorage.setItem("expire_in", "60");
    const device_client_ip = await handleGetIP();
    await handleHandshake({
      device_client_ip: device_client_ip.ip,
      device_type: "unknown",
      device_uid: deviceId,
    })
      .then((res) => {
        localStorage.setItem("keyId", res?.body.keyId as string);

        return handleAuthorize({
          scope: SCOPE,
          identityType: "phone_number",
          response_type: "code",
          keyId: res?.body.keyId as string,
          mobile: localStorage.getItem("phoneNumber") as string,
          nationalcode: localStorage.getItem("nationalCode") as string,
        });
      })
      .then((res) => {
        localStorage.setItem(
          "expire_in",
          ("" + res?.body.expires_in) as string
        );
        localStorage.setItem(
          "phoneNumber",
          localStorage.getItem("phoneNumber") as string
        );
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:p-8 xs:p-0 h-full lg:w-[28.75rem] xs:w-full flex flex-col"
    >
      <div className="flex md:justify-center xs:justify-start">
        <ChatIcon />
      </div>
      <h1 className=" font-yekan-bold pb-2 mt-5 md:text-center xs:text-start">
        کد تایید
      </h1>
      <div className="text-slate-500 text-sm flex items-center md:justify-center xs:justify-start  gap-1">
        کد تایید به شماره {localStorage.getItem("phoneNumber")} ارسال شد{" "}
      </div>

      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            {...field}
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      <div className="text-slate-500 text-sm pt-4 md:text-center xs:text-start">
        {timerActive ? (
          <>{expireIn} ثانیه تا دریافت دوباره کد</>
        ) : (
          <div
            onClick={handleResendCode}
            className="flex  items-center gap-3 justify-center text-primary cursor-pointer"
          >
            ارسال کد مجدد
            <RefreshCwIcon size={15} />
          </div>
        )}
      </div>

      <div className="flex flex-col pt-8 gap-4 mt-auto items-center">
        <Link
          to="/auth/login"
          className="flex items-center gap-1 text-primary cursor-pointer"
        >
          <EditIcon />
          ویرایش شماره همراه
        </Link>
        <Button
          className="w-full"
          disabled={!isValid || verifyStatus === "pending"}
          isLoading={verifyStatus === "pending"}
        >
          تایید
        </Button>
      </div>
    </form>
  );
};
