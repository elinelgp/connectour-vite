import React from "react";
import { InputProps } from "./Input.types";
import { inputSizeClasses, inputVariantColors } from "../../componentStyles";

export const Input: React.FC<InputProps> = ({
  variant = "default",
  size = "md",
  label,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled = false,
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const sizeStyles = inputSizeClasses[size];
  const colorStyles = inputVariantColors[variant];

  // Ajuster le padding en fonction des icônes
  const paddingStyles = {
    ...sizeStyles,
    paddingLeft: leftIcon ? "40px" : sizeStyles.paddingLeft,
    paddingRight: rightIcon ? "40px" : sizeStyles.paddingRight,
  };

  const containerClasses = `
    ${fullWidth ? "w-full" : "w-auto"}
  `.trim();

  const inputClasses = `
    ${className}
    truncate
  `
    .replace(/\s+/g, " ")
    .trim();

  const combinedStyles: React.CSSProperties = {
    ...paddingStyles,
    ...colorStyles,
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className={inputClasses}
          style={combinedStyles}
          disabled={disabled}
          aria-invalid={variant === "error"}
          {...props}
        />

        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {helperText && (
        <p className={`mt-1 text-sm ${variant === "error" ? "text-red-600" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";
