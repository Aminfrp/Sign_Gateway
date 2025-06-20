import { ParaphResponse } from "@/types";

// handshake
export type HandshakeRequestType = {
  device_uid: string;
  device_client_ip: string;
  device_type: string;
};

type Client = {
  accessTokenExpiryTime: number;
  active: boolean;
  autoLoginAs: boolean;
  client_id: string;
  id: number;
  limitedLoginAs: boolean;
  loginAsDepositEnabled: boolean;
  loginUrl: string;
  name: string;
  otpCodeExpiryTime: number;
  refreshTokenExpiryTime: number;
  signupEnabled: boolean;
  supportNumber: string;
  twoFAEnabled: boolean;
  url: string;
};

type Device = {
  current: boolean;
  language: string;
  location: any[];
  uid: string;
};

type HandshakeResponse = {
  algorithm: string;
  client: Client;
  device: Device;
  expires_in: number;
  keyFormat: string;
  keyId: string;
  publicKey: string;
};

export type HandshakeResponseType = ParaphResponse<HandshakeResponse>;

// authorize
export type AuthorizeRequestType = {
  identityType: string;
  response_type: string;
  scope: string;
  keyId: string;
  mobile: string;
  nationalcode: string;
};

export type AuthorizeResponse = {
  expires_in: number;
  identity: string;
  type: string;
  sent_before: boolean;
  codeLength: number;
};
export type AuthorizeResponseType = ParaphResponse<AuthorizeResponse>;

// verify
export type VerifyRequestType = {
  keyId: string;
  mobile: string;
  otp: string;
};

type VerifyResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};
export type VerifyResponseType = ParaphResponse<VerifyResponse>;

export type AutoLoginRequestType = {
  redirect_uri: string;
  code: string;
};
