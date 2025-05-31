import { Collapse } from "@/components";
import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { lazy, Suspense, useState } from "react";
import { STAGE } from "./contract.type";
import { ContractContentFeature } from "./ContractContentFeature";

const ContractInfoFeature = lazy(() => import("./ContractInfoFeature"));
const VideoVerificationPlaceholderFeature = lazy(
  () => import("./VideoVerificationPlaceholderFeature")
);
const SubmitVideoVerification = lazy(() => import("./SubmitVideoVerification"));

export const ContractFeature = () => {
  const [stage, setStage] = useState<STAGE>(STAGE.OTP);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [trackerId, setTrackerId] = useState<string>("");
  const [code,setCode] = useState<string>("");
  
  const renderStages = (stage: STAGE) => {
    switch (stage) {
      case STAGE.OTP:
        return <ContractInfoFeature setStage={setStage} setCode={setCode} />;
      case STAGE.VERIFICATION_VIDEO_PLACEHOLDER:
        return (
          <VideoVerificationPlaceholderFeature
            setVideoBlob={setVideoBlob}
            setStage={setStage}
            setTrackerId={setTrackerId}
          />
        );
      case STAGE.VERIFICATION_VIDEO:
        return (
          <SubmitVideoVerification
            videoBlob={videoBlob}
            setStage={setStage}
            setVideoBlob={setVideoBlob}
            trackerId={trackerId}
            code={code}
          />
        );
    }
  };

  return (
    <div className="my-4 grid lg:grid-cols-12 md:grid-cols-1 gap-5 flex-1">
      <ContractContentFeature />
      <Suspense fallback={<FullPageLoading />}>{renderStages(stage)}</Suspense>
      <Collapse className="lg:col-span-8 xs:col-span-12" />
    </div>
  );
};
