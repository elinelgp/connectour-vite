# POO dans Connectour

Ce dossier contient les modèles métier (classes) du projet Connectour.

## Structure

```
src/core/models/
├── User.ts           # Classe User avec rôles et permissions
├── Event.ts          # Classe Event avec gestion des réservations
├── Venue.ts          # Classe Venue (lieux de spectacle)
├── Artist.ts         # Classe Artist (profils d'artistes)
├── Booking.ts        # Classe Booking (réservations)
├── Review.ts         # Classe Review (évaluations)
├── Notification.ts   # Classe Notification avec types et actions
├── FilterManager.ts  # Gestionnaire de filtres réutilisable
├── examples.ts       # Exemples d'utilisation complets
├── index.ts          # Exports centralisés
└── README.md         # Ce fichier
```

## Classes Disponibles

### 1. **User** - Gestion des utilisateurs

- Rôles: `ARTIST`, `VENUE_MANAGER`, `ADMIN`
- Méthodes: `isArtist()`, `isVenueManager()`, `isAdmin()`, `updateProfile()`, `getPublicData()`

### 2. **Event** - Gestion des événements

- Statuts: `DRAFT`, `PUBLISHED`, `ONGOING`, `COMPLETED`, `CANCELLED`
- Méthodes: `bookSeats()`, `cancelSeats()`, `publish()`, `cancel()`, `addArtist()`, `getOccupancyRate()`

### 3. **Venue** - Gestion des lieux

- Types: `CONCERT_HALL`, `CLUB`, `THEATER`, `FESTIVAL_GROUND`, `OUTDOOR`, `OTHER`
- Méthodes: `getFullAddress()`, `updateRating()`, `activate()`, `deactivate()`, `getPublicInfo()`

### 4. **Artist** - Profils d'artistes

- Genres: `ROCK`, `POP`, `JAZZ`, `CLASSICAL`, `ELECTRONIC`, `HIP_HOP`, `BLUES`, `FOLK`, `METAL`, `REGGAE`, `OTHER`
- Méthodes: `addGenre()`, `addFollower()`, `updateRating()`, `verify()`, `getPublicInfo()`

### 5. **Booking** - Gestion des réservations

- Statuts: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`
- Méthodes: `confirm()`, `complete()`, `cancel()`, `markNoShow()`, `generateTickets()`, `getPricePerSeat()`

### 6. **Review** - Évaluations et avis

- Types: `EVENT`, `VENUE`, `ARTIST`
- Méthodes: `verify()`, `addHelpful()`, `getRatingStars()`, `getHelpfulnessScore()`, `getTimeAgo()`

### 7. **Notification** - Notifications utilisateur

- Types: `EVENT_CREATED`, `EVENT_UPDATED`, `BOOKING_CONFIRMED`, `MESSAGE`, `SYSTEM`, etc.
- Méthodes: `markAsRead()`, `getIcon()`, `getColor()`, `getTimeAgo()`

### 8. **FilterManager** - Gestionnaire de filtres générique

- Opérateurs: `equals`, `contains`, `startsWith`, `gt`, `lt`, `gte`, `lte`, `in`
- Méthodes: `addFilter()`, `addSort()`, `setPage()`, `apply()`, `getStats()`, `reset()`

## Concepts POO Implémentés

### 1. **Encapsulation**

Chaque classe gère ses données et comportements internes:

```typescript
class User {
  private email: string; // Privé

  public isArtist(): boolean {
    // Public
    return this.role === UserRole.ARTIST;
  }
}
```

### 2. **Interfaces & Contrats**

Chaque classe implémente une interface:

```typescript
export interface IUser { ... }
export class User implements IUser { ... }
```

### 3. **Héritage (Potentiel)**

Possibilité d'étendre les classes:

```typescript
class PremiumEvent extends Event {
  premiumFeatures: string[];
}
```

### 4. **Validation Zod**

Validation robuste des données:

```typescript
User.schema.parse(userData); // Lance une erreur si invalide
```

### 5. **Chaînage de Méthodes (Fluent API)**

FilterManager supporte la chaîne:

```typescript
manager.addFilter("status", "published").addSort("date", "asc").setPage(1, 10);
```

## Exemples d'Utilisation

### Créer une Venue

```typescript
import { Venue, VenueType, VenueService } from "@/core/models";

const venue = VenueService.createVenue(
  "Le Grand Théâtre",
  "Magnifique théâtre avec acoustique exceptionnelle",
  VenueType.THEATER,
  "123 Rue de la Paix",
  "Paris",
  "France",
  500,
  "manager-id"
);

console.log(venue.getFullAddress()); // 123 Rue de la Paix, Paris, France
console.log(venue.getIcon()); // 🎭
```

### Créer un Artiste

```typescript
import { Artist, GenreMusic, ArtistService } from "@/core/models";

const artist = ArtistService.createArtist(
  "user-id",
  "David & The Blues",
  "Un groupe de blues authentique avec 20 ans d'expérience",
  [GenreMusic.BLUES, GenreMusic.JAZZ]
);

artist.verify();
artist.addFollower();
console.log(artist.getGenresLabel()); // BLUES, JAZZ
```

### Créer une Réservation

```typescript
import { Booking, BookingService } from "@/core/models";

const booking = BookingService.createBooking(
  "event-id",
  "user-id",
  2,
  100 // Prix total
);

booking.confirm();
console.log(booking.bookingReference); // BK-XXX-YYY
console.log(booking.getPricePerSeat()); // 50
```

### Créer une Review

```typescript
import { Review, ReviewType, ReviewService } from "@/core/models";

const review = ReviewService.createReview(
  "user-id",
  "artist-id",
  ReviewType.ARTIST,
  5,
  "Incontournable!",
  "Performance exceptionnelle, à recommander vivement!"
);

review.verify();
console.log(review.getRatingStars()); // ⭐⭐⭐⭐⭐
console.log(review.getTimeAgo()); // À l'instant
```

### Filtrer les Artists populaires

```typescript
import { Artist, FilterManager } from '@/core/models';

const artists: Artist[] = [...]; // Vos artistes

// Option 1: Utiliser le service
const popular = ArtistService.getPopularArtists(artists, 100);

// Option 2: Utiliser FilterManager directement
const manager = new FilterManager<Artist>();
manager
  .addFilter('isVerified', true)
  .addFilter('followerCount', 100, 'gte')
  .addSort('rating', 'desc')
  .setPage(1, 10);

const result = manager.apply(artists);
```

## Bonnes Pratiques

### ✅ À Faire

- Utiliser les classes pour la logique métier
- Valider les données avec les schémas Zod
- Utiliser le FilterManager pour les requêtes complexes
- Documenter les méthodes publiques

### ❌ À Éviter

- Modifier directement les propriétés privées
- Créer plusieurs instances du même FilterManager
- Ignorer la validation Zod
- Mélanger la logique métier avec la logique UI

## Intégration dans les Composants React

```typescript
// ✅ BON - Utiliser les classes dans les hooks
import { useCallback } from "react";
import { Event, EventService } from "@/core/models";

export function EventList() {
  const handleFilterEvents = useCallback((events: Event[]) => {
    return EventService.filterEvents(events);
  }, []);

  return /* ... */;
}
```

```typescript
// ❌ MAUVAIS - Logique métier dans le composant
export function EventList() {
  const handleFilterEvents = (events) => {
    // Logique mélangée avec React
    return events.filter((e) => e.status === "published").sort((a, b) => a.startDate - b.startDate);
  };

  return /* ... */;
}
```

## Avantages de cette Architecture

1. **Testabilité** - Facile de tester les classes indépendamment
2. **Réutilisabilité** - Les services peuvent être utilisés partout
3. **Maintenabilité** - Logique métier centralisée
4. **Type Safety** - TypeScript vérifie les types
5. **Documentation** - Chaque classe est auto-documentée
6. **Validation** - Zod valide automatiquement les données

## Prochaines Étapes

1. Créer des tests unitaires pour les classes
2. Implémenter la persistance en base de données
3. Créer d'autres modèles si nécessaire (Payment, Message, etc.)
4. Intégrer avec Firebase ou une API REST
5. Créer des hooks React pour utiliser les classes
6. Ajouter des validations métier avancées

## Services Disponibles

Le fichier `examples.ts` contient des services utilisant les modèles:

- `UserService` - Création, validation, permissions
- `EventService` - Filtrage, événements à venir
- `VenueService` - Création, recherche par ville, top venues
- `ArtistService` - Création, artistes populaires, recherche par genre
- `BookingService` - Création, historique, réservations actives
- `ReviewService` - Création, top reviews, rating moyen
- `NotificationService` - Création, notifications non lues

## Démo Complète

Pour voir tous les modèles en action, consultez la classe `CompleteSystemExample` dans `examples.ts`.
Elle montre un scénario réaliste avec création d'utilisateurs, d'événements, de réservations et de reviews.
