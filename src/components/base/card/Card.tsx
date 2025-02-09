import { FC } from "react";
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardType } from "./card.types";

export const Card: FC<CardType> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
} = ({ children, className = "" }) => {
  return (
    <div className={`shadow-md rounded-2xl bg-[#FFFFFF] ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
