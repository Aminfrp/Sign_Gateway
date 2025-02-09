import { api } from "@/services";
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
      .post<HandshakeRequestType, HandshakeResponseType>("handshake", data)
      .then((res) => res.data),
  authorizeService: async (data: AuthorizeRequestType) => {
    const response = await api.post<
      AuthorizeRequestType,
      AuthorizeResponseType
    >("authorize", data);
    return response.data;
  },
  verifyService: async (data: VerifyRequestType) => {
    const response = await api.post<VerifyRequestType, VerifyResponseType>(
      "authorize/verify",
      data
    );
    return response.data;
  },
  tokenService: async (data: TokenRequestType) => {
    const response = await api.post<TokenRequestType, TokenResponseType>(
      "authorize/token",
      data
    );
    return response.data;
  },
};
