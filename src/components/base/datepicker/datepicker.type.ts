import { onDatePickerChangePayload } from "zaman/dist/types";

export type DatepickerType = {
  id?: string;
  label?: string;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  onChange: ((args: onDatePickerChangePayload) => void) | undefined;
  value: onDatePickerChangePayload | null;
  error?:string
};
