import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "error";
  size?: "sm" | "md" | "lg";
  label?: string;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  helperText?: string;
  leftIcon?: React.ReactNode;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}
