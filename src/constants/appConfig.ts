export const APP_CONFIG = {
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  RAD_BASE_URL: import.meta.env.VITE_APP_RAD_BASE_URL,
  CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID as string,
  SCOPE: import.meta.env.VITE_APP_SCOPE as string,
  BUSINESS_CODE: import.meta.env.VITE_APP_BUSINESS_CODE as number,
  APP_DOMAIN_URL: import.meta.env.VITE_APP_DOMAIN_URL as string,
};
