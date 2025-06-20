import { api } from "@/services";
import axios from "axios";
import {
  AuthorizeRequestType,
  AuthorizeResponseType, AutoLoginRequestType,
  HandshakeRequestType,
  HandshakeResponseType,
  VerifyRequestType,
  VerifyResponseType,
} from "./auth.types";

export const services = {
  handshakeService: (data: HandshakeRequestType) =>
    api
      .post<HandshakeRequestType, HandshakeResponseType>(
        "/api/auth/handshake",
        data
      )
      .then((res) => res.data),

  getIPService: () =>
    axios
      .get<{ ip: string }>("https://api.ipify.org/?format=json")
      .then((res) => res.data),
  authorizeService: async (data: AuthorizeRequestType) => {
    const payload = {
      identityType: data.identityType,
      response_type: data.response_type,
      scope: data.scope,
      keyId: data.keyId,
      nationalcode: data.nationalcode,
    };
    type AuthorizeRequest = Omit<AuthorizeRequestType, "mobile">;
    const response = await api.post<AuthorizeRequest, AuthorizeResponseType>(
      `/api/auth/authorize/${data.mobile}`,
      payload
    );
    return response.data;
  },
  verifyService: async (data: VerifyRequestType) => {
    const payload = {
      otp: data.otp,
      keyId: data.keyId,
    };
    type VerifyRequest = Omit<VerifyRequestType, "mobile">;
    const response = await api.post<VerifyRequest, VerifyResponseType>(
      `/api/auth/verify/${data.mobile}`,
      payload
    );
    return response.data;
  },
  autoLoginService: async (data: AutoLoginRequestType) => {
    const payload = {
      code: data.code,
      redirect_uri: data.redirect_uri,
    };
    const response = await api.post<AutoLoginRequestType, VerifyResponseType>(
      `/api/auth/auto_login`,
      payload
    );
    return response.data;
  },
};
