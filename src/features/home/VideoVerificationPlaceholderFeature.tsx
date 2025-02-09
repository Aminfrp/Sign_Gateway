import { UserPrimaryIcon } from "@/assets/icons";
import { Button, Card } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { VideoVerificationFeature } from "./VideoVerificationFeature";
import { ContractSignStatus } from "./components/ContractSignStatus";
import { STAGE, VideoVerificationFeatureProps } from "./contract.type";

const VideoVerificationPlaceholderFeature: FC<VideoVerificationFeatureProps> = (
  props
) => {
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
          onClick={() => setStage(STAGE.OTP)}
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

      <ContractSignStatus />
    </div>
  );
};

export default VideoVerificationPlaceholderFeature;
