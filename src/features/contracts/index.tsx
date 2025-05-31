import { Collapse } from "@/components";
import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { lazy, Suspense, useState } from "react";
import { STAGE } from "./contract.type";
import {ContractsContentFeature} from "@/features/contracts/ContractsContentFeature";

const ContractsInfoFeature = lazy(() => import("./ContractsInfoFeature"));
const VideoVerificationPlaceholderFeature = lazy(
  () => import("./VideoVerificationPlaceholderFeature")
);
const SubmitVideoVerification = lazy(() => import("./SubmitVideoVerification"));

export const ContractsFeature = () => {
  const [stage, setStage] = useState<STAGE>(STAGE.OTP);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [trackerId, setTrackerId] = useState<string>("");
  const [code,setCode] = useState<string>("");
  
  const renderStages = (stage: STAGE) => {
    switch (stage) {
      case STAGE.OTP:
        return <ContractsInfoFeature setStage={setStage} setCode={setCode} />;
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
      <ContractsContentFeature />
      <Suspense fallback={<FullPageLoading />}>{renderStages(stage)}</Suspense>
      <Collapse className="lg:col-span-8 xs:col-span-12" />
    </div>
  );
};
