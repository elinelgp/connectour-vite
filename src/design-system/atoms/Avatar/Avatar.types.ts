export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  /**
   * URL de l'image
   */
  src?: string;

  /**
   * Texte alternatif
   */
  alt: string;

  /**
   * Taille de l'avatar
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Classes CSS additionnelles
   */
  className?: string;
}
