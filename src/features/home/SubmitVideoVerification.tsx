import { GreenVerifyIcon, UserPrimaryIcon } from "@/assets/icons";
import { Button, Card } from "@/components";
import { useEffect, useRef, useState } from "react";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { STAGE, SubmitVideoVerificationProps } from "./contract.type";

export const SubmitVideoVerification: React.FC<SubmitVideoVerificationProps> = (
  props
) => {
  const { videoBlob, setStage } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (isPlay) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlay]);

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
          </div>
        </div>

        <div className="flex justify-center  items-center max-w-72 aspect-square  flex-col mx-auto mt-5 gap-3 cursor-pointer relative ">
          <div
            className={`flex flex-col items-center justify-center gap-5 rounded-full w-full aspect-square absolute text-white z-10 pointer-events-auto ${
              !isPlay ? "bg-black/60" : ""
            }`}
          >
            <div
              className="cursor-pointer flex flex-col gap-2 items-center font-yekan-bold"
              onClick={() => videoRef.current?.play()}
            >
              {!isPlay ? (
                <CiPlay1 size={35} onClick={() => setIsPlay(true)} />
              ) : (
                <CiStop1 size={35} onClick={() => setIsPlay(false)} />
              )}
              <p>مشاهده ویدیو</p>
            </div>
            <div className="flex justify-center px-2 py-1 border border-dashed items-center rounded-lg text-xs">
              حذف ویدئو <IoTrashOutline />
            </div>
          </div>
          {videoBlob && (
            <video
              src={URL.createObjectURL(videoBlob)}
              className="aspect-square rounded-full object-cover pointer-events-auto"
              ref={videoRef}
              onPlay={() => setIsPlay(true)}
              onEnded={() => setIsPlay(false)}
            ></video>
          )}
        </div>
        <Button
          className="min-h-12 w-full mt-28"
          variant="outline"
          onClick={() => setStage(STAGE.VERIFICATION_VIDEO_PLACEHOLDER)}
        >
          مرحله قبل
        </Button>
        <Button className="min-h-12 w-full mt-3">
          اعتبار سنجی و امضای سند
        </Button>
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
