import { ResponseValidation } from "@/types";
import { AxiosResponse } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleResponse = <T>(response: AxiosResponse) => {
  if (response && response.status >= 200 && response.status < 300) {
    if (
      response &&
      response.data &&
      response.data.statusCode === "OK" &&
      response.data.errorMessage === null &&
      response.data.body
    ) {
      return Promise.resolve(response.data.body);
    } else if (
      response &&
      response.data &&
      response.data.statusCode === "ACCEPTED"
    ) {
      return Promise.resolve(response.data.body);
    } else {
      return Promise.reject(response.data.errorMessage);
    }
  } else {
    return Promise.reject(response.data);
  }
};

export const convertJsonToQueryString = <T extends Record<string, string>>(
  json: T
) => {
  let queryString = "";
  const stringCount = Object.keys(json).length - 1;

  Object.keys(json).forEach((item, index) => {
    if (json[item] !== "") {
      queryString += `${item}=${json[item]}${index < stringCount ? "&" : ""}`;
    }
  });

  return queryString;
};

export const getSignParam = () => {
  if (window) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("sign");
  }
};

export const setSessionStorage = <T>(key: string, value: T) => {
  if (!key) {
    throw "key is required!";
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key:string) => {
  const item = sessionStorage.getItem(key);
  if (!item) {
    return null;
  } else {
    return JSON.parse(item);
  }
};
