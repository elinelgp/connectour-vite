import { InputHTMLAttributes, ReactNode } from "react";

export type InputVariant = "default" | "error" | "success";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Variante visuelle de l'input
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Taille de l'input
   * @default 16
   */
  size?: number;

  /**
   * Label affiché au-dessus de l'input
   */
  label?: string;

  /**
   * Message d'aide ou d'erreur sous l'input
   */
  helperText?: string;

  /**
   * Icône affichée à gauche de l'input
   */
  leftIcon?: ReactNode;

  /**
   * Icône affichée à droite de l'input
   */
  rightIcon?: ReactNode;

  /**
   * Input en pleine largeur
   * @default false
   */
  fullWidth?: boolean;
}
