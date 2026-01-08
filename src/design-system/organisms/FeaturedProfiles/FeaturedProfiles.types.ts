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
  /**
   * Liste des profils mis en avant
   */
  profiles: Profile[];

  /**
   * Callback lors du clic sur un profil
   */
  onProfileClick?: (profileId: string) => void;
}
