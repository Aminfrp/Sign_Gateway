const mode = import.meta.env.VITE_APP_MODE as string;
const baseURL =
  mode === "dev"
    ? import.meta.env.VITE_APP_DEV_BASE_URL
    : import.meta.env.VITE_APP_PROD_BASE_URL;

export const APP_CONFIG = {
  BASE_URL: baseURL,
  CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID as string,
  SCOPE: import.meta.env.VITE_APP_SCOPE as string,
  BUSINESS_CODE: import.meta.env.VITE_APP_BUSINESS_CODE as number,
};
