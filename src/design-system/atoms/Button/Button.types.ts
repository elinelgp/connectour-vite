import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visuelle du bouton
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Taille du bouton
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Contenu du bouton
   */
  children: ReactNode;
  
  /**
   * Désactiver le bouton
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Afficher le bouton en pleine largeur
   * @default false
   */
  fullWidth?: boolean;
}