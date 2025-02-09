import { AuthResponse } from "@/types";

// handshake
export type HandshakeRequestType = {
  device_uid: string;
  businessClientId: string;
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

export type HandshakeResponseType = AuthResponse<HandshakeResponse>;

// authorize
export type AuthorizeRequestType = {
  keyId: string;
  businessClientId: string;
  mobile: string;
  scope: string;
};

type AuthorizeResponse = {
  expires_in: number;
  identity: string;
  type: string;
  sent_before: boolean;
  codeLength: number;
};
export type AuthorizeResponseType = AuthResponse<AuthorizeResponse>;

// verify
export type VerifyRequestType = {
  keyId: string;
  businessClientId: string;
  mobile: string;
  code: string;
};

type VerifyResponse = {
  code: string;
  device_uid: string;
  state: string;
};
export type VerifyResponseType = AuthResponse<VerifyResponse>;

// token
export type TokenRequestType = {
  keyId: string;
  businessClientId: string;
  mobile: string;
  code: string;
};

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};
export type TokenResponseType = AuthResponse<TokenResponse>;
