import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * @default 'md'
   */
  size?: ButtonSize;

  children: ReactNode;

  /**
   * @default false
   */
  disabled?: boolean;

  /**
   * @default false
   */
  loading?: boolean;

  /**
   * @default 'Loading...'
   */
  loadingText?: ReactNode;

  /**
   * @default false
   */
  fullWidth?: boolean;
}
