import { LucideIcon } from "lucide-react";

export interface UserType {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  iconColor: "primary" | "secondary";
}

export interface UserTypeGridProps {
  userTypes: UserType[];
  onTypeClick?: (typeId: string) => void;
}
