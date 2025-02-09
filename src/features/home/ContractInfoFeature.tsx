import { GreenVerifyIcon, UserPrimaryIcon } from "@/assets/icons";
import { FC } from "react";
import { SlRefresh } from "react-icons/sl";
import { Button, Card, Datepicker, TextInput } from "../../components";
import { ContractInfoProps, STAGE } from "./contract.type";

export const ContractInfoFeature: FC<ContractInfoProps> = (props) => {
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
        <div className="flex flex-col gap-5 pt-5">
          <TextInput
            label="کد ملی"
            placeholder="کد ملی 10 رقمی خود را بنویسید..."
          />
          <Datepicker
            onChange={() => {}}
            value={null}
            label="تاریخ تولد"
            placeholder="تاریخ تولد خود را بنویسید..."
          />
          <div className="flex gap-4 w-full">
            <TextInput
              label="کد امنیتی"
              placeholder="کد امنیتی را وارد کنید ..."
              containerClassName="flex-1"
            />
            <div className="flex items-center border border-rounded rounded-2xl flex-1 h-14 self-end">
              <div className="flex-1 flex justify-center items-center h-10">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWpP10u8DWOFTeXZUCsDuV_JUVfzrrca_XyQ&s"
                  className="w-14 h-full"
                />
              </div>
              <div className="border-r h-full flex justify-center items-center rounded-2xl w-16">
                <SlRefresh size={20} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <TextInput
              label="کد تایید"
              placeholder="کد تایید را وارد کنید ..."
              containerClassName="flex-1"
            />
            <div className="flex items-center justify-center border border-rounded rounded-2xl flex-1  h-14  self-end bg-muted text-slate-400">
              1:59
            </div>
          </div>
          <Button variant="outline">انصراف</Button>
          <Button
            onClick={() => {
              props.setStage(STAGE.NATIONAL_CARD_SERIAL_NUMBER);
            }}
          >
            امضای سند
          </Button>
        </div>
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
