import { getCodeParam } from "@/lib/utils";
import { api } from "@/services";
import { ContractContextType } from "@/types";
import { useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";

export const useAutoLogin = () => {
  const [contract] = useSessionStorage<ContractContextType>("CONTRACT");
  const handleAutoLogin = async () => {
    const response = await api.post("/api/auth/auto_login", {
      code: getCodeParam(),
      redirect_uri: `https://paraph.sandpod.ir/?sign=${contract?.signature}`,
    });
    return response.data;
  };

  useEffect(() => {
    if (!getCodeParam()) return;
    handleAutoLogin();
  }, []);
};
