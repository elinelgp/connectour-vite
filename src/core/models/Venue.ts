/**
 * Classe Venue - Modèle métier pour les lieux de spectacle
 */

import { z } from 'zod';

export enum VenueType {
  CONCERT_HALL = 'concert_hall',
  CLUB = 'club',
  THEATER = 'theater',
  FESTIVAL_GROUND = 'festival_ground',
  OUTDOOR = 'outdoor',
  OTHER = 'other',
}

export interface IVenue {
  id: string;
  name: string;
  description: string;
  type: VenueType;
  address: string;
  city: string;
  country: string;
  capacity: number;
  phone?: string;
  website?: string;
  managerId: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Venue implements IVenue {
  id: string;
  name: string;
  description: string;
  type: VenueType;
  address: string;
  city: string;
  country: string;
  capacity: number;
  phone?: string;
  website?: string;
  managerId: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IVenue) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.address = data.address;
    this.city = data.city;
    this.country = data.country;
    this.capacity = data.capacity;
    this.phone = data.phone;
    this.website = data.website;
    this.managerId = data.managerId;
    this.rating = data.rating;
    this.reviewCount = data.reviewCount;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Retourne l'adresse complète
   */
  getFullAddress(): string {
    return `${this.address}, ${this.city}, ${this.country}`;
  }

  /**
   * Obtient une icône basée sur le type
   */
  getIcon(): string {
    switch (this.type) {
      case VenueType.CONCERT_HALL:
        return '🎼';
      case VenueType.CLUB:
        return '🍸';
      case VenueType.THEATER:
        return '🎭';
      case VenueType.FESTIVAL_GROUND:
        return '🎪';
      case VenueType.OUTDOOR:
        return '🏞️';
      default:
        return '📍';
    }
  }

  /**
   * Obtient la description du type
   */
  getTypeLabel(): string {
    const labels: Record<VenueType, string> = {
      [VenueType.CONCERT_HALL]: 'Salle de Concert',
      [VenueType.CLUB]: 'Club',
      [VenueType.THEATER]: 'Théâtre',
      [VenueType.FESTIVAL_GROUND]: 'Lieu Festival',
      [VenueType.OUTDOOR]: 'En Plein Air',
      [VenueType.OTHER]: 'Autre',
    };
    return labels[this.type];
  }

  /**
   * Met à jour le classement
   */
  updateRating(newRating: number, reviewCount: number): void {
    // Limite entre 0 et 5
    this.rating = Math.max(0, Math.min(5, newRating));
    this.reviewCount = reviewCount;
    this.updatedAt = new Date();
  }

  /**
   * Active la venue
   */
  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  /**
   * Désactive la venue
   */
  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  /**
   * Vérifie si la venue est disponible
   */
  isAvailable(): boolean {
    return this.isActive;
  }

  /**
   * Retourne les infos publiques
   */
  getPublicInfo(): Omit<IVenue, 'managerId'> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      address: this.address,
      city: this.city,
      country: this.country,
      capacity: this.capacity,
      phone: this.phone,
      website: this.website,
      rating: this.rating,
      reviewCount: this.reviewCount,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3),
    description: z.string().min(10),
    type: z.nativeEnum(VenueType),
    address: z.string().min(5),
    city: z.string().min(2),
    country: z.string().min(2),
    capacity: z.number().int().positive(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    managerId: z.string().uuid(),
    rating: z.number().min(0).max(5),
    reviewCount: z.number().int().nonnegative(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
}
