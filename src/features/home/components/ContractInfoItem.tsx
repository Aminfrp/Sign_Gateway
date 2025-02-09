import { FC } from "react";
import { ContractInfoItemType } from "./contractInfoItem.type";

export const ContractInfoItem: FC<ContractInfoItemType> = (props) => {
  const { description, icon, title } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="font-yekan-bold flex gap-2">
        <span>{icon}</span>
        {title}
      </div>
      <div className="text-slate-500 text-sm pr-8">{description}</div>
    </div>
  );
};
