import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_CONFIG } from "../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    if (urlParams.has("sign")) {
      return urlParams.get("sign");
    } else {
      return false;
    }
  }
};

export const getCodeParam = () => {
  if (window) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code")) {
      return urlParams.get("code");
    } else {
      return false;
    }
  }
};

export const setSessionStorage = <T>(key: string, value: T) => {
  if (!key) {
    throw "key is required!";
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key: string) => {
  const item = sessionStorage.getItem(key);
  if (!item) {
    return null;
  } else {
    return JSON.parse(item);
  }
};

async function getAutoLoginLink(token: string) {
  const options = {
    needAccessToken: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Client-Id": APP_CONFIG.CLIENT_ID,
    },
  };

  const params = {
    businessClientId: APP_CONFIG.CLIENT_ID,
    redirectUrl: `${APP_CONFIG.APP_DOMAIN_URL}auto-login`,
  };
  const response = await axios.post(
    `https://rad-sandbox.sandpod.ir/api/core/users/auto-login?${convertJsonToQueryString(
      params
    )}`
  );
  return (
    response &&
    response.data &&
    response.data[0] &&
    response.data[0].autoLoginUrl
  );
}

export async function checkAutoLogin() {
  const urlParams = new URLSearchParams(window.location.search);
  const SIGN = urlParams.get("sign");
  const ACCESS_TOKEN = urlParams.get("access_token");

  if (ACCESS_TOKEN) {
    setSessionStorage("SIGN", SIGN);

    try {
      const autoLoginLink = await getAutoLoginLink(ACCESS_TOKEN);
      window.location.href = autoLoginLink;
    } catch (error) {}
  }
}

export const toPersianDigits = (value: number | string) => {
  if (!value) {
    return "";
  }
  const numberDic = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  return value.toString().replace(/[0-9]/g, (w) => numberDic[w]);
};

export const toEnglishDigits = (value: number | string) => {
  if (!value) {
    return "";
  }
  const numberDic = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  return value.toString().replace(/[۰-۹]/g, (w) => numberDic[w] || w);
};

export const secondsToHMS = (seconds: number) => {
  const second = ~~seconds % 60;
  const minute = ~~((seconds % 3600) / 60);
  const hour = ~~(seconds / 3600);

  return { second, minute, hour };
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
