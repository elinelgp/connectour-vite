/**
 * Classe Booking - Modèle métier pour les réservations
 */

import { z } from "zod";

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NO_SHOW = "no_show",
}

export interface IBooking {
  id: string;
  eventId: string;
  userId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: BookingStatus;
  bookingReference: string;
  paymentId?: string;
  ticketIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Booking implements IBooking {
  id: string;
  eventId: string;
  userId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: BookingStatus;
  bookingReference: string;
  paymentId?: string;
  ticketIds: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IBooking) {
    this.id = data.id;
    this.eventId = data.eventId;
    this.userId = data.userId;
    this.numberOfSeats = data.numberOfSeats;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.bookingReference = data.bookingReference;
    this.paymentId = data.paymentId;
    this.ticketIds = data.ticketIds;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Confirme la réservation
   */
  confirm(): boolean {
    if (this.status !== BookingStatus.PENDING) {
      return false;
    }
    this.status = BookingStatus.CONFIRMED;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Marque comme complétée
   */
  complete(): boolean {
    if (this.status !== BookingStatus.CONFIRMED) {
      return false;
    }
    this.status = BookingStatus.COMPLETED;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Annule la réservation
   */
  cancel(): boolean {
    if (this.status === BookingStatus.COMPLETED || this.status === BookingStatus.CANCELLED) {
      return false;
    }
    this.status = BookingStatus.CANCELLED;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Marque comme absent (no-show)
   */
  markNoShow(): boolean {
    if (this.status !== BookingStatus.CONFIRMED) {
      return false;
    }
    this.status = BookingStatus.NO_SHOW;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Génère une référence de réservation unique
   */
  static generateReference(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BK-${timestamp}-${random}`;
  }

  /**
   * Génère des IDs de tickets
   */
  generateTickets(): void {
    this.ticketIds = Array.from(
      { length: this.numberOfSeats },
      () => `TICKET-${crypto.randomUUID()}`
    );
    this.updatedAt = new Date();
  }

  /**
   * Calcule le prix par siège
   */
  getPricePerSeat(): number {
    return this.totalPrice / this.numberOfSeats;
  }

  /**
   * Vérifie si la réservation est active
   */
  isActive(): boolean {
    return this.status === BookingStatus.PENDING || this.status === BookingStatus.CONFIRMED;
  }

  /**
   * Obtient le statut lisible
   */
  getStatusLabel(): string {
    const labels: Record<BookingStatus, string> = {
      [BookingStatus.PENDING]: "En attente",
      [BookingStatus.CONFIRMED]: "Confirmée",
      [BookingStatus.COMPLETED]: "Complétée",
      [BookingStatus.CANCELLED]: "Annulée",
      [BookingStatus.NO_SHOW]: "Absent",
    };
    return labels[this.status];
  }

  /**
   * Obtient la couleur du statut
   */
  getStatusColor(): string {
    switch (this.status) {
      case BookingStatus.PENDING:
        return "warning";
      case BookingStatus.CONFIRMED:
        return "success";
      case BookingStatus.COMPLETED:
        return "success";
      case BookingStatus.CANCELLED:
        return "error";
      case BookingStatus.NO_SHOW:
        return "error";
      default:
        return "default";
    }
  }

  /**
   * Calcule les jours restants jusqu'à l'événement
   */
  getDaysUntilEvent(eventDate: Date): number {
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.string().uuid(),
    eventId: z.string().uuid(),
    userId: z.string().uuid(),
    numberOfSeats: z.number().int().positive(),
    totalPrice: z.number().nonnegative(),
    status: z.nativeEnum(BookingStatus),
    bookingReference: z.string().regex(/^BK-[A-Z0-9-]+$/),
    paymentId: z.string().optional(),
    ticketIds: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
}
