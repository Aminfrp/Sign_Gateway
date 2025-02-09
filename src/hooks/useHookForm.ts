import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";

export const useHookForm = <T extends Yup.ObjectSchema<any>>(
  schema: T,
  defaultValues: Yup.InferType<T>
): UseFormReturn<Yup.InferType<T>> => {
  const form = useForm<typeof schema>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  return { ...form };
};
