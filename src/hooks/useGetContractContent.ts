import { services } from "@/features/contract/contract.api";
import { services as contractsSerices } from "@/features/contracts/contract.api";
import {checkAutoLogin, getCodeParam, getSignParam} from "@/lib/utils";
import { ContractContextType, ContractsContextType } from "@/types";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";
import {useAutoLogin} from "@/features/auth/auth.hooks";
import {APP_CONFIG} from "@/constants";

export const useGetContractContent = () => {
  const [contract, setContract] =
    useSessionStorage<ContractContextType>("CONTRACT");
  const [contracts, setContracts] =
      useSessionStorage<ContractsContextType>("CONTRACTS");
  const [appLoading, setAppLoading] = useState(false);
  const {mutateAsync:handleAutoLogin} = useAutoLogin();

  const manageSignContent = async () => {
    const params = { sign: encodeURIComponent(getSignParam() as string) };
    try {
      if(window.location.pathname.includes("/contracts")) {
        const signatureResult = await contractsSerices.getContract(params);
        if (signatureResult) {
          setContracts({
            result: [...signatureResult.body],
            signature: getSignParam() as string,
          });
        }
      }else{
        const signatureResult = await services.getContract(params);
        if (signatureResult) {
          setContract({
            result: signatureResult.body?.result,
            signature: getSignParam() as string,
          });
        }
      }

    } catch (error: any) {
      const data = error && error.data;
      // window.location.href = `${ROUTES.NOT_FOUND}`;
    }
  };

  const processData = async () => {
    setAppLoading(true);
    try {
      getSignParam() && (await manageSignContent());
      if (!localStorage.getItem("token")) {
        await checkAutoLogin()
        if(getCodeParam()){
          const autoLoginResponse  = await handleAutoLogin({
            code: getCodeParam() as string,
            redirect_uri:contract?APP_CONFIG.APP_URL:`${APP_CONFIG.APP_URL}/contracts`
          })
          localStorage.setItem("token", autoLoginResponse?.body.access_token);
          localStorage.setItem("refreshToken", autoLoginResponse?.body.refresh_token);
        }
      };

    } catch (e) {
      // window.location.href = `${ROUTES.NOT_FOUND}`;
    }
    setAppLoading(false);
  };
  useEffect(() => {
    processData();
  }, []);

  return { appLoading, contract, contracts };
};
