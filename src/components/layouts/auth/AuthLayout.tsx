import { ParaphLogo } from "@/assets/images";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <main className="grid lg:grid-cols-2 xs:gird-cols-1 m-10" dir="rtl">
      <div className="flex flex-col justify-between">
        <span className="size-28 lg:block xs:hidden">
          <ParaphLogo />
        </span>
        <Outlet />
        <div className="text-center text-sm text-slate-600 py-5">
          تمامی حقوق برای پاراف محفوظ است.
        </div>
      </div>
      <div
        style={{ background: "url(/bg.png)" }}
        className="rounded-xl flex flex-col items-center justify-center gap-3  lg:flex xs:hidden"
      >
        <div className="text-white font-yekan-bold">
          درگاه امضای دیجیتال پاراف{" "}
        </div>
        <div className="text-slate-400 text-center w-96">
            سریع‌ترین راهکار امضای الکترونیکی مطمئن
        </div>
      </div>
    </main>
  );
};
