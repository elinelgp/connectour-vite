import { ReactNode, HTMLAttributes } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Contenu de la carte
   */
  children: ReactNode;
  
  /**
   * Variante visuelle de la carte
   * @default 'default'
   */
  variant?: CardVariant;
  
  /**
   * Rendre la carte cliquable
   */
  onClick?: () => void;
}