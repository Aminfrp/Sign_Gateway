import { ROUTES } from "@/constants";
import { services } from "@/features/home/contract.api";
import { checkAutoLogin, getSignParam } from "@/lib/utils";
import { ContractContextType } from "@/types";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";

export const useGetContractContent = () => {
  const [contract, setContract] =
    useSessionStorage<ContractContextType>("CONTRACT");
  const [appLoading, setAppLoading] = useState(false);

  const manageSignContent = async () => {
    const params = { sign: encodeURIComponent(getSignParam() as string) };
    try {
      const signatureResult = await services.getContract(params);
      if (signatureResult) {
        // TODO: fix contract type
        setContract({
          ...signatureResult,
          signature: getSignParam() as string,
        });
      }
      //   TODO: add error type
    } catch (error: any) {
      const data = error && error.data;
      // window.location.href = `${ROUTES.NOT_FOUND}`;
      // TODO: fix debugger
      // debugLogger("error in isDownloadLinkValid: ", error);
    }
  };

  const processData = async () => {
    setAppLoading(true);
    try {
      getSignParam() && (await manageSignContent());
      if (!localStorage.getItem("token")) await checkAutoLogin();
    } catch (e) {
      window.location.href = `${ROUTES.NOT_FOUND}`;
    }
    setAppLoading(false);
  };
  useEffect(() => {
    processData();
  }, []);

  return { appLoading, contract };
};
