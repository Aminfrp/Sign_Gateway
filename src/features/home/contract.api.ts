import { APP_CONFIG } from "@/constants";
import { convertJsonToQueryString } from "@/lib/utils";
import { api } from "@/services";
import {
  CaptchaResponse,
  ContractResponseFromLink,
  FaceVerificationPayload,
  FaceVerificationResponse,
  FVCaptchaResponse,
  ShareUploadFileRequest,
  ShareUploadFileResponse,
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
      params: {
        sign: payload.data,
      },
    };
    return await api.post(`/api/gateway/sign`, undefined, options);
  },
  faceVerification: async (payload: FaceVerificationPayload) =>
    await api.post<FaceVerificationPayload, undefined>(
      "/api/face-verification/",
      payload
    ),
  faceVerificationInquiry: async (tracker: string) =>
    await api.get<FaceVerificationResponse>(`/api/face-verification/inquiry/${tracker}`),
  uploadFile: async (data: Blob) => {
    const formData = new FormData();
    formData.append("file", data);

    return await api.post<FormData, UploadFileResponse>(
      "/api/file/upload",
      formData
    );
  },
  uploadShareFile: async (data: string) => {
    const payload = {
      fileHash: data,
      persons: APP_CONFIG.AI_USER,
      identityType: "username",
    };
    return await api.post<ShareUploadFileRequest, ShareUploadFileResponse>(
      "/api/file/share",
      payload
    );
  },
};
