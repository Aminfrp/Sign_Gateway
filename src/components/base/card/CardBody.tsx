import { FC } from "react";
import { CardBodyType } from "./card.types";

export const CardBody: FC<CardBodyType> = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
