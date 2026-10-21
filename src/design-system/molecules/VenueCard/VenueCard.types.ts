export interface VenueCardProps {
  name: string;
  location: string;
  capacity: number;
  type?: string;
  responseTime?: string;
  avatarUrl?: string;
  onContact?: () => void;
  onClick?: () => void;
}
