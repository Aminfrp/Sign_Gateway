import { CrossIcon } from "@/assets/icons";
import { Button, Card, Refer } from "@/components";
import { LuRefreshCw } from "react-icons/lu";
import { PiClipboardTextLight } from "react-icons/pi";
import { RxCalendar } from "react-icons/rx";

export const SignFailedFeature = () => {
  return (
    <Card className="p-8 h-[42rem] w-[28.75rem] flex flex-col items-center">
      <CrossIcon />
      <div className="text-red-600 font-yekan-bold text-sm py-3">
        امضای سند با مشکل مواجه شد!{" "}
      </div>
      <Button className="w-full mb-3">
        <LuRefreshCw />
        احراز هویت مجدد
      </Button>

      <Button className="w-full" variant="outline">
        بازگشت خودکار به سایت مبدا
      </Button>
      <div className="text-slate-400 text-xs py-3">
        بازگشت خودکار تا ۱۵ ثانیه دیگر
      </div>
      <div className="text-bold border-b text-center w-full pb-3 pt-5">
        سند همکاری بهنام جعفری با اسنپ فود
      </div>
      <div className="flex w-full justify-between items-center py-3">
        <div className="flex text-sm gap-2 text-slate-400 items-center">
          <RxCalendar className="text-slate-400" size={23} />
          تاریخ و ساعت
        </div>
        <div className="text-sm"> ۲۰/ اسفند/۱۴۰۱-۲۰:۴۰</div>
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
  );
};
