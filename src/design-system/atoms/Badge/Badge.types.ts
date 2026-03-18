import { ReactNode } from "react";

export type BadgeVariant = "primary" | "secondary" | "success";

export interface BadgeProps {
  children: ReactNode;
  /**
   * @default 'primary'
   */
  variant?: BadgeVariant;
  className?: string;
}
