import React, { FC, ReactNode } from "react";

import PencilIcon from "./icons/Pencil";
import TrashBinIcon from "./icons/TrashBin";

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  iconType: string;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  type = "button",
  className = "",
  size = "small",
  disabled,
  onClick,
  iconType,
}) => {
  const getIcon = (): ReactNode => {
    switch (iconType) {
      case "pencil":
        return <PencilIcon />;
      case "trash":
        return <TrashBinIcon />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`custom-btn-icon ${className} ${size}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {getIcon()}
    </button>
  );
};

export default ButtonIcon;
