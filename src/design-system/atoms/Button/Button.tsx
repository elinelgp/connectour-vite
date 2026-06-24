import React from "react";
import { ButtonProps } from "./Button.types";
import { buttonSizeClasses, buttonVariantColors } from "../../componentStyles";
import { tokens } from "../../tokens";

const Spinner: React.FC = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.25"
    />
    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  disabled = false,
  loading = false,
  loadingText,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;

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
    <button
      className={buttonClasses}
      style={combinedStyles}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {loading ? <Spinner /> : null}
        <span>{loading ? loadingText ?? children : children}</span>
      </span>
    </button>
  );
};

Button.displayName = "Button";