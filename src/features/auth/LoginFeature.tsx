import { PodIcon } from "@/assets/icons";
import { Button, TextInput } from "@/components";
import { variables } from "@/constants";
import { useHookForm } from "@/hooks";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { useAuthorize, useHandshake } from "./auth.hooks";
import { schema } from "./auth.schema";

export const LoginFeature = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useHookForm<typeof schema>(schema, {
    phoneNumber: localStorage.getItem("phoneNumber") || "",
  });
  const { mutateAsync: handleHandshake, status: handshakeStatus } =
    useHandshake();
  const { mutateAsync: handleAuthorize, status: authorizeStatus } =
    useAuthorize();

  const deviceId = uuid();
  const navigate = useNavigate();
  const onSubmit = async (value: yup.InferType<typeof schema>) => {
    await handleHandshake({
      businessClientId: variables.clientId,
      device_type: "unknown",
      device_uid: deviceId,
    })
      .then((res) => {
        localStorage.setItem("keyId", res?.result[0].keyId as string);
       
        return handleAuthorize({
          businessClientId: variables.clientId,
          keyId: res?.result[0].keyId as string,
          mobile: value.phoneNumber,
          scope: variables.scope,
        });
      })
      .then((res) => {
         localStorage.setItem(
           "expire_in",
           ("" + res?.result[0].expires_in) as string
         );
        localStorage.setItem("phoneNumber", value.phoneNumber);
        navigate("/auth/otp");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:p-8 xs:p-0 h-[42rem] flex flex-col"
    >
      <h1 className="text-lg font-yekan-bold pb-3">ورود و ثبت‌نام </h1>
      <div className="text-slate-500 text-xs pb-5">
        برای امضای سند شماره همراه و کد ملی خود را بنویسید{" "}
      </div>

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextInput
            containerClassName="mt-5"
            label="شماره همراه"
            placeholder="مثال: 09106867426"
            {...field}
            error={errors?.phoneNumber?.message}
          />
        )}
      />

      <TextInput
        containerClassName="mt-5"
        label="کد ملی"
        placeholder="مثال: 0123456789"
      />
      <div className="mt-auto flex flex-col pt-3 gap-4 text-center">
        <div className="text-xs pt-16">
          ورود به شما به معنای موافقت با شرایط استفاده از{" "}
          <span className="text-primary mx-1 inline-block cursor-pointer">
            خدمات پاراف
          </span>
          است.
        </div>
        <Button
          type="submit"
          disabled={
            authorizeStatus === "pending" ||
            handshakeStatus === "pending" ||
            !isValid
          }
          isLoading={
            authorizeStatus === "pending" || handshakeStatus === "pending"
          }
        >
          ورود به درگاه امضا{" "}
        </Button>
        <div className="flex gap-2 items-center">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-slate-100 to-transparent rounded-full"></div>
          <div className="text-xs">یا</div>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-slate-100 to-transparent rounded-full"></div>
        </div>
        <Button variant="outline">
          <PodIcon />
          ورود از طریق پاد
        </Button>
      </div>
    </form>
  );
};
