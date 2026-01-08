/**
 * Classe User - Modèle métier pour les utilisateurs
 * Gère les propriétés et comportements d'un utilisateur Connectour
 */

import { z } from 'zod';

export enum UserRole {
  ARTIST = 'artist',
  VENUE_MANAGER = 'venue_manager',
  ADMIN = 'admin',
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Vérifie si l'utilisateur est un artiste
   */
  isArtist(): boolean {
    return this.role === UserRole.ARTIST;
  }

  /**
   * Vérifie si l'utilisateur est un gestionnaire de venue
   */
  isVenueManager(): boolean {
    return this.role === UserRole.VENUE_MANAGER;
  }

  /**
   * Vérifie si l'utilisateur est administrateur
   */
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Met à jour le profil utilisateur
   */
  updateProfile(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }

  /**
   * Retourne les données publiques de l'utilisateur
   */
  getPublicData(): Omit<IUser, 'email'> {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Validation Zod
   */
  static schema = z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string().min(2),
    role: z.enum(UserRole),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
}
