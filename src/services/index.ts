import { APP_CONFIG } from "@/constants";
import { getCodeParam } from "@/lib/utils";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const { BASE_URL } = APP_CONFIG;

const apiOptions = {
  headers: {
    "business-code": APP_CONFIG.BUSINESS_CODE,
  },
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  ...apiOptions,
});

export class RequestApi {
  instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  get = <T>(url: string, options?: AxiosRequestConfig) =>
    this.instance.get<T>(url, options);
  post = <T, K>(url: string, data?: T, options?: AxiosRequestConfig) =>
    this.instance.post<K>(url, data, options);
  patch = <T, K>(url: string, data?: T, options?: AxiosRequestConfig) =>
    this.instance.patch<K>(url, data, options);
}

export const api = new RequestApi(axiosInstance);

api.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["access-token"] = `${token}`;
  }
  return config;
});

api.instance.interceptors.response.use(
  (data) => data,
  async (error) => {
    toast.error(error.response.data.errorMessage);
    if (error.status === 403) {
      if (!getCodeParam()) {
        await axios
          .post(BASE_URL + "/api/auth/refresh_token", {
            refresh_token: localStorage.getItem("refreshToken") as string,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.body.access_token);
            localStorage.setItem("refreshToken", res.data.body.refresh_token);
          });
      } else {
      }
    }
    return Promise.reject(error);
  }
);
