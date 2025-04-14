import { getSignParam } from "@/lib/utils";
import { useVerify } from "../auth/auth.hooks";
import { useSignContract } from "./contract.hooks";

export const useSignContractAction = () => {
  const { mutateAsync: handleVerify } = useVerify();
  const { mutateAsync: handleSignContract } = useSignContract();

  const verifyUser = async (code: string) => {
    try {
      const response = await handleVerify({
        keyId: localStorage.getItem("keyId") as string,
        otp: code,
        mobile: localStorage.getItem("phoneNumber") as string,
      });
      return response.body;
    } catch (error) {
      console.error(error);
    }
  };

  const sign = async (code: string) => {
    try {
      const tokenContent = await verifyUser(code);
      // TODO: Fix the encoded sign later
      const encodedSign = encodeURIComponent(getSignParam() as string).replace(
        /%20/g,
        "%2B"
      );

      if (tokenContent) {
        const signedData = await handleSignContract({
          data: encodedSign,
          accessToken: tokenContent.access_token,
        });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { sign, verifyUser };
};
