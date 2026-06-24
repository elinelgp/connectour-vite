import { InputHTMLAttributes, ReactNode } from "react";

export type InputVariant = "default" | "error" | "success";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * @default 16
   */
  size?: number;

  label?: ReactNode;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  /**
   * @default false
   */
  fullWidth?: boolean;
}
