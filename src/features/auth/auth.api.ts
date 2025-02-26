import { api } from "@/services";
import axios, { AxiosResponse } from "axios";
import {
  AuthorizeRequestType,
  AuthorizeResponseType,
  HandshakeRequestType,
  HandshakeResponseType,
  TokenRequestType,
  TokenResponseType,
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
    };
    type AuthorizeRequest = Omit<AuthorizeRequestType, "keyId" | "mobile">;
    const response = await api.post<AuthorizeRequest, AuthorizeResponseType>(
      `/api/auth/authorize/${data.mobile}`,
      payload,
      { headers: { keyId: data.keyId } }
    );
    return response.data;
  },
  verifyService: async (data: VerifyRequestType) => {
    const response = await axios.post<
      VerifyRequestType,
      AxiosResponse<VerifyResponseType>
    >(
      "https://sandbox.sandpod.ir/srv/cms-sandbox/api/cms/users/authorize/verify",
      data
    );
    return response.data;
  },
  tokenService: async (data: TokenRequestType) => {
    const response = await axios.post<
      TokenRequestType,
      AxiosResponse<TokenResponseType>
    >(
      "https://sandbox.sandpod.ir/srv/cms-sandbox/api/cms/users/authorize/token",
      data
    );
    return response.data;
  },
};
