import { services } from "@/features/home/contract.api";
import { getSignParam } from "@/lib/utils";
import { useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";

export const useGetContractContent = async () => {
  const [contract, setContract] = useSessionStorage("CONTRACT");

  // const navigate = useNavigate();
  const a = async () => {
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
      // TODO: fix debugger
      // debugLogger("error in isDownloadLinkValid: ", error);
    }
  };
  useEffect(() => {
    a();
  }, [getSignParam()]);
};
