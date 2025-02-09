import { InfoIcon } from "@/assets/icons";
import { FC } from "react";
import { AlertType } from "./alert.type";

export const Alert: FC<AlertType> = (props) => {
  const { children } = props;
  return (
    <div className="mt-3 border rounded-xl py-4 px-4 bg-slate-100 flex gap-2">
      <div>
        <InfoIcon />
      </div>
      <div className="text-justify text-xs leading-5">{children}</div>
    </div>
  );
};
