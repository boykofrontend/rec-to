import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  disabled?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  name,
  onClick,
  disabled,
  className = "",
  type = "button",
}) => (
  <button
    className={`custom-btn ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {name}
  </button>
);

export default Button;
