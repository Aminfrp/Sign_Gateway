import { APP_CONFIG } from "@/constants";
import { convertJsonToQueryString, handleResponse } from "@/lib/utils";
import { api, radApi } from "@/services";
import { CaptchaResponse, ContractResponseFromLink } from "./contract.type";

export const services = {
  getContract: async (data: any) => {
    const options = {
      headers: {
        "business-code": APP_CONFIG.BUSINESS_CODE,
      },
    };
    const response = await api.get<ContractResponseFromLink>(
      `/api/gateway/load?${convertJsonToQueryString(data)}`,
      options
    );
    return await handleResponse<ContractResponseFromLink>(response);
  },

  getCaptcha: async () => {
    return await radApi.post<any, CaptchaResponse>(`/api/core/captcha/get`);
  },

  getUserInfo: async () => {
    const response = await api.get(`/api/security/user-latest-inquiry`);
    return await handleResponse(response);
  },

  getUserMe: async () => {
    const response = await api.get(`/api/security/user-info`);
    return await handleResponse(response);
  },
  
  updateUser: async (data: any) => {
    const options = {
      headers: {
        "business-code": APP_CONFIG.BUSINESS_CODE,
      },
    };
    return await api.post("/api/security/update-user", data, options);
  },

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
};
