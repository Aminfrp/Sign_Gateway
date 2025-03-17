import { InfoIcon, UserPrimaryIcon } from "@/assets/icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { APP_CONFIG } from "@/constants";
import { useHookForm } from "@/hooks";
import { toEnglishDigits } from "@/lib/utils";
import { queryClient } from "@/main";
import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { SlRefresh } from "react-icons/sl";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { Button, Card, Datepicker, Loading, TextInput } from "../../components";
import { useAuthorize, useGetIP, useHandshake } from "../auth/auth.hooks";
import { ContractSignStatus } from "./components/ContractSignStatus";
import CountDownTimer from "./components/CountDownTimer";
import {
  useGetCaptcha,
  useGetUserInfo,
  useGetUserMe,
  useUpdateUser,
} from "./contract.hooks";
import { schema } from "./contract.schema";
import { ContractInfoProps, UpdateUserType } from "./contract.type";

const ContractInfoFeature: FC<ContractInfoProps> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(true);
  const [authorizeData, setAuthorizeData] = useState();

  const { data: captchaData, isLoading: captchaLoading } = useGetCaptcha();
  const { data: userInfoData } = useGetUserInfo();
  const deviceId = uuid();

  const { CLIENT_ID, SCOPE } = APP_CONFIG;
  const { mutateAsync: handleHandshake, status: handshakeStatus } =
    useHandshake();
  const { mutateAsync: handleAuthorize, status: authorizeStatus } =
    useAuthorize();
  const { mutateAsync: handleGetIP, status: getIpStatus } = useGetIP();
  const { mutateAsync: handleUpdateUser } = useUpdateUser();
  const { data: userMe } = useGetUserMe();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useHookForm<typeof schema>(schema, {
    birthDate: "",
    nationalCode: "",
    captcha: "",
    code: "",
    serial: "",
    userStatus: userInfoData?.status || "",
  });

  useEffect(() => {
    if (userInfoData?.status) {
      setValue("userStatus", userInfoData?.status);
    }
  }, [userInfoData, setValue]);

  useEffect(() => {
    authorizeData && timeIsUp && setTimeIsUp(false);
  }, [authorizeData]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onGetCode = async () => {
    const device_client_ip = await handleGetIP();
    await handleHandshake({
      device_type: "unknown",
      device_uid: deviceId,
      device_client_ip: device_client_ip.ip,
    }).then((res) => {
      localStorage.setItem("keyId", res?.body.keyId as string);
      return handleAuthorize({
        scope: SCOPE,
        identityType: "phone_number",
        response_type: "code",
        keyId: res?.body.keyId as string,
        mobile:
          (localStorage.getItem("phoneNumber") as string) ||
          userMe.phone_number,
        nationalcode:
          (localStorage.getItem("nationalCode") as string) ||
          userMe.nationalcode,
      }).then((res) => {
        setAuthorizeData(res?.body);
      });
    });
  };

  const refetchCaptcha = () => {
    queryClient.refetchQueries({
      queryKey: ["captcha"],
    });
  };

  const updateUserLevel = async (payload: yup.InferType<typeof schema>) => {
    try {
      if (payload.userStatus === "SHAHKAR_OK") {
        await handleUpdateUser({
          nationalcode: payload.nationalCode,
          birthdate: toEnglishDigits(
            new Date(payload.birthDate).toLocaleDateString("fa-IR")
          ),
          nationalcodeSerial: payload.serial,
        });
      } else {
        await handleUpdateUser({
          nationalcodeSerial: payload.serial,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (value: yup.InferType<typeof schema>) => {
    if (
      userInfoData.status === "SHAHKAR_OK" ||
      userInfoData.status === "SABTE_AHVAL_OK"
    ) {
      updateUserLevel(value);
    }
  };

  return (
    <div className="lg:col-span-4 xs:col-span-12 flex flex-col gap-3">
      <Card className="p-10 max-h-max">
        <div className="flex gap-3">
          <div>
            <UserPrimaryIcon />
          </div>
          <div className="space-y-2 flex-1 ">
            <h2 className="text-primary font-yekan-bold text-lg">
              اطلاعات اولیه
            </h2>
            <div className="text-xs">کد ملی و تاریخ تولد خود را وارد کنید</div>
          </div>
        </div>
        <form
          className="flex flex-col gap-5 pt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {userInfoData?.status === "SHAHKAR_OK" && (
            <>
              <Controller
                name="nationalCode"
                control={control}
                render={({ field }) => (
                  <TextInput
                    containerClassName="mt-5"
                    label="کد ملی"
                    placeholder="کد ملی 10 رقمی خود را بنویسید..."
                    {...field}
                    error={errors?.nationalCode?.message}
                  />
                )}
              />

              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <Datepicker
                    label="تاریخ تولد"
                    placeholder="تاریخ تولد خود را بنویسید..."
                    error={errors?.birthDate?.message}
                    onChange={(value) => {
                      field.onChange(value.value);
                    }}
                    value={field.value as any}
                  />
                )}
              />
            </>
          )}
          {userInfoData?.status === "SABTE_AHVAL_OK" ||
          userInfoData?.status === "SHAHKAR_OK" ? (
            <div className="relative">
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => setIsDialogOpen(open)}
              >
                <DialogTrigger>
                  <span
                    className="absolute top-8 left-2 cursor-pointer opacity-50"
                    onClick={() => console.log("open serial card modal")}
                  >
                    <InfoIcon />
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex gap-3 text-end">
                    <div className="space-y-2 flex-1 ">
                      <h2 className="font-yekan-bold text-lg">
                        راهنمای سریال پشت کارت ملی
                      </h2>
                      <div className="text-xs">
                        سریال 10 رقمی مشابه تصویر زیر در پشت کارت ملی شما قرار
                        دارد{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center py-4">
                    <img src="national_card.png" alt="national_card" />
                  </div>
                  <Button
                    className="min-h-12 w-full mt-3"
                    onClick={handleDialogClose}
                  >
                    متوجه شدم
                  </Button>
                </DialogContent>
              </Dialog>

              <Controller
                name="serial"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="سریال پشت کارت ملی"
                    placeholder="متن راهنمای اینپوت"
                    {...field}
                    error={errors?.serial?.message}
                  />
                )}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4 w-full">
            <Controller
              name="captcha"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="کد امنیتی"
                  placeholder="کد امنیتی را وارد کنید ..."
                  containerClassName="flex-1"
                  {...field}
                  error={errors?.captcha?.message}
                />
              )}
            />
            <div className="flex items-center border border-rounded rounded-2xl flex-1 h-14 self-end mb-auto mt-9 min-w-48">
              <div className="flex-1 flex justify-center items-center h-10">
                {captchaLoading ? (
                  <Loading />
                ) : (
                  <img
                    src={captchaData?.data.result.url}
                    className="w-full h-full px-2"
                  />
                )}
              </div>
              <div
                className="border-r h-full flex justify-center items-center rounded-2xl w-16 cursor-pointer"
                onClick={refetchCaptcha}
              >
                <SlRefresh size={20} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full flex-wrap">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="کد تایید"
                  placeholder="کد تایید را وارد کنید ..."
                  containerClassName="flex-1"
                  {...field}
                  error={errors?.code?.message}
                />
              )}
            />

            {timeIsUp && (
              <Button
                type="button"
                className="flex-1  h-14  mb-auto mt-9 min-w-48"
                onClick={onGetCode}
              >
                کد تایید
              </Button>
            )}
            {!timeIsUp && (
              <>
                {!authorizeData && !authorizeData?.expires_in ? (
                  <Button
                    type="button"
                    className="flex-1  h-14 mb-auto mt-9 min-w-48"
                    onClick={onGetCode}
                  >
                    کد تایید
                  </Button>
                ) : (
                  <CountDownTimer
                    initialMinute={0}
                    initialSeconds={authorizeData?.expires_in || 120}
                    disableTimer={() => setTimeIsUp(true)}
                  />
                )}
              </>
            )}
          </div>
          <Button variant="outline">انصراف</Button>
          <Button
            // onClick={() => {
            //   props.setStage(STAGE.VERIFICATION_VIDEO_PLACEHOLDER);
            // }}
            type="submit"
          >
            اعتبارسنجی و امضای سند
          </Button>
        </form>
      </Card>
      <ContractSignStatus />
    </div>
  );
};

export default ContractInfoFeature;
