/**
 * Classe Review - Modèle métier pour les évaluations
 */

import { z } from "zod";

export enum ReviewType {
  EVENT = "event",
  VENUE = "venue",
  ARTIST = "artist",
}

export interface IReview {
  id: string;
  userId: string;
  targetId: string; // ID de l'entité évaluée (Event, Venue, ou Artist)
  targetType: ReviewType;
  rating: number; // 1-5
  title: string;
  comment: string;
  verified: boolean; // L'utilisateur a assisté/participa?
  helpful: number;
  unhelpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Review implements IReview {
  id: string;
  userId: string;
  targetId: string;
  targetType: ReviewType;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IReview) {
    this.id = data.id;
    this.userId = data.userId;
    this.targetId = data.targetId;
    this.targetType = data.targetType;
    this.rating = data.rating;
    this.title = data.title;
    this.comment = data.comment;
    this.verified = data.verified;
    this.helpful = data.helpful;
    this.unhelpful = data.unhelpful;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Vérifie l'évaluation
   */
  verify(): void {
    this.verified = true;
    this.updatedAt = new Date();
  }

  /**
   * Ajoute un vote "utile"
   */
  addHelpful(): void {
    this.helpful++;
    this.updatedAt = new Date();
  }

  /**
   * Ajoute un vote "non utile"
   */
  addUnhelpful(): void {
    this.unhelpful++;
    this.updatedAt = new Date();
  }

  /**
   * Calcule le score d'utilité
   */
  getHelpfulnessScore(): number {
    const total = this.helpful + this.unhelpful;
    if (total === 0) return 0;
    return Math.round((this.helpful / total) * 100);
  }

  /**
   * Obtient les étoiles comme visuel
   */
  getRatingStars(): string {
    return "⭐".repeat(this.rating) + "☆".repeat(5 - this.rating);
  }

  /**
   * Obtient la description du rating
   */
  getRatingLabel(): string {
    const labels: Record<number, string> = {
      1: "Mauvais",
      2: "Passable",
      3: "Bon",
      4: "Très bon",
      5: "Excellent",
    };
    return labels[this.rating] || "Non noté";
  }

  /**
   * Obtient le type d'entité évaluée
   */
  getTargetTypeLabel(): string {
    const labels: Record<ReviewType, string> = {
      [ReviewType.EVENT]: "Événement",
      [ReviewType.VENUE]: "Venue",
      [ReviewType.ARTIST]: "Artiste",
    };
    return labels[this.targetType];
  }

  /**
   * Calcule le temps depuis la publication
   */
  getTimeAgo(): string {
    const now = new Date();
    const diff = now.getTime() - this.createdAt.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);
    const months = Math.floor(diff / 2592000000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    if (weeks < 4) return `${weeks}w`;
    if (months < 12) return `${months}m`;
    return `${Math.floor(diff / 31536000000)}y`;
  }

  /**
   * Obtient un résumé de la review
   */
  getSummary(): string {
    const summary = `${this.getRatingStars()} - ${this.title}`;
    if (this.verified) {
      return `${summary} ✓`;
    }
    return summary;
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    targetId: z.string().uuid(),
    targetType: z.nativeEnum(ReviewType),
    rating: z.number().int().min(1).max(5),
    title: z.string().min(3).max(100),
    comment: z.string().min(10).max(1000),
    verified: z.boolean(),
    helpful: z.number().int().nonnegative(),
    unhelpful: z.number().int().nonnegative(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
}
