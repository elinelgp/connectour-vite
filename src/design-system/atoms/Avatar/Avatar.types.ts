export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  alt: string;
  /**
   * @default 'md'
   */
  size?: AvatarSize;
  className?: string;
}
