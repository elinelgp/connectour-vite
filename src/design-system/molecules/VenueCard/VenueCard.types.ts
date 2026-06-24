export interface VenueCardProps {
  name: string;
  location: string;
  capacity: number;
  genres?: string[];
  responseTime?: string;
  avatarUrl?: string;
  onContact?: () => void;
  onClick?: () => void;
}
