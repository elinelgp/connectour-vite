import React from "react";
import { ButtonProps } from "./Button.types";

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
    "disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

  const variantStyles = {
    primary:
      "bg-[color:var(--color-primary-main)] hover:bg-[color:var(--color-primary-dark)] " +
      "text-white shadow-md hover:shadow-lg focus:ring-[color:var(--color-primary-main)]",
    secondary:
      "bg-[color:var(--color-secondary-main)] hover:bg-[color:var(--color-secondary-dark)] " +
      "text-white shadow-md hover:shadow-lg focus:ring-[color:var(--color-secondary-main)]",
    ghost: "bg-transparent hover:bg-gray-100 text-[color:var(--color-brown)] focus:ring-gray-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "Button";
