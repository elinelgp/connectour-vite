import React from "react";
import { ButtonProps } from "./Button.types";
import { buttonSizeClasses, buttonVariantColors } from "../../componentStyles";
import { tokens } from "../../tokens";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const buttonClasses = [baseStyles, fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");

  const sizeStyles = buttonSizeClasses[size];
  const colorStyles = buttonVariantColors[variant];

  const combinedStyles: React.CSSProperties = {
    ...sizeStyles,
    ...colorStyles,
    borderRadius: tokens.borderRadius.full,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button className={buttonClasses} style={combinedStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "Button";
