import { CrossIcon } from "@/assets/icons";
import {Button, Card, Refer, SelectChips} from "@/components";
import withAuth from "@/HOC/AuthHOC";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ContractContextType } from "@/types";
import { useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { useNavigate } from "react-router";
import {RxCalendar} from "react-icons/rx";
import {PiClipboardTextLight} from "react-icons/pi";

const SignFailedFeature = () => {
  const [contract] = useSessionStorage<ContractContextType>("CONTRACT");
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (contract?.result.unsuccessfulDeepLink)
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = contract?.result.unsuccessfulDeepLink;
      }, 15000);
  }, []);

  return (
    <div className="container mx-auto flex-1 flex flex-col items-center justify-center">
      <Card className="p-8 h-[42rem] w-[28.75rem] flex flex-col items-center">
        <CrossIcon />
        <div className="text-red-600 font-yekan-bold text-sm py-3">
          امضای سند با مشکل مواجه شد!{" "}
        </div>
        <Button
          className="w-full mb-3"
          onClick={() => navigate(`/?sign=${contract?.signature}`)}
        >
          <LuRefreshCw />
          احراز هویت مجدد
        </Button>

        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            if (contract?.result.unsuccessfulDeepLink)
              window.location.href = contract?.result.unsuccessfulDeepLink;
            localStorage.clear()
            sessionStorage.clear()
          }}
        >
          بازگشت خودکار به سایت مبدا
        </Button>
        <div className="text-slate-400 text-xs py-3">
          بازگشت خودکار تا {seconds} ثانیه دیگر
        </div>

          <div className="pb-3">{contract?.result.title}</div>
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
        <div className="mt-auto">
          <Refer />
        </div>
      </Card>
    </div>
  );
};

export default withAuth(SignFailedFeature);
