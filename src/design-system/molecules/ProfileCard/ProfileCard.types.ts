export interface ProfileCardProps {
  name: string;
  type: string;
  location: string;
  rating: number;
  genre?: string;
  avatarUrl?: string;
  onClick?: () => void;
}
