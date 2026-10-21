import React from "react";
import { ButtonProps } from "./Button.types";
import { buttonSizeClasses, buttonVariantColors } from "../../componentStyles";
import { tokens } from "../../tokens";

const spinnerSizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

const Spinner: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    className={`shrink-0 animate-spin ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.25"
    />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
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
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseStyles =
    "inline-flex flex-row items-center justify-center whitespace-nowrap font-medium transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const buttonClasses = [baseStyles, fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");

  const combinedStyles: React.CSSProperties = {
    ...buttonSizeClasses[size],
    ...buttonVariantColors[variant],
    borderRadius: tokens.borderRadius.full,
  };

  const renderIcon = (icon: React.ReactNode) =>
    icon ? <span className="inline-flex shrink-0 items-center">{icon}</span> : null;

  return (
    <button
      className={buttonClasses}
      style={combinedStyles}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* Tout passe directement dans le conteneur flex, plus de span intermédiaire */}
      <span className="inline-flex flex-row items-center justify-center gap-2">
        {loading ? <Spinner className={spinnerSizeClasses[size]} /> : renderIcon(leftIcon)}
        {loading ? (loadingText ?? children) : children}
        {!loading && renderIcon(rightIcon)}
      </span>
    </button>
  );
};

Button.displayName = "Button";
