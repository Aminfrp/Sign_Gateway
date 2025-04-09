import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { useGetUserMe } from "@/features/home/contract.hooks";
import withAuth from "@/HOC/AuthHOC";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ContractContextType } from "@/types";
import { useEffect } from "react";
import { HomeFeature } from "../features";

export const Home = () => {
  const [contract] = useSessionStorage<ContractContextType>("CONTRACT");
  const { data: userInfoData, refetch: refetchUserInfo } = useGetUserMe();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userInfoData && userInfoData?.legalInquireStatus.length === 0) {
        refetchUserInfo();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [userInfoData, refetchUserInfo]);

  if (userInfoData && userInfoData?.legalInquireStatus.length === 0)
    return <FullPageLoading />;

  if (!contract) {
    // window.location.href = `${ROUTES.NOT_FOUND}`;
  }
  return (
    <div className="container mx-auto flex-1 flex flex-col">
      <HomeFeature />
    </div>
  );
};

export default withAuth(Home);
