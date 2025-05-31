import { GreenTickIcon } from "@/assets/icons";
import {Button, Card, Refer, SelectChips} from "@/components";
import withAuth from "@/HOC/AuthHOC";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ContractsContextType } from "@/types";
import { useEffect, useState } from "react";
import { PiClipboardTextLight } from "react-icons/pi";
import { RxCalendar } from "react-icons/rx";

const SignSuccessFeature = () => {
  const [contracts] = useSessionStorage<ContractsContextType>("CONTRACTS");

  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (contracts?.result[0].successfulDeepLink)
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = contracts?.result[0].successfulDeepLink;
      }, 15000);
  }, []);

  return (
    <div className="container mx-auto flex-1 flex flex-col items-center justify-center">
      <Card className="p-8  w-[28.75rem] flex flex-col items-center my-5">
        <GreenTickIcon />
        <div className="text-green-600 font-yekan-bold text-sm py-3">
          سند امضا شد
        </div>
        <Button
          className="w-full"
          onClick={() => {
            if (contracts?.result[0].successfulDeepLink)
              window.location.href = contracts?.result[0].successfulDeepLink;
              localStorage.clear()
              sessionStorage.clear()
          }}
        >
          بازگشت خودکار به سایت مبدا
        </Button>
        <div className="text-slate-400 text-xs py-3">
          بازگشت خودکار تا {seconds} ثانیه دیگر
        </div>
        <hr className="w-full py-2" />
        <div className="self-start pb-3">لیست اسناد:</div>
        <div className="text-bold w-full  pb-5 rounded-xl gap-3 flex flex-wrap">
          {contracts?.result.map((item, index) => (<SelectChips title={item.title} key={item.id}>
          </SelectChips>))}
        </div>
        <hr className="w-full py-2" />
        <div className="flex w-full justify-between items-center py-3">
          <div className="flex text-sm gap-2 text-slate-400 items-center">
            <RxCalendar className="text-slate-400" size={23} />
            تاریخ و ساعت
          </div>
          <div className="text-sm">
            {" "}
            {new Date().toLocaleDateString("fa-IR")}
          </div>
        </div>
        <div className="flex w-full justify-between py-3 items-center">
          <div className="flex text-sm gap-2 text-slate-400 items-center">
            <PiClipboardTextLight className="text-slate-400" size={25} />
            شماره پیگیری
          </div>
          <div className="text-sm">۹۲۸۲۹۸۰۸۲۸۷۲۹۷۱۰۸۹</div>
        </div>
        <hr className="w-full py-2" />
        <div className="text-center text-bold text-sm py-3">کد یکتای سند</div>
        <div className="text-slate-400 text-xs pb-4 w-full text-wrap break-all font-serif" dir="ltr">
          {contracts?.signature}
        </div>
        <div className="w-full min-h-14  bg-gradient-to-r to-[#237ea6] from-[#004080] rounded-xl relative">
          <img src="/digital.png" className="h-full w-full" alt="" />
          <div className="text-white text-sm absolute top-1/2 -translate-y-1/2  left-1/2 transform -translate-x-1/2 w-full text-center">
            اعتبار یافته از گواهی دیجیتال وزارت صمت
          </div>
        </div>
        <Refer />
      </Card>
    </div>
  );
};

export default withAuth(SignSuccessFeature);
