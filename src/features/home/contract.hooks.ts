import { useMutation } from "@tanstack/react-query";
import { services } from "./contract.api";

export const useGetContract = () => {
  const contractMutation = useMutation({
    mutationFn: services.getContract,
  });
  return { ...contractMutation };
};
