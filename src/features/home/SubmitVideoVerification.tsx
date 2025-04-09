import { UserPrimaryIcon } from "@/assets/icons";
import { Button, Card } from "@/components";
import { useEffect, useRef, useState } from "react";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { ContractSignStatus } from "./components/ContractSignStatus";
import { services } from "./contract.api";
import {
  useFaceVerification,
  useFaceVerificationInquiry,
} from "./contract.hooks";
import { STAGE, SubmitVideoVerificationProps } from "./contract.type";

const SubmitVideoVerification: React.FC<SubmitVideoVerificationProps> = (
  props
) => {
  const { videoBlob, setStage, setVideoBlob, trackerId } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const { mutateAsync: handleFaceVerification } = useFaceVerification();
  const { mutateAsync: handleFaceVerificationInquiry } =
    useFaceVerificationInquiry();

  useEffect(() => {
    if (isPlay) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [isPlay]);

  useEffect(() => {
    if (!videoBlob) {
      setStage(STAGE.VERIFICATION_VIDEO_PLACEHOLDER);
    }
  }, [videoBlob]);

  const faceVerificationInquiry = () => {
    let intervalId: number | null = null;
    intervalId = setInterval(async () => {
      const faceVerificationInquiryResponse =
        await handleFaceVerificationInquiry(trackerId);
      if (faceVerificationInquiryResponse.status === 400) {
        handleFaceVerificationInquiry(trackerId);
      } else {
        clearInterval(intervalId as number);
      }
    }, 20000);
  };

  const handleSubmitVideo = async () => {
    try {
      if (videoBlob && trackerId) {
        const uploadedFileResponse = await services.uploadFile(videoBlob);
        await handleFaceVerification({
          videoUrl: `https://podspace.sandpod.ir/api/files/${uploadedFileResponse.data.body.hash}`,
          tracker: trackerId,
        });

        faceVerificationInquiry();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <div
              className="flex justify-center px-2 py-1 border border-dashed items-center rounded-lg text-xs"
              onClick={() => setVideoBlob(null)}
            >
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
        <Button className="min-h-12 w-full mt-3" onClick={handleSubmitVideo}>
          اعتبار سنجی و امضای سند
        </Button>
      </Card>

      <ContractSignStatus />
    </div>
  );
};

export default SubmitVideoVerification;
