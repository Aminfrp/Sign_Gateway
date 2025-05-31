import { UserPrimaryIcon } from "@/assets/icons";
import { Button, Card } from "@/components";
import { useEffect, useRef, useState } from "react";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { ContractSignStatus } from "./components/ContractSignStatus";
import {
  useFaceVerification,
  useFaceVerificationInquiry,
  useShareUploadFile,
  useUploadFile,
} from "./contract.hooks";
import { STAGE, SubmitVideoVerificationProps, UploadFileResponse } from "./contract.type";
import { useSignContractAction } from "./contract.utils";
import { AxiosResponse } from "axios";

const SubmitVideoVerification: React.FC<SubmitVideoVerificationProps> = (
  props
) => {
  const { videoBlob, setStage, setVideoBlob, trackerId, code } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: handleFaceVerification } = useFaceVerification();
  const { mutateAsync: handleFaceVerificationInquiry } =
    useFaceVerificationInquiry();
  const { mutateAsync: handleUploadFile } = useUploadFile();
  const { mutateAsync: handleShareUploadFile } = useShareUploadFile();
  const { sign } = useSignContractAction();
  const [uploadedFileResponse,setUploadedFileResponse] = useState<UploadFileResponse | null>(null);

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
    try {
    let intervalId: number | null = null;
    intervalId = setInterval(async () => {
      const faceVerificationInquiryResponse =
        await handleFaceVerificationInquiry(trackerId);
      if (faceVerificationInquiryResponse.data.body.responseTime === null) {
        await handleFaceVerificationInquiry(trackerId);
      } else {
        if (faceVerificationInquiryResponse.data.body.isLive && faceVerificationInquiryResponse.data.body.verifyStatus===1) {
          await sign(code, trackerId);
          setIsLoading(false);
          clearInterval(intervalId as number);
        } else {
          toast.error("فیلم چهره زنده نمی باشد");
          setIsLoading(false);
          clearInterval(intervalId as number);
        }
      }
    }, 10000);
    }catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };

  const handleSubmitVideo = async () => {
    try {
      if (videoBlob && trackerId) {
        setIsLoading(true);
        if (!uploadedFileResponse) {
          const res = await handleUploadFile(videoBlob);
          setUploadedFileResponse(res.data)
          const hash = res.data?.body?.hash;
          if (!hash) return
          await handleShareUploadFile(hash);
          await handleFaceVerification({
            videoUrl: `https://podspace.sandpod.ir/api/files/${hash}`,
            tracker: trackerId,
          });
          await faceVerificationInquiry();
        }else{
          const hash = uploadedFileResponse?.body?.hash;
          if (!hash) return
          await handleShareUploadFile(hash);
          await handleFaceVerification({
            videoUrl: `https://podspace.sandpod.ir/api/files/${hash}`,
            tracker: trackerId,
          });
          await faceVerificationInquiry();
        }
      }
    } catch (error) {
      console.error("handleSubmitVideo error:", error);
      setIsLoading(false);
      return Promise.reject(error);
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
        <Button
          className="min-h-12 w-full mt-3"
          onClick={handleSubmitVideo}
          disabled={isLoading}
          isLoading={isLoading}
        >
          اعتبار سنجی و امضای سند
        </Button>
      </Card>

      <ContractSignStatus />
    </div>
  );
};

export default SubmitVideoVerification;
