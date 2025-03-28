import { FC } from "react";
import { v4 as uuid } from "uuid";
import { DatePicker } from "zaman";
import { DatepickerType } from "./datepicker.type";

export const Datepicker: FC<DatepickerType> = (props) => {
  const {
    label = "",
    containerClassName = "",
    id,
    className = "",
    placeholder = "",
    value,
    error,
    onChange,
    disabled = false,
  } = props;
  const customId = uuid();

  return (
    <div className={`flex flex-col gap-3 relative ${containerClassName}`}>
      <label
        htmlFor={id || customId}
        className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer font-semibold"
      >
        {label}
      </label>
      <DatePicker
        direction="ltr"
        inputClass={`flex h-9 w-full rounded-2xl bg-[#FAFBFC] px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  min-h-14`}
        inputAttributes={{
          id: id || customId,
          placeholder,
          disabled,
        }}
        locale="fa"
        onChange={onChange}
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
};
