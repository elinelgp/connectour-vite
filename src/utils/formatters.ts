import { EventStatus, BookingStatus, VenueType, GenreMusic, UserRole } from "../domain";
import { tokens } from "../design-system/tokens";

/**
 * Formatteurs pour les statuts d'événements
 */
export const EventFormatters = {
  getStatusLabel(status: EventStatus): string {
    const labels: Record<EventStatus, string> = {
      [EventStatus.DRAFT]: "Brouillon",
      [EventStatus.PUBLISHED]: "Publié",
      [EventStatus.ONGOING]: "En cours",
      [EventStatus.COMPLETED]: "Terminé",
      [EventStatus.CANCELLED]: "Annulé",
    };
    return labels[status];
  },

  getStatusColor(status: EventStatus): string {
    const colors: Record<EventStatus, string> = {
      [EventStatus.DRAFT]: "gray",
      [EventStatus.PUBLISHED]: "blue",
      [EventStatus.ONGOING]: "green",
      [EventStatus.COMPLETED]: "purple",
      [EventStatus.CANCELLED]: "red",
    };
    return colors[status];
  },

  getStatusIcon(status: EventStatus): string {
    const icons: Record<EventStatus, string> = {
      [EventStatus.DRAFT]: "📝",
      [EventStatus.PUBLISHED]: "📢",
      [EventStatus.ONGOING]: "🎪",
      [EventStatus.COMPLETED]: "✅",
      [EventStatus.CANCELLED]: "❌",
    };
    return icons[status];
  },
};

/**
 * Formatteurs pour les réservations
 */
export const BookingFormatters = {
  getStatusLabel(status: BookingStatus): string {
    const labels: Record<BookingStatus, string> = {
      [BookingStatus.PENDING]: "En attente",
      [BookingStatus.CONFIRMED]: "Confirmée",
      [BookingStatus.COMPLETED]: "Complétée",
      [BookingStatus.CANCELLED]: "Annulée",
      [BookingStatus.NO_SHOW]: "Absent",
    };
    return labels[status];
  },

  getStatusColor(status: BookingStatus): string {
    const colors: Record<BookingStatus, string> = {
      [BookingStatus.PENDING]: tokens.colors.status.pending,
      [BookingStatus.CONFIRMED]: tokens.colors.status.confirmed,
      [BookingStatus.COMPLETED]: tokens.colors.status.completed,
      [BookingStatus.CANCELLED]: tokens.colors.status.cancelled,
      [BookingStatus.NO_SHOW]: tokens.colors.status.noShow,
    };
    return colors[status];
  },

  getStatusIcon(status: BookingStatus): string {
    const icons: Record<BookingStatus, string> = {
      [BookingStatus.PENDING]: "⏳",
      [BookingStatus.CONFIRMED]: "✅",
      [BookingStatus.COMPLETED]: "🎉",
      [BookingStatus.CANCELLED]: "❌",
      [BookingStatus.NO_SHOW]: "👻",
    };
    return icons[status];
  },
};

/**
 * Formatteurs pour les venues
 */
export const VenueFormatters = {
  getTypeLabel(type: VenueType): string {
    const labels: Record<VenueType, string> = {
      [VenueType.CONCERT_HALL]: "Salle de Concert",
      [VenueType.CLUB]: "Club",
      [VenueType.THEATER]: "Théâtre",
      [VenueType.FESTIVAL_GROUND]: "Lieu Festival",
      [VenueType.OUTDOOR]: "En Plein Air",
      [VenueType.OTHER]: "Autre",
    };
    return labels[type];
  },

  getTypeIcon(type: VenueType): string {
    const icons: Record<VenueType, string> = {
      [VenueType.CONCERT_HALL]: "🎼",
      [VenueType.CLUB]: "🍸",
      [VenueType.THEATER]: "🎭",
      [VenueType.FESTIVAL_GROUND]: "🎪",
      [VenueType.OUTDOOR]: "🏞️",
      [VenueType.OTHER]: "📍",
    };
    return icons[type];
  },
};

/**
 * Formatteurs pour les genres musicaux
 */
export const GenreFormatters = {
  getLabel(genre: GenreMusic): string {
    return genre
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  getLabels(genres: GenreMusic[]): string {
    return genres.map((g) => GenreFormatters.getLabel(g)).join(", ");
  },

  getIcon(genre: GenreMusic): string {
    const icons: Partial<Record<GenreMusic, string>> = {
      [GenreMusic.ROCK]: "🎸",
      [GenreMusic.METAL]: "🤘",
      [GenreMusic.PUNK]: "💥",
      [GenreMusic.GRUNGE]: "🎵",
    };
    return icons[genre] || "🎵";
  },
};

/**
 * Formatteurs pour les rôles utilisateurs
 */
export const UserFormatters = {
  getRoleLabel(role: UserRole): string {
    const labels: Record<UserRole, string> = {
      [UserRole.ARTIST]: "Artiste",
      [UserRole.VENUE_MANAGER]: "Gestionnaire de Lieu",
      [UserRole.ADMIN]: "Administrateur",
    };
    return labels[role];
  },

  getRoleBadge(role: UserRole): string {
    const badges: Record<UserRole, string> = {
      [UserRole.ARTIST]: "🎤",
      [UserRole.VENUE_MANAGER]: "🏢",
      [UserRole.ADMIN]: "👑",
    };
    return badges[role];
  },
};

/**
 * Formatteurs génériques
 */
export const Formatters = {
  /**
   * Formate un prix en euros
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  },

  /**
   * Formate une date
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
    }).format(date);
  },

  /**
   * Formate une date et heure
   */
  formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  },

  /**
   * Formate un nombre avec séparateurs
   */
  formatNumber(num: number): string {
    return new Intl.NumberFormat("fr-FR").format(num);
  },

  /**
   * Formate une note (rating)
   */
  formatRating(rating: number): string {
    return `${rating.toFixed(1)} ⭐`;
  },

  /**
   * Calcule le temps relatif (il y a X jours)
   */
  formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
    if (diffInDays < 365) return `Il y a ${Math.floor(diffInDays / 30)} mois`;
    return `Il y a ${Math.floor(diffInDays / 365)} ans`;
  },

  /**
   * Calcule les jours restants
   */
  formatDaysUntil(date: Date): string {
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return "Passé";
    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Demain";
    if (diffInDays < 7) return `Dans ${diffInDays} jours`;
    if (diffInDays < 30) return `Dans ${Math.ceil(diffInDays / 7)} semaines`;
    return `Dans ${Math.ceil(diffInDays / 30)} mois`;
  },

  /**
   * Tronque un texte
   */
  truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
  },

  /**
   * Formatte un pourcentage
   */
  formatPercentage(value: number): string {
    return `${value}%`;
  },
};
