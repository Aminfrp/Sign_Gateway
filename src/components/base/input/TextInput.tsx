import { Input } from "@/components/ui/input";
import { forwardRef, InputHTMLAttributes } from "react";
import { v4 as uuid } from "uuid";
import { TextInputType } from "./textInput.type";

export const TextInput = forwardRef<
  HTMLInputElement,
  TextInputType & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { label = "", containerClassName = "", error, ...rest } = props;
  const customId = uuid();
  return (
    <div className={`${containerClassName}`}>
      <label
        className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer font-semibold"
        htmlFor={rest.id || customId}
      >
        {label}
      </label>
      <Input
        className={`mt-3 min-h-14  !placeholder-gray-500 !placeholder-opacity-50  ${props.className}`}
        id={rest.id || customId}
        ref={ref}
        {...rest}
      />

      {error && (
        <p
          className={`min-h-8 flex items-center text-xs text-red-600 bg-red-600/5 px-3 rounded-lg mt-3`}
        >
          {error}
        </p>
      )}
    </div>
  );
});
