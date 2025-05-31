export type ParaphResponse<T> = {
  refId: string;
  statusCode: string;
  message: string;
  errorCode: number;
  errorMessage: string | null;
  body: T;
};

type ContractData = {
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

export type ContractsContextType = {
  result: ContractData[];
  signature: string;
};

export type ContractContextType = {
  result: ContractData;
  signature: string;
};
