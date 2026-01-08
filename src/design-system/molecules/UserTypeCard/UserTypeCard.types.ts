import { LucideIcon } from "lucide-react";

export type IconColor = "primary" | "secondary";

export interface UserTypeCardProps {
  /**
   * Titre de la carte
   */
  title: string;

  /**
   * Icône Lucide à afficher
   */
  icon: LucideIcon;

  /**
   * Description
   */
  description: string;

  /**
   * Couleur de l'icône
   * @default 'primary'
   */
  iconColor?: IconColor;

  /**
   * Callback lors du clic
   */
  onClick?: () => void;
}
