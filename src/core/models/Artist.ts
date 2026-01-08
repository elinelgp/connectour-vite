/**
 * Classe Artist - Modèle métier pour les artistes
 */

import { z } from "zod";

export enum GenreMusic {
  ROCK = "rock",
  HARD_ROCK = "hard_rock",
  ALTERNATIVE_ROCK = "alternative_rock",
  GARAGE_ROCK = "garage_rock",
  GRUNGE = "grunge",
  PROGRESSIVE_ROCK = "progressive_rock",
  POST_ROCK = "post_rock",
  PUNK = "punk",
  PUNK_HARDCORE = "punk_hardcore",
  POST_PUNK = "post_punk",
  METAL = "metal",
  HEAVY_METAL = "heavy_metal",
  THRASH_METAL = "thrash_metal",
  DEATH_METAL = "death_metal",
  BLACK_METAL = "black_metal",
  DOOM_METAL = "doom_metal",
  SLUDGE_METAL = "sludge_metal",
  STONER_METAL = "stoner_metal",
  PROGRESSIVE_METAL = "progressive_metal",
  METALCORE = "metalcore",
  DEATHCORE = "deathcore",
  NU_METAL = "nu_metal",
  INDUSTRIAL_METAL = "industrial_metal",
  HEAVY_BLUES = "heavy_blues",
  OTHER = "other",
}

export interface IArtist {
  id: string;
  userId: string;
  stageName: string;
  bio?: string;
  genres: GenreMusic[];
  rating: number;
  reviewCount: number;
  followerCount: number;
  website?: string;
  instagram?: string;
  youtube?: string;
  isVerified: boolean;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Artist implements IArtist {
  id: string;
  userId: string;
  stageName: string;
  bio: string;
  genres: GenreMusic[];
  rating: number;
  reviewCount: number;
  followerCount: number;
  website?: string;
  instagram?: string;
  youtube?: string;
  isVerified: boolean;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IArtist) {
    this.id = data.id;
    this.userId = data.userId;
    this.stageName = data.stageName;
    this.bio = data.bio;
    this.genres = data.genres;
    this.rating = data.rating;
    this.reviewCount = data.reviewCount;
    this.followerCount = data.followerCount;
    this.website = data.website;
    this.instagram = data.instagram;
    this.youtube = data.youtube;
    this.isVerified = data.isVerified;
    this.profileImageUrl = data.profileImageUrl;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Ajoute un genre
   */
  addGenre(genre: GenreMusic): void {
    if (!this.genres.includes(genre)) {
      this.genres.push(genre);
      this.updatedAt = new Date();
    }
  }

  /**
   * Retire un genre
   */
  removeGenre(genre: GenreMusic): void {
    this.genres = this.genres.filter((g) => g !== genre);
    this.updatedAt = new Date();
  }

  /**
   * Obtient les genres comme string lisible
   */
  getGenresLabel(): string {
    return this.genres.map((g) => g.toUpperCase()).join(", ");
  }

  /**
   * Augmente le compteur de followers
   */
  addFollower(): void {
    this.followerCount++;
    this.updatedAt = new Date();
  }

  /**
   * Réduit le compteur de followers
   */
  removeFollower(): void {
    if (this.followerCount > 0) {
      this.followerCount--;
      this.updatedAt = new Date();
    }
  }

  /**
   * Met à jour le classement
   */
  updateRating(newRating: number, reviewCount: number): void {
    this.rating = Math.max(0, Math.min(5, newRating));
    this.reviewCount = reviewCount;
    this.updatedAt = new Date();
  }

  /**
   * Vérifie l'artiste
   */
  verify(): void {
    this.isVerified = true;
    this.updatedAt = new Date();
  }

  /**
   * Retire la vérification
   */
  unverify(): void {
    this.isVerified = false;
    this.updatedAt = new Date();
  }

  /**
   * Retourne les informations publiques
   */
  getPublicInfo(): Omit<IArtist, "userId"> {
    return {
      id: this.id,
      stageName: this.stageName,
      bio: this.bio,
      genres: this.genres,
      rating: this.rating,
      reviewCount: this.reviewCount,
      followerCount: this.followerCount,
      website: this.website,
      instagram: this.instagram,
      youtube: this.youtube,
      isVerified: this.isVerified,
      profileImageUrl: this.profileImageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Obtient le badge de vérification
   */
  getVerificationBadge(): string {
    return this.isVerified ? "✅" : "";
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    stageName: z.string().min(2),
    bio: z.string().min(10),
    genres: z.array(z.nativeEnum(GenreMusic)).min(1),
    rating: z.number().min(0).max(5),
    reviewCount: z.number().int().nonnegative(),
    followerCount: z.number().int().nonnegative(),
    website: z.string().url().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    isVerified: z.boolean(),
    profileImageUrl: z.string().url().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
}
