import { GreenTickIcon } from "@/assets/icons";
import { Button, Card, Refer } from "@/components";
import { PiClipboardTextLight } from "react-icons/pi";
import { RxCalendar } from "react-icons/rx";

export const SignSuccessFeature = () => {
  return (
    <Card className="p-8  w-[28.75rem] flex flex-col items-center">
      <GreenTickIcon />
      <div className="text-green-600 font-yekan-bold text-sm py-3">
        سند امضا شد
      </div>
      <Button className="w-full">بازگشت خودکار به سایت مبدا</Button>
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
      <div className="text-center text-bold text-sm py-3">کد یکتای سند</div>
      <div className="text-slate-400 text-xs pb-4">
        HKP25DH26WLKV93DKLD58DLOD3VJS32SDFJ235
      </div>
      <div className="w-full min-h-14  bg-gradient-to-r to-[#237ea6] from-[#004080] rounded-xl relative">
        <img src="/digital.png" className="h-full w-full" alt="" />
        <div className="text-white text-sm absolute top-1/2 -translate-y-1/2  left-1/2 transform -translate-x-1/2 w-full text-center">
          اعتبار یافته از گواهی دیجیتال وزارت صمت
        </div>
      </div>
      <Refer />
    </Card>
  );
};
