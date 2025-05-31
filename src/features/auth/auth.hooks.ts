import { useMutation } from "@tanstack/react-query";
import { services } from "./auth.api";
import {
  AuthorizeRequestType,
  AuthorizeResponseType,
  AutoLoginRequestType,
  HandshakeRequestType,
  HandshakeResponseType,
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

export const useGetIP = () => {
  const getIPMutation = useMutation<{ ip: string }, Error>({
    mutationFn: services.getIPService,
  });
  return { ...getIPMutation };
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

export const useAutoLogin = () => {
  const autoLoginMutation = useMutation<
      VerifyResponseType,
      Error,
      AutoLoginRequestType
  >({ mutationFn: services.autoLoginService });
  return { ...autoLoginMutation };
}
