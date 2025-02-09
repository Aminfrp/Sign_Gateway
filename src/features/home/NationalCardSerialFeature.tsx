import { GreenVerifyIcon, UserPrimaryIcon } from "@/assets/icons";
import { Card } from "@/components";
import { FC } from "react";
import { NationalCardSerialForm } from "./components/NationalCardSerialForm";
import { NationalCardSerialProps } from "./contract.type";

export const NationalCardSerialFeature: FC<NationalCardSerialProps> = (
  props
) => {
  return (
    <div className="lg:col-span-4 xs:col-span-12 flex flex-col gap-3">
      <Card className="max-h-max p-10">
        <div className="flex gap-3">
          <div>
            <UserPrimaryIcon />
          </div>
          <div className="space-y-2 flex-1 ">
            <h2 className="text-primary font-yekan-bold text-lg">
              سریال کارت ملی
            </h2>
            <div className="text-xs">
              سریال 10 رقمی پشت کارت ملی خود را وارد کنید
            </div>
          </div>
        </div>
        <NationalCardSerialForm setStage={props.setStage} />
      </Card>
      <Card className="p-[2.5rem] max-h-max">
        <div className=" font-yekan-bold">پیش‌نیازهای امضای سند</div>

        <div className="flex justify-between gap-3 items-center pt-10 border-b border-dashed pb-3  flex-wrap">
          <div>
            <img src="level.png" alt="" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-yekan-bold">احراز هویت سطح 3</p>
            <p className="text-slate-400 text-sm">مورد نیاز برای درگاه</p>
          </div>
          <div className="text-green-600 flex justify-center gap-3 items-center bg-green-600/10 px-3 py-2 rounded-lg">
            <GreenVerifyIcon /> احراز هویت موفق
          </div>
        </div>

        <div className="flex justify-between gap-3 items-center pt-3 flex-wrap">
          <div>
            <img src="auth.png" alt="" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-yekan-bold">احراز هویت ویدیویی</p>
            <p className="text-slate-400 text-sm">نیازمند وبکم</p>
          </div>
          <div className="text-green-600 flex justify-center gap-3 items-center bg-green-600/10 px-3 py-2 rounded-lg">
            <GreenVerifyIcon /> احراز هویت موفق
          </div>
        </div>
      </Card>
    </div>
  );
};
