export interface ProfileCardProps {
  /**
   * Nom du profil
   */
  name: string;

  /**
   * Type de profil
   */
  type: string;

  /**
   * Localisation
   */
  location: string;

  /**
   * Note moyenne
   */
  rating: number;

  /**
   * Genre musical (optionnel)
   */
  genre?: string;

  /**
   * URL de l'avatar (optionnel)
   */
  avatarUrl?: string;

  /**
   * Callback lors du clic
   */
  onClick?: () => void;
}
