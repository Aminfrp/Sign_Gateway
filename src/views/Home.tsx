import FullPageLoading from "@/components/base/fullPageLoading/FullPageLoading";
import { ROUTES } from "@/constants";
import { useGetUserInfo } from "@/features/home/contract.hooks";
import withAuth from "@/HOC/AuthHOC";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";
import { HomeFeature } from "../features";

export const Home = () => {
  const [contract] = useSessionStorage("CONTRACT");
  const { data: userInfoData, refetch: refetchUserInfo } = useGetUserInfo();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userInfoData && userInfoData.status === null) {
        refetchUserInfo();
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [userInfoData, refetchUserInfo]);
  if (userInfoData && userInfoData?.status === null) return <FullPageLoading />;

  if (!contract) {
    window.location.href = `${ROUTES.NOT_FOUND}`;
  }
  return (
    <div className="container mx-auto flex-1 flex flex-col">
      <HomeFeature />
    </div>
  );
};

export default withAuth(Home);
