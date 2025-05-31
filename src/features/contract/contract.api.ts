import { APP_CONFIG } from "@/constants";
import { convertJsonToQueryString } from "@/lib/utils";
import { api } from "@/services";
import {
  CaptchaResponse, CheckCaptchaPayload, CheckCaptchaResponse,
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
      .then((res) => res.data),

  getCaptcha: async () =>
    await api.get<CaptchaResponse>(`/api/security/captcha`),

  verifyCaptcha: async (payload:CheckCaptchaPayload) =>   await api
      .post<CheckCaptchaPayload, CheckCaptchaResponse>(`/api/security/captcha`, payload),

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

  signContract: async (payload: {
    data: string;
    accessToken: string;
    trackerId?: string;
  }) => {

    const params = new URLSearchParams();
    params.append("sign", payload.data);
    if (payload.trackerId) {
      params.append("fv_tracker",payload.trackerId)
    }
    const options = {
      headers: {
        "business-code": APP_CONFIG.BUSINESS_CODE,
        "access-token": payload.accessToken,
      },
      params
    };
    return await api.post(`/api/gateway/sign`, undefined, options);
  },

  faceVerification: async (payload: FaceVerificationPayload) =>
    await api.post<FaceVerificationPayload, undefined>(
      "/api/face-verification/",
      payload
    ),

  faceVerificationInquiry: async (tracker: string) =>
    await api.get<FaceVerificationResponse>(
      `/api/face-verification/inquiry/${tracker}`
    ),

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

  rejectContract: async (payload:string) => await api.post(`/api/gateway/reject?sign=${payload},undefined`),
};
