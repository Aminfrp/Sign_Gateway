import { APP_CONFIG } from "@/constants";
import { convertJsonToQueryString } from "@/lib/utils";
import { api } from "@/services";
import {
  CaptchaResponse,
  ContractResponseFromLink,
  faceVerificationPayload,
  FVCaptchaResponse,
  UpdateUserPayload,
  UploadFileResponse,
  UserInfoResponse,
} from "./contract.type";

export const services = {
  getContract: async (data: { sign: string }) =>
    await api
      .get<ContractResponseFromLink>(
        `/api/gateway/load?${convertJsonToQueryString(data)}`
      )
      .then((res) => res.data.body),
  getCaptcha: async () =>
    await api.get<CaptchaResponse>(`/api/security/captcha`),
  getUserMe: async () =>
    await api
      .get<UserInfoResponse>(`/api/security/user-info`)
      .then((res) => res.data.body),
  getFVCaptcha: async () =>
    await api
      .post<any, FVCaptchaResponse>(`/api/face-verification/captcha`, undefined)
      .then((res) => res.data.body),
  updateUser: async (data: UpdateUserPayload) =>
    await api.post("/api/security/update-user", data),
  signContract: async (payload: { data: string; accessToken: string }) => {
    const options = {
      headers: {
        "business-code": APP_CONFIG.BUSINESS_CODE,
        "access-token": payload.accessToken,
      },
    };
    return await api.post(
      `/api/gateway/sign?sign=${payload.data}`,
      undefined,
      options
    );
  },
  faceVerification: async (payload: faceVerificationPayload) =>
    await api.post("/api/face-verification/", payload),
  faceVerificationInquiry: async (tracker: string) =>
    await api.get(`/api/face-verification/inquiry/${tracker}`),
  uploadFile: async (data: Blob) => {
    const formData = new FormData();
    formData.append("file", data);
    return await api.post<FormData, UploadFileResponse>(
      "/api/file/upload",
      formData
    );
  },
};
