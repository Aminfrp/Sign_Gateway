import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { useGetUserMe } from "@/features/contracts/contract.hooks";
import withAuth from "@/HOC/AuthHOC";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ContractsContextType } from "@/types";
import { useEffect } from "react";
import { ContractsFeature } from "@/features/contracts";

export const Contracts = () => {
  const [contracts] = useSessionStorage<ContractsContextType>("CONTRACTS");
  const { data: userInfoData, refetch: refetchUserInfo } = useGetUserMe();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userInfoData && userInfoData?.legalInquireStatus.length === 0) {
        refetchUserInfo();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [userInfoData, refetchUserInfo]);

  if (userInfoData && userInfoData?.legalInquireStatus?.length === 0)
    return <FullPageLoading />;

  if (!contracts) {
    // window.location.href = `${ROUTES.NOT_FOUND}`;
  }
  return (
    <div className="container mx-auto flex-1 flex flex-col">
      <ContractsFeature />
    </div>
  );
};

export default withAuth(Contracts);
