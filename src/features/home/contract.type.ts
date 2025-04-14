import { ParaphResponse } from "@/types";

// enums
export enum STAGE {
  OTP = "OTP",
  NATIONAL_CARD_SERIAL_NUMBER = "NATIONAL_CARD_SERIAL_NUMBER",
  VERIFICATION_VIDEO_PLACEHOLDER = "VERIFICATION_VIDEO_PLACEHOLDER",
  VERIFICATION_VIDEO = "VERIFICATION_VIDEO",
}

export enum USER_LEVEL_STATUS {
  SHAHKAR_OK = "SHAHKAR_OK",
  SABTE_AHVAL_OK = "SABTE_AHVAL_OK",
  IMAGE_SABTEAHVAL_OK = "IMAGE_SABTEAHVAL_OK",
  IMAGE_COMPARE_OK = "IMAGE_COMPARE_OK",
}

// components props types
export type SubmitVideoVerificationProps = {
  videoBlob: Blob | null;
  trackerId: string;
  code: string;
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
};

export type VideoVerificationFeatureProps = {
  setVideoBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
  setTrackerId: React.Dispatch<React.SetStateAction<string>>;
};

export type NationalCardSerialProps = {
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
};

export type ContractInfoProps = {
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

// services types
type ContractBody = {
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
    faceVerificationForced: boolean;
  };
};

export type ContractResponseFromLink = ParaphResponse<ContractBody>;

type CaptchaBody = {
  url: string;
  hash: string;
};
export type CaptchaResponse = ParaphResponse<CaptchaBody>;

type CallerClient = {
  email_verified: boolean;
  given_name: string;
  hasPassword: boolean;
  id: number;
  nationalcode_serial_verified: boolean;
  nationalcode_verified: boolean;
  phone_number_verified: boolean;
  preferred_username: string;
};

type LegalInfo = {
  birthDate: string;
  bookNo: number;
  deathStatus: string;
  fatherName: string;
  firstName: string;
  gender: string;
  identifierNumber: string;
  identifierSeri: string;
  identifierSerial: string;
  inquiryDate: string;
  lastName: string;
  nationalCode: string;
  officeCode: number;
  officeName: string;
  postalCode: number;
  postalCodeDescription: string;
};

export type LegalInquireStatus = {
  answerFromCoreTime: string | null;
  callerClient: CallerClient;
  inquiryTime: number;
  inquiryTimeShamsi: string;
  inquiryType: string;
  insertTime: number;
  insertTimeShamsi: string;
  lastUpdateTime: number;
  lastUpdateTimeShamsi: string;
  legalAuthority: string;
  nationalcode: string;
  notifyToCoreTime: string | null;
  phoneNumber: string | null;
  status: string;
  tryCount: number;
  birthdate: string | null;
};

export type UserInfoBody = {
  birthdate: string;
  bpiCustomerNumber: string;
  email_verified: boolean;
  exchangecode_verified: boolean;
  family_name: string;
  foreigncode_verified: boolean;
  given_name: string;
  hasNotinouProfile: boolean;
  hasPassword: boolean;
  id: number;
  legalInfo: LegalInfo;
  legalInquireStatus: LegalInquireStatus[];
  legalNationalCode_verified: boolean;
  nationalcode: string;
  nationalcode_serial_verified: boolean;
  nationalcode_verified: boolean;
  nationalcode_verifiers: number[];
  phone_number: string;
  phone_number_verified: boolean;
  phone_number_verifiers: number[];
  physical_verified: boolean;
  physical_verifiers: number[];
  physical_verify_type: string[];
  preferred_username: string;
  registerTime: number;
  registerTimeShamsi: string;
  scope: string;
  sejamcode_verified: boolean;
  sub: string;
  updated_at: number;
  updated_at_shamsi: string;
  zoneinfo: string;
};

export type UserInfoResponse = ParaphResponse<UserInfoBody>;

type FVCaptchaBody = {
  motionCaptcha: string;
  expirationTime: number;
  tracker: string;
};

export type FVCaptchaResponse = ParaphResponse<FVCaptchaBody>;

type UploadFileBody = {
  hash: string;
  parentHash: string;
};

export type UploadFileResponse = ParaphResponse<UploadFileBody>;

export type UpdateUserPayload = {
  nationalcodeSerial?: string;
  birthdate?: string;
};

export type FaceVerificationPayload = {
  videoUrl: string;
  tracker: string;
};

type FaceVerification = {
  retryCount: number;
  verifyStatus: number;
  expectedMotionCaptcha: string | null;
  inferenceMotionCaptcha: string | null;
  expirationTime: number;
  isLive: boolean;
  isSuspicious: boolean;
  live: boolean;
  liveConfidence: number;
  suspicious: boolean;
  uploadedTime: number;
};

export type FaceVerificationResponse = ParaphResponse<FaceVerification>;

type ShareUploadFile = {
  hash: string;
  entity: {
    hash: string;
  };
};

export type ShareUploadFileResponse = ParaphResponse<ShareUploadFile>;

export type ShareUploadFileRequest = {
  fileHash: string;
  persons: string;
  identityType: string;
};
