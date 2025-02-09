import { FC } from "react";
import { SuccessInfoItemType } from "./successInfoItem.type";

export const SuccessInfoItem: FC<SuccessInfoItemType> = (props) => {
  const { title, icon } = props;
  return (
    <div className="flex gap-2 items-center">
      <div className="w-8 flex items-center justify-center">{icon}</div>
      <div className="text-sm">{title}</div>
    </div>
  );
};
