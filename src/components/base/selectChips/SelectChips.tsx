import { SelectChipsType } from "./selectChips.type";

export const SelectChips: React.FC<SelectChipsType> = (props) => {
  const { title, className = "", isActive = false,onClick } = props;
  return (
    <div
      className={`text-xs px-3 py-2 border rounded-lg cursor-pointer ${
        isActive && "text-primary border-primary bg-primary/5"
      } ${className}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
