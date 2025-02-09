import { GreenVerifyIcon, UserPrimaryIcon } from "@/assets/icons";
import { Button, Card } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { VideoVerificationFeature } from "./VideoVerificationFeature";
import { STAGE, VideoVerificationFeatureProps } from "./contract.type";

export const VideoVerificationPlaceholderFeature: FC<
  VideoVerificationFeatureProps
> = (props) => {
  const { setVideoBlob, setStage } = props;
  const [showVideoVerificationDialog, setShowVideoVerificationDialog] =
    useState(false);
  return (
    <div className="lg:col-span-4 xs:col-span-12 flex flex-col gap-3">
      <Card className="p-[2.5rem]">
        <div className="flex gap-3">
          <div>
            <UserPrimaryIcon />
          </div>
          <div className="space-y-2 flex-1 ">
            <h2 className="text-primary font-yekan-bold text-lg">
              ثبت فیلم چهره
            </h2>
            <div className="text-xs">
              مطابق با راهنما فیلم چهره خود را ضبط کنید
            </div>
          </div>
        </div>
        <div className="rounded-full border max-w-72 aspect-square  flex justify-center items-center flex-col mx-auto mt-5 gap-3 cursor-pointer">
          <div>
            <HiOutlineVideoCamera size={25} className="text-slate-500" />
          </div>
          <div className="text-xs text-slate-500">برای ضبط فیلم لمس کنید</div>
        </div>
        <Button
          className="min-h-12 w-full mt-28"
          variant="outline"
          onClick={() => setStage(STAGE.NATIONAL_CARD_SERIAL_NUMBER)}
        >
          مرحله قبل
        </Button>
        <Button
          className="min-h-12 w-full mt-3"
          onClick={() => {
            setShowVideoVerificationDialog(true);
          }}
        >
          ضبط فیلم چهره
        </Button>
      </Card>

      <Dialog
        onOpenChange={(val) => setShowVideoVerificationDialog(val)}
        open={showVideoVerificationDialog}
      >
        <DialogContent className="px-8 pt-8 bg-black border-none min-h-max">
          <VideoVerificationFeature
            setVideoBlob={setVideoBlob}
            setStage={setStage}
          />
        </DialogContent>
      </Dialog>

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
