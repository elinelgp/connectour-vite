import { LucideIcon } from "lucide-react";

export type IconColor = "primary" | "secondary";

export interface UserTypeCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  /**
   * @default 'primary'
   */
  iconColor?: IconColor;
  onClick?: () => void;
}
