import { useMutation } from "@tanstack/react-query";
import { services } from "./auth.api";
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

export const useHandshake = () => {
  const handshakeMutation = useMutation<
    HandshakeResponseType,
    Error,
    HandshakeRequestType
  >({ mutationFn: services.handshakeService });
  return { ...handshakeMutation };
};

export const useAuthorize = () => {
  const handshakeMutation = useMutation<
    AuthorizeResponseType,
    Error,
    AuthorizeRequestType
  >({ mutationFn: services.authorizeService });
  return { ...handshakeMutation };
};

export const useVerify = () => {
  const verifyMutation = useMutation<
    VerifyResponseType,
    Error,
    VerifyRequestType
  >({ mutationFn: services.verifyService });
  return { ...verifyMutation };
};

export const useToken = () => {
  const tokenMutation = useMutation<
    TokenResponseType,
    Error,
    TokenRequestType
  >({ mutationFn: services.tokenService });
  return { ...tokenMutation };
};
