export type AuthResponse<T> = {
  referenceNumber: number;
  hasError: boolean;
  errorCode: number;
  refId: string;
  message: any[];
  count: number;
  aggregations: number;
  result: T[];
  metaData: any[];
};

export type ResponseValidation<T> = {
  status: number;
  data: {
    statusCode: string;
    errorMessage: string;
    body: T;
  };
};


