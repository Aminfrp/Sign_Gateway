import { FC } from "react";
import { CardHeaderType } from "./card.types";

export const CardHeader: FC<CardHeaderType> = ({
  children,
  className = "",
}) => {
  return (
    <div>
      <div className={`p-4 ${className}`}>{children}</div>
      <hr />
    </div>
  );
};
