import { APP_CONFIG } from "@/constants";
import axios, { AxiosInstance } from "axios";

const baseURL = APP_CONFIG.BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

export class RequestApi {
  instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  get = (url: string) => this.instance.get(url);
  post = <T, K>(url: string, data: T) => this.instance.post<K>(url, data);
}

export const api = new RequestApi(axiosInstance);
