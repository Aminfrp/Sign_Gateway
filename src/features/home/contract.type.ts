export enum STAGE {
  OTP = "OTP",
  NATIONAL_CARD_SERIAL_NUMBER = "NATIONAL_CARD_SERIAL_NUMBER",
  VERIFICATION_VIDEO_PLACEHOLDER = "VERIFICATION_VIDEO_PLACEHOLDER",
  VERIFICATION_VIDEO = "VERIFICATION_VIDEO",
}

export type SubmitVideoVerificationProps = {
  videoBlob: Blob | null;
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
};

export type VideoVerificationFeatureProps = {
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
};


export type NationalCardSerialProps = {
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
};

export type ContractInfoProps = {
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
};

// services types
type ContractBody =  {
  result: {
    id: number;
    successfulDeepLink: string;
    unsuccessfulDeepLink: string;
    activeTime: number | null;
    expirationTime: number;
    signerName: string;
    initiatorName: string;
    title: string;
    description: string;
    downloadLink: string;
  };
}

export type ContractResponseFromLink = {
  refId: string;
  statusCode: string;
  message: string;
  errorCode: number;
  errorMessage: string | null;
  body: ContractBody;
};