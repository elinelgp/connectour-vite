import { ReactNode, HTMLAttributes } from "react";

export type CardVariant = "default" | "elevated" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * @default 'default'
   */
  variant?: CardVariant;
  onClick?: () => void;
}
