export interface Profile {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  genre?: string;
  avatarUrl?: string;
}

export interface FeaturedProfilesProps {
  profiles: Profile[];
  onProfileClick?: (profileId: string) => void;
}
