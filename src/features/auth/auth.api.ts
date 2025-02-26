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
      .post<HandshakeRequestType, AxiosResponse<HandshakeResponseType>>(
        "https://sandbox.sandpod.ir/srv/cms-sandbox/api/cms/users/handshake",
        data
      )
      .then((res) => res.data),
  authorizeService: async (data: AuthorizeRequestType) => {
    const response = await axios.post<
      AuthorizeRequestType,
      AxiosResponse<AuthorizeResponseType>
    >(
      "https://sandbox.sandpod.ir/srv/cms-sandbox/api/cms/users/authorize",
      data,
      {
        headers: {
          scopes:
            "profile login legal_nationalcode legal_birthdate storage_write legal phone key key_write key_sign certificate_write certificate",
        },
      }
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
