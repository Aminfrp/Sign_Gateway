export type AuthResponse<T> = {
  refId: string;
  statusCode: string;
  message: string;
  errorCode: number;
  errorMessage: string | null;
  body: T;
};
