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

export const useGetUserMe = () => {
  const getUserMeQuery = useQuery({
    queryFn: services.getUserMe,
    queryKey: ["user-me"],
  });
  return { ...getUserMeQuery };
};

export const useGetFVCaptcha = () => {
  const getFVCaptchaQuery = useQuery({
    queryFn: services.getFVCaptcha,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    queryKey: ["fv-captcha"],
  });
  return { ...getFVCaptchaQuery };
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

export const useFaceVerification = () => {
  const faceVerificationMutation = useMutation({
    mutationFn: services.faceVerification,
  });
  return { ...faceVerificationMutation };
};

export const useFaceVerificationInquiry = () => {
  const faceVerificationInquiry = useMutation({
    mutationFn: services.faceVerificationInquiry,
  });
  return { ...faceVerificationInquiry };
};

export const useUploadFile = () => {
  const uploadFileMutation = useMutation({
    mutationFn: services.uploadFile,
  });
  return { ...uploadFileMutation };
};

export const useShareUploadFile = () => {
  const shareUploadFileMutation = useMutation({
    mutationFn: services.uploadShareFile,
  });
  return { ...shareUploadFileMutation };
};
