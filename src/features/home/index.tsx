import { Collapse } from "@/components";
import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { lazy, Suspense, useEffect, useState } from "react";
import { STAGE } from "./contract.type";
import { ContractFeature } from "./ContractFeature";

const ContractInfoFeature = lazy(() => import("./ContractInfoFeature"));
const VideoVerificationPlaceholderFeature = lazy(
  () => import("./VideoVerificationPlaceholderFeature")
);
const SubmitVideoVerification = lazy(() => import("./SubmitVideoVerification"));

export const HomeFeature = () => {
  const [stage, setStage] = useState<STAGE>(STAGE.OTP);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);



  const renderStages = (stage: STAGE) => {
    switch (stage) {
      case STAGE.OTP:
        return <ContractInfoFeature setStage={setStage} />;
      case STAGE.VERIFICATION_VIDEO_PLACEHOLDER:
        return (
          <VideoVerificationPlaceholderFeature
            setVideoBlob={setVideoBlob}
            setStage={setStage}
          />
        );
      case STAGE.VERIFICATION_VIDEO:
        return (
          <SubmitVideoVerification
            videoBlob={videoBlob}
            setStage={setStage}
            setVideoBlob={setVideoBlob}
          />
        );
    }
  };

  return (
    <div className="my-4 grid lg:grid-cols-12 md:grid-cols-1 gap-5 flex-1">
      <ContractFeature />
      <Suspense fallback={<FullPageLoading />}>{renderStages(stage)}</Suspense>
      <Collapse className="lg:col-span-8 xs:col-span-12" />
    </div>
  );
};
