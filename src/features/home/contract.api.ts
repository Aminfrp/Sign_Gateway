import { APP_CONFIG } from "@/constants";
import { convertJsonToQueryString, handleResponse } from "@/lib/utils";
import { api } from "@/services";
import { ContractResponseFromLink } from "./contract.type";

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
};
