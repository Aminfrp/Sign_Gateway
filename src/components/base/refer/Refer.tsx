import { Android, ParaphLogo, Windows } from "@/assets/images";

export const Refer = () => {
  return (
    <div className="flex items-center border py-4  px-3 rounded-2xl gap-2 mt-5">
      <div>
        <ParaphLogo />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold">دانلود اپلیکیشن پاراف</h3>
        <div className="text-xs text-slate-400">
          برای دسترسی به سند و رسید کامل امضا، پاراف را دانلود کنید.
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 text-xs border rounded-lg p-1 flex-1">
            <Android />
            <p>دانلود نسخه اندروید</p>
          </div>
          <div className="flex gap-2 text-xs border rounded-lg p-1 flex-1">
            <Windows />
            <p>دانلود نسخه ویندوز</p>
          </div>
        </div>
      </div>
    </div>
  );
};
