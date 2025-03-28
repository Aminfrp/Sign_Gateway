import { useMutation, useQuery } from "@tanstack/react-query";
import { services } from "./contract.api";

export const useGetContract = () => {
  const contractMutation = useMutation({
    mutationFn: services.getContract,
  });
  return { ...contractMutation };
};

export const useGetCaptcha = () => {
  const getCaptchaQuery = useQuery({
    queryFn: services.getCaptcha,
    queryKey: ["captcha"],
  });
  return { ...getCaptchaQuery };
};

export const useGetUserInfo = () => {
  const getUserInfoQuery = useQuery({
    queryFn: services.getUserInfo,
    queryKey: ["user-info"],
  });
  return { ...getUserInfoQuery };
};

export const useGetUserMe = () => {
  const getUserMeQuery = useQuery({
    queryFn: services.getUserMe,
    queryKey: ["user-me"],
  });
  return { ...getUserMeQuery };
};

export const useUpdateUser = () => {
  const userUpdateMutation = useMutation({
    mutationFn: services.updateUser,
  });
  return { ...userUpdateMutation };
};

export const useSignContract = () => {
  const signContractMutation = useMutation({
    mutationFn: services.signContract,
  });
  return { ...signContractMutation };
};
