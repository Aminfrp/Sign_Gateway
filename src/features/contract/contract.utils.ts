import { ROUTES } from "@/constants";
import { getSignParam } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useVerify } from "../auth/auth.hooks";
import { useSignContract } from "./contract.hooks";

export const useSignContractAction = () => {
  const { mutateAsync: handleVerify } = useVerify();
  const { mutateAsync: handleSignContract } = useSignContract();
  const navigate = useNavigate();

  const verifyUser = async (code: string,phoneNumber?:string,keyId?:string) => {
    try {
      const response = await handleVerify({
        keyId: localStorage.getItem("keyId") as string || keyId as string,
        otp: code,
        mobile: localStorage.getItem("phoneNumber") as string || phoneNumber as string,
      });
      localStorage.setItem("token", response.body.access_token);
      localStorage.setItem("refreshToken", response.body.refresh_token);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const sign = async (code: string, trackerId?: string) => {
    try {
      const encodedSign = encodeURIComponent(getSignParam() as string).replace(
        /%20/g,
        "%2B"
      );

      if (trackerId) {
        await handleSignContract({
          data: encodedSign,
          accessToken: localStorage.getItem("token") as string,
          trackerId,
        });
        navigate(ROUTES.SUCCESSFUL);
      } else {
        await handleSignContract({
          data: encodedSign,
          accessToken: localStorage.getItem("token") as string,
        });
        navigate(ROUTES.SUCCESSFUL);
      }
    } catch (error) {
      navigate(ROUTES.UNSUCCESSFUL);
      return Promise.reject(error);
    }
  };

  return { sign, verifyUser };
};
