import { ReactNode } from "react";

export type BadgeVariant = "primary" | "secondary" | "success";

export interface BadgeProps {
  /**
   * Contenu du badge
   */
  children: ReactNode;

  /**
   * Variante visuelle
   * @default 'primary'
   */
  variant?: BadgeVariant;

  /**
   * Classes CSS additionnelles
   */
  className?: string;
}
