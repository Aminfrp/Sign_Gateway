import { Collapse } from "@/components";
import { useState } from "react";
import { STAGE } from "./contract.type";
import { ContractFeature } from "./ContractFeature";
import { ContractInfoFeature } from "./ContractInfoFeature";
import { SubmitVideoVerification } from "./SubmitVideoVerification";
import { VideoVerificationPlaceholderFeature } from "./VideoVerificationPlaceholderFeature";

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
      {renderStages(stage)}
      <Collapse className="lg:col-span-8 xs:col-span-12" />
    </div>
  );
};
