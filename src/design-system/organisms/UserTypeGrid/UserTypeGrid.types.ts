import { LucideIcon } from "lucide-react";

export interface UserType {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  iconColor: "primary" | "secondary";
}

export interface UserTypeGridProps {
  /**
   * Liste des types d'utilisateurs
   */
  userTypes: UserType[];

  /**
   * Callback lors du clic sur une carte
   */
  onTypeClick?: (typeId: string) => void;
}
