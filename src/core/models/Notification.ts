/**
 * Classe Notification - Modèle métier pour les notifications
 */

import { z } from "zod";

export enum NotificationType {
  EVENT_CREATED = "event_created",
  EVENT_UPDATED = "event_updated",
  EVENT_CANCELLED = "event_cancelled",
  BOOKING_CONFIRMED = "booking_confirmed",
  BOOKING_CANCELLED = "booking_cancelled",
  MESSAGE = "message",
  SYSTEM = "system",
}

export interface INotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
  readAt?: Date;
}

export class Notification implements INotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
  readAt?: Date;

  constructor(data: INotification) {
    this.id = data.id;
    this.userId = data.userId;
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
    this.read = data.read;
    this.data = data.data;
    this.createdAt = data.createdAt;
    this.readAt = data.readAt;
  }

  /**
   * Marque la notification comme lue
   */
  markAsRead(): void {
    this.read = true;
    this.readAt = new Date();
  }

  /**
   * Marque la notification comme non lue
   */
  markAsUnread(): void {
    this.read = false;
    this.readAt = undefined;
  }

  /**
   * Obtient une icône basée sur le type
   */
  getIcon(): string {
    switch (this.type) {
      case NotificationType.EVENT_CREATED:
        return "🎭";
      case NotificationType.EVENT_UPDATED:
        return "📝";
      case NotificationType.EVENT_CANCELLED:
        return "❌";
      case NotificationType.BOOKING_CONFIRMED:
        return "✅";
      case NotificationType.BOOKING_CANCELLED:
        return "⛔";
      case NotificationType.MESSAGE:
        return "💬";
      default:
        return "ℹ️";
    }
  }

  /**
   * Obtient une couleur basée sur le type
   */
  getColor(): string {
    switch (this.type) {
      case NotificationType.EVENT_CREATED:
      case NotificationType.BOOKING_CONFIRMED:
        return "success";
      case NotificationType.EVENT_CANCELLED:
      case NotificationType.BOOKING_CANCELLED:
        return "error";
      case NotificationType.EVENT_UPDATED:
        return "info";
      default:
        return "default";
    }
  }

  /**
   * Calcule le temps écoulé depuis la création
   */
  getTimeAgo(): string {
    const now = new Date();
    const diff = now.getTime() - this.createdAt.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    type: z.nativeEnum(NotificationType),
    title: z.string().min(1),
    message: z.string().min(1),
    read: z.boolean(),
    data: z.record(z.string(), z.unknown()).optional(),
    createdAt: z.date(),
    readAt: z.date().optional(),
  });
}
