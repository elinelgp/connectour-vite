/**
 * Exemple d'utilisation des modèles POO dans les services
 * Ce fichier montre comment utiliser les classes métier
 */

import {
  User,
  UserRole,
  Event,
  EventStatus,
  Notification,
  NotificationType,
  FilterManager,
  Venue,
  VenueType,
  Artist,
  GenreMusic,
  Booking,
  BookingStatus,
  Review,
  ReviewType,
} from "../models";

/**
 * Exemple 1: Gestion des utilisateurs
 */
export class UserService {
  /**
   * Crée un nouvel utilisateur
   */
  static createUser(email: string, name: string, role: UserRole): User {
    const user = new User({
      id: crypto.randomUUID(),
      email,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }

  /**
   * Valide les données d'un utilisateur
   */
  static validateUser(user: User): { valid: boolean; errors?: string[] } {
    try {
      User.schema.parse(user);
      return { valid: true };
    } catch (error: unknown) {
      const zodError = error as { errors?: Array<{ message: string }> };
      return {
        valid: false,
        errors: zodError.errors?.map((e) => e.message) || ["Validation échouée"],
      };
    }
  }

  /**
   * Obtient les permissions basées sur le rôle
   */
  static getPermissions(user: User): string[] {
    const permissions: string[] = ["read:profile"];

    if (user.isArtist()) {
      permissions.push("create:events", "edit:own_events", "delete:own_events");
    }

    if (user.isVenueManager()) {
      permissions.push("create:venues", "edit:own_venues", "manage:bookings");
    }

    if (user.isAdmin()) {
      permissions.push("admin:users", "admin:events", "admin:venues");
    }

    return permissions;
  }
}

/**
 * Exemple 2: Gestion des événements
 */
export class EventService {
  /**
   * Crée un nouvel événement
   */
  static createEvent(
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    venueId: string,
    capacity: number,
    createdBy: string
  ): Event {
    return new Event({
      id: crypto.randomUUID(),
      title,
      description,
      startDate,
      endDate,
      venueId,
      artistIds: [],
      status: EventStatus.DRAFT,
      capacity,
      bookedSeats: 0,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Filtre et trie les événements
   */
  static filterEvents(events: Event[]): Event[] {
    const manager = new FilterManager<Event>();

    // Filtrer par statut PUBLISHED
    manager.addFilter("status", EventStatus.PUBLISHED);

    // Trier par date de début
    manager.addSort("startDate", "asc");

    // Appliquer pagination (10 par page, page 1)
    manager.setPage(1, 10);

    return manager.apply(events);
  }

  /**
   * Obtient les événements à venir
   */
  static getUpcomingEvents(events: Event[], days: number = 7): Event[] {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const manager = new FilterManager<Event>();
    manager.addFilter("startDate", now, "gte");
    manager.addFilter("startDate", futureDate, "lte");
    manager.addFilter("status", EventStatus.PUBLISHED);
    manager.addSort("startDate", "asc");

    return manager.apply(events);
  }
}

/**
 * Exemple 3: Gestion des notifications
 */
export class NotificationService {
  /**
   * Crée une notification
   */
  static createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ): Notification {
    return new Notification({
      id: crypto.randomUUID(),
      userId,
      type,
      title,
      message,
      read: false,
      data,
      createdAt: new Date(),
    });
  }

  /**
   * Notifie un utilisateur d'un nouvel événement
   */
  static notifyNewEvent(userId: string, eventTitle: string, eventId: string): Notification {
    return this.createNotification(
      userId,
      NotificationType.EVENT_CREATED,
      "Nouvel événement",
      `Un nouvel événement "${eventTitle}" a été créé`,
      { eventId }
    );
  }

  /**
   * Obtient les notifications non lues
   */
  static getUnreadNotifications(notifications: Notification[]): Notification[] {
    const manager = new FilterManager<Notification>();
    manager.addFilter("read", false);
    manager.addSort("createdAt", "desc");
    return manager.apply(notifications);
  }

  /**
   * Marque toutes les notifications comme lues
   */
  static markAllAsRead(notifications: Notification[]): void {
    notifications.forEach((n) => n.markAsRead());
  }
}

/**
 * Exemple 4: Utilisation avancée du FilterManager
 */
export class AdvancedFilterExample {
  static demonstrateFilterManager() {
    // Créer des données de test
    const events: Event[] = [
      new Event({
        id: crypto.randomUUID(),
        title: "Concert Jazz",
        description: "Un concert de jazz classique",
        startDate: new Date("2025-02-15"),
        endDate: new Date("2025-02-16"),
        venueId: "venue-1",
        artistIds: ["artist-1"],
        status: EventStatus.PUBLISHED,
        capacity: 500,
        bookedSeats: 350,
        createdBy: "creator-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new Event({
        id: crypto.randomUUID(),
        title: "Festival Rock",
        description: "Grand festival de rock",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-03-03"),
        venueId: "venue-2",
        artistIds: ["artist-1", "artist-2"],
        status: EventStatus.PUBLISHED,
        capacity: 10000,
        bookedSeats: 8000,
        createdBy: "creator-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    // Créer un FilterManager
    const manager = new FilterManager<Event>();

    // Filtrer et trier
    manager
      .addFilter("status", EventStatus.PUBLISHED)
      .addFilter("capacity", 500, "gte") // Capacité >= 500
      .addSort("startDate", "asc")
      .setPage(1, 5);

    // Appliquer les filtres
    const filtered = manager.apply(events);

    // Obtenir les stats
    const stats = manager.getStats(events);
    console.log("Stats:", stats); // { total: 2, filtered: 2, page: 1, pageSize: 5 }

    return filtered;
  }
}

/**
 * Exemple 5: Gestion des venues
 */
export class VenueService {
  /**
   * Crée une nouvelle venue
   */
  static createVenue(
    name: string,
    description: string,
    type: VenueType,
    address: string,
    city: string,
    country: string,
    capacity: number,
    managerId: string
  ): Venue {
    return new Venue({
      id: crypto.randomUUID(),
      name,
      description,
      type,
      address,
      city,
      country,
      capacity,
      managerId,
      rating: 0,
      reviewCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Filtre les venues par ville
   */
  static findVenuesByCity(venues: Venue[], city: string): Venue[] {
    const manager = new FilterManager<Venue>();
    manager.addFilter("city", city).addFilter("isActive", true);
    return manager.apply(venues);
  }

  /**
   * Obtient les meilleures venues
   */
  static getTopVenues(venues: Venue[], limit: number = 5): Venue[] {
    const manager = new FilterManager<Venue>();
    manager.addFilter("isActive", true).addSort("rating", "desc").setLimit(limit);
    return manager.apply(venues);
  }
}

/**
 * Exemple 6: Gestion des artistes
 */
export class ArtistService {
  /**
   * Crée un nouvel artiste
   */
  static createArtist(
    userId: string,
    stageName: string,
    bio: string,
    genres: GenreMusic[]
  ): Artist {
    return new Artist({
      id: crypto.randomUUID(),
      userId,
      stageName,
      bio,
      genres,
      rating: 0,
      reviewCount: 0,
      followerCount: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Obtient les artistes vérifiés avec des followers
   */
  static getPopularArtists(artists: Artist[], minFollowers: number = 100): Artist[] {
    const manager = new FilterManager<Artist>();
    manager
      .addFilter("isVerified", true)
      .addFilter("followerCount", minFollowers, "gte")
      .addSort("followerCount", "desc");
    return manager.apply(artists);
  }

  /**
   * Cherche des artistes par genre
   */
  static searchByGenre(artists: Artist[], genre: GenreMusic): Artist[] {
    return artists.filter((artist) => artist.genres.includes(genre));
  }
}

/**
 * Exemple 7: Gestion des réservations
 */
export class BookingService {
  /**
   * Crée une nouvelle réservation
   */
  static createBooking(
    eventId: string,
    userId: string,
    numberOfSeats: number,
    totalPrice: number
  ): Booking {
    const booking = new Booking({
      id: crypto.randomUUID(),
      eventId,
      userId,
      numberOfSeats,
      totalPrice,
      status: BookingStatus.PENDING,
      bookingReference: Booking.generateReference(),
      ticketIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    booking.generateTickets();
    return booking;
  }

  /**
   * Obtient les réservations actives
   */
  static getActiveBookings(bookings: Booking[]): Booking[] {
    const manager = new FilterManager<Booking>();
    manager.addFilter("status", BookingStatus.PENDING);
    return manager.apply(bookings);
  }

  /**
   * Obtient l'historique des réservations d'un utilisateur
   */
  static getUserBookingHistory(bookings: Booking[], userId: string): Booking[] {
    const manager = new FilterManager<Booking>();
    manager.addFilter("userId", userId).addSort("createdAt", "desc").setPage(1, 10);
    return manager.apply(bookings);
  }
}

/**
 * Exemple 8: Gestion des reviews
 */
export class ReviewService {
  /**
   * Crée une nouvelle review
   */
  static createReview(
    userId: string,
    targetId: string,
    targetType: ReviewType,
    rating: number,
    title: string,
    comment: string
  ): Review {
    return new Review({
      id: crypto.randomUUID(),
      userId,
      targetId,
      targetType,
      rating: Math.max(1, Math.min(5, rating)),
      title,
      comment,
      verified: false,
      helpful: 0,
      unhelpful: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Obtient les meilleures reviews
   */
  static getTopReviews(reviews: Review[], targetId: string): Review[] {
    const manager = new FilterManager<Review>();
    manager
      .addFilter("targetId", targetId)
      .addSort("rating", "desc")
      .addSort("helpful", "desc")
      .setLimit(5);
    return manager.apply(reviews);
  }

  /**
   * Obtient le rating moyen pour une cible
   */
  static getAverageRating(reviews: Review[], targetId: string): number {
    const targetReviews = reviews.filter((r) => r.targetId === targetId);
    if (targetReviews.length === 0) return 0;
    const sum = targetReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / targetReviews.length) * 10) / 10;
  }

  /**
   * Obtient les reviews vérifiées uniquement
   */
  static getVerifiedReviews(reviews: Review[], targetId: string): Review[] {
    const manager = new FilterManager<Review>();
    manager.addFilter("targetId", targetId).addFilter("verified", true);
    return manager.apply(reviews);
  }
}

/**
 * Exemple 9: Démonstration complète
 */
export class CompleteSystemExample {
  static demonstrateCompleteSystem() {
    console.log("=== CONNECTOUR SYSTEM DEMO ===\n");

    // 1. Créer des utilisateurs
    console.log("1️⃣  Création d'utilisateurs");
    const artist = UserService.createUser("artist@connectour.com", "David Smith", UserRole.ARTIST);
    const venueManager = UserService.createUser(
      "venue@connectour.com",
      "Marie Dupont",
      UserRole.VENUE_MANAGER
    );
    console.log(`✓ Artiste: ${artist.name} (${artist.role})`);
    console.log(`✓ Manager: ${venueManager.name} (${venueManager.role})\n`);

    // 2. Créer une venue
    console.log("2️⃣  Création d'une venue");
    const venue = VenueService.createVenue(
      "Le Grand Théâtre",
      "Un magnifique théâtre au cœur de la ville avec une acoustique exceptionnelle",
      VenueType.THEATER,
      "123 Rue de la Paix",
      "Paris",
      "France",
      500,
      venueManager.id
    );
    console.log(`✓ ${venue.name} - ${venue.getTypeLabel()}`);
    console.log(`✓ Adresse: ${venue.getFullAddress()}\n`);

    // 3. Créer un artiste
    console.log("3️⃣  Création d'un artiste");
    const artistProfile = ArtistService.createArtist(
      artist.id,
      "The Devil & The Almighty Blues",
      "Groupe de heavy blues",
      [GenreMusic.HEAVY_BLUES, GenreMusic.STONER_METAL]
    );
    artistProfile.verify();
    console.log(`✓ ${artistProfile.stageName} ${artistProfile.getVerificationBadge()}`);
    console.log(`✓ Genres: ${artistProfile.getGenresLabel()}\n`);

    // 4. Créer un événement
    console.log("4️⃣  Création d'un événement");
    const event = EventService.createEvent(
      "Blues Night - David & The Blues",
      "Une soirée magique avec le meilleur du blues live. Ambiance garantie!",
      new Date("2025-02-28"),
      new Date("2025-03-01"),
      venue.id,
      venue.capacity,
      artist.id
    );
    event.addArtist(artistProfile.id);
    event.publish();
    console.log(`✓ ${event.title}`);
    console.log(`✓ Capacité: ${event.capacity} places\n`);

    // 5. Créer des réservations
    console.log("5️⃣  Création de réservations");
    const booking1 = BookingService.createBooking(event.id, artist.id, 2, 100);
    const booking2 = BookingService.createBooking(event.id, venueManager.id, 5, 250);
    booking1.confirm();
    booking2.confirm();
    event.bookSeats(7);
    console.log(`✓ Réservation ${booking1.bookingReference} - 2 places`);
    console.log(`✓ Réservation ${booking2.bookingReference} - 5 places`);
    console.log(`✓ Taux d'occupation: ${event.getOccupancyRate()}%\n`);

    // 6. Créer des reviews
    console.log("6️⃣  Création de reviews");
    const venueReview = ReviewService.createReview(
      artist.id,
      venue.id,
      ReviewType.VENUE,
      5,
      "Excellente acoustique!",
      "Le son était cristallin. Parfait pour notre performance. Le personnel était très professionnel."
    );
    venueReview.verify();
    const artistReview = ReviewService.createReview(
      venueManager.id,
      artistProfile.id,
      ReviewType.ARTIST,
      5,
      "Incontournable!",
      "David & The Blues offre toujours des performances exceptionnelles. À recommander vivement!"
    );
    artistReview.verify();
    console.log(`✓ Review Venue: ${venueReview.getRatingStars()} - ${venueReview.title}`);
    console.log(`✓ Review Artist: ${artistReview.getRatingStars()} - ${artistReview.title}\n`);

    // 7. Notifications
    console.log("7️⃣  Notifications");
    const notification = NotificationService.notifyNewEvent(venueManager.id, event.title, event.id);
    console.log(`✓ ${notification.getIcon()} ${notification.title}`);
    console.log(`✓ Message: ${notification.message}\n`);

    console.log("=== FIN DE LA DÉMO ===");
  }
}
