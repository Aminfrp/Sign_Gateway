import { Button as BaseButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { ButtonPropsType } from "./button.types";

export const Button: React.FC<
  ButtonPropsType & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { variant, children, className = "",isLoading, ...rest } = props;
  return (
    <BaseButton
      variant={variant}
      className={`rounded-xl min-h-12  ${className}`}
      {...rest}
    >
      {children} {isLoading && <Loader2 className="animate-spin" />}
    </BaseButton>
  );
};
