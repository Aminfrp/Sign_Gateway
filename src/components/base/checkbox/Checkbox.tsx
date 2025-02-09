import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { v4 as uuid } from "uuid";
import { CheckboxType } from "./checkbox.type";

export const CheckBox: React.FC<CheckboxType> = (props) => {
  const { label = "", containerClassName = "", id } = props;

  const customId = uuid();
  return (
    <div className="flex items-center space-x-2 gap-3 cursor-pointer">
      <Checkbox id={customId || id} />
      <label
        htmlFor={customId || id}
        className="text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none leading-5"
      >
        {label}
      </label>
    </div>
  );
};
