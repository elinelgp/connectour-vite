/**
 * Classe Event - Modèle métier pour les événements
 */

import { z } from "zod";

export enum EventStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venueId: string;
  artistIds: string[];
  status: EventStatus;
  capacity: number;
  bookedSeats: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Event implements IEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venueId: string;
  artistIds: string[];
  status: EventStatus;
  capacity: number;
  bookedSeats: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IEvent) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.venueId = data.venueId;
    this.artistIds = data.artistIds;
    this.status = data.status;
    this.capacity = data.capacity;
    this.bookedSeats = data.bookedSeats;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Retourne les places disponibles
   */
  getAvailableSeats(): number {
    return this.capacity - this.bookedSeats;
  }

  /**
   * Vérifie si l'événement est complet
   */
  isFull(): boolean {
    return this.getAvailableSeats() === 0;
  }

  /**
   * Réserve des places
   */
  bookSeats(count: number): boolean {
    if (this.bookedSeats + count > this.capacity) {
      return false;
    }
    this.bookedSeats += count;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Annule des réservations
   */
  cancelSeats(count: number): boolean {
    if (this.bookedSeats - count < 0) {
      return false;
    }
    this.bookedSeats -= count;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Publie l'événement
   */
  publish(): boolean {
    if (this.status !== EventStatus.DRAFT) {
      return false;
    }
    this.status = EventStatus.PUBLISHED;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Annule l'événement
   */
  cancel(): boolean {
    if (this.status === EventStatus.COMPLETED || this.status === EventStatus.CANCELLED) {
      return false;
    }
    this.status = EventStatus.CANCELLED;
    this.updatedAt = new Date();
    return true;
  }

  /**
   * Ajoute un artiste
   */
  addArtist(artistId: string): void {
    if (!this.artistIds.includes(artistId)) {
      this.artistIds.push(artistId);
      this.updatedAt = new Date();
    }
  }

  /**
   * Retire un artiste
   */
  removeArtist(artistId: string): void {
    this.artistIds = this.artistIds.filter((id) => id !== artistId);
    this.updatedAt = new Date();
  }

  /**
   * Calcul du taux d'occupation en pourcentage
   */
  getOccupancyRate(): number {
    return Math.round((this.bookedSeats / this.capacity) * 100);
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string().min(10),
    startDate: z.date(),
    endDate: z.date(),
    venueId: z.string().uuid(),
    artistIds: z.array(z.string().uuid()),
    status: z.nativeEnum(EventStatus),
    capacity: z.number().int().positive(),
    bookedSeats: z.number().int().nonnegative(),
    createdBy: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
}
