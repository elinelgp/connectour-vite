import React from "react";
import { ChevronDown } from "lucide-react";
import { inputSizeClasses, inputVariantColors } from "../../componentStyles";
import { SelectProps } from "./Select.types";

export const Select: React.FC<SelectProps> = ({
  variant = "default",
  size = "md",
  label,
  labelClassName = "",
  labelStyle,
  helperText,
  leftIcon,
  options,
  placeholder,
  fullWidth = false,
  className = "",
  disabled = false,
  id,
  value,
  ...props
}) => {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  const sizeStyles = inputSizeClasses[size as keyof typeof inputSizeClasses];
  const colorStyles = inputVariantColors[variant as keyof typeof inputVariantColors];

  const paddingStyles = {
    ...sizeStyles,
    paddingLeft: leftIcon ? "40px" : sizeStyles.paddingLeft,
    paddingRight: "40px",
  };

  const containerClasses = `
    ${fullWidth ? "w-full" : "w-auto"}
  `.trim();

  const selectClasses = `
    ${fullWidth ? "w-full" : ""}
    ${className}
    appearance-none
    truncate
    cursor-pointer
    disabled:cursor-not-allowed
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
        <label
          htmlFor={selectId}
          className={["block mb-1 text-sm font-medium", labelClassName].filter(Boolean).join(" ")}
          style={labelStyle}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {leftIcon}
          </span>
        )}

        <select
          id={selectId}
          className={selectClasses}
          style={combinedStyles}
          lang="fr"
          disabled={disabled}
          aria-invalid={variant === "error"}
          value={value ?? ""}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={props.required}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>

      {helperText && (
        <p className={`mt-1 text-sm ${variant === "error" ? "text-red-600" : "text-gray-500"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Select.displayName = "Select";
