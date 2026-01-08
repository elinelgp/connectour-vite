export const Validators = {
  /**
   * Valide un email
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valide une URL
   */
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Valide un UUID
   */
  isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  },

  /**
   * Valide une date future
   */
  isFutureDate(date: Date): boolean {
    return date > new Date();
  },

  /**
   * Valide qu'une date est après une autre
   */
  isDateAfter(date: Date, referenceDate: Date): boolean {
    return date > referenceDate;
  },

  /**
   * Valide un numéro de téléphone français
   */
  isValidFrenchPhone(phone: string): boolean {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Valide une capacité
   */
  isValidCapacity(capacity: number): boolean {
    return Number.isInteger(capacity) && capacity > 0 && capacity <= 100000;
  },

  /**
   * Valide un rating
   */
  isValidRating(rating: number): boolean {
    return rating >= 0 && rating <= 5;
  },

  /**
   * Valide une longueur de texte
   */
  isValidLength(text: string, min: number, max?: number): boolean {
    const length = text.trim().length;
    if (max) {
      return length >= min && length <= max;
    }
    return length >= min;
  },
};

/**
 * ============================================
 * EXEMPLES D'UTILISATION
 * ============================================
 */

// Dans un composant React
import { Event } from '../domain';
import { EventFormatters, Formatters } from './formatters';

const event = Event.create(
  'Rock Festival',
  'Amazing festival',
  new Date('2025-08-15'),
  new Date('2025-08-17'),
  'venue-123',
  10000,
  'user-456'
);

// Affichage formaté
console.log(EventFormatters.getStatusLabel(event.status)); // "Brouillon"
console.log(EventFormatters.getStatusIcon(event.status)); // "📝"
console.log(Formatters.formatDate(event.startDate)); // "15 août 2025"
console.log(Formatters.formatNumber(event.capacity)); // "10 000"
console.log(Formatters.formatDaysUntil(event.startDate)); // "Dans X jours"