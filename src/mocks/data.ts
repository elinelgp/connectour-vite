import {
  User,
  UserRole,
  Artist,
  GenreMusic,
  Venue,
  VenueType,
  Event,
  EventStatus,
  Booking,
  BookingStatus,
  type IUser,
  type IArtist,
  type IVenue,
  type IEvent,
  type IBooking,
} from "../domain";

export const mockUsersData: IUser[] = [
  {
    id: "user-001",
    email: "alice.martin@rock.com",
    name: "Alice Martin",
    role: UserRole.ARTIST,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "user-002",
    email: "bob.legrand@metal.com",
    name: "Bob Legrand",
    role: UserRole.ARTIST,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "user-003",
    email: "claire.dubois@venues.fr",
    name: "Claire Dubois",
    role: UserRole.VENUE_MANAGER,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "user-004",
    email: "david.petit@venues.fr",
    name: "David Petit",
    role: UserRole.VENUE_MANAGER,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "user-005",
    email: "admin@connectour.com",
    name: "Admin Connectour",
    role: UserRole.ADMIN,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "user-006",
    email: "emma.roux@punk.com",
    name: "Emma Roux",
    role: UserRole.ARTIST,
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-12"),
  },
];

// Créer les instances User
export const mockUsers = mockUsersData.map((data) => new User(data));

export const mockArtistsData: IArtist[] = [
  {
    id: "artist-001",
    userId: "user-001",
    stageName: "The Electric Storm",
    bio: "Groupe de rock électrique formé en 2020. Connu pour ses performances énergiques et ses riffs puissants qui font trembler les salles.",
    genres: [GenreMusic.ROCK, GenreMusic.HARD_ROCK],
    rating: 4.7,
    reviewCount: 156,
    followerCount: 12500,
    website: "https://theelectricstorm.com",
    instagram: "@electricstorm",
    youtube: "@electricstormband",
    isVerified: true,
    profileImageUrl: "https://picsum.photos/seed/artist1/400/400",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: "artist-002",
    userId: "user-002",
    stageName: "Iron Wolves",
    bio: "Formation metal légendaire depuis 2015. Nos concerts sont une expérience immersive dans l'univers du heavy metal moderne.",
    genres: [GenreMusic.METAL, GenreMusic.HARD_ROCK],
    rating: 4.9,
    reviewCount: 203,
    followerCount: 18900,
    website: "https://ironwolves.band",
    instagram: "@ironwolves",
    youtube: "@ironwolvesofficial",
    isVerified: true,
    profileImageUrl: "https://picsum.photos/seed/artist2/400/400",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2025-01-03"),
  },
  {
    id: "artist-003",
    userId: "user-006",
    stageName: "Chaos Theory",
    bio: "Groupe punk hardcore qui repousse les limites. Énergie brute et message sans compromis.",
    genres: [GenreMusic.PUNK],
    rating: 4.5,
    reviewCount: 89,
    followerCount: 7800,
    instagram: "@chaostheoryband",
    youtube: "@chaostheory",
    isVerified: false,
    profileImageUrl: "https://picsum.photos/seed/artist3/400/400",
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "artist-004",
    userId: "user-001",
    stageName: "Nebula Sounds",
    bio: "Rock progressif et expérimental. Voyage sonore entre atmosphères planantes et explosions rock.",
    genres: [GenreMusic.PROGRESSIVE_ROCK, GenreMusic.ROCK],
    rating: 4.6,
    reviewCount: 124,
    followerCount: 9500,
    website: "https://nebulasounds.music",
    instagram: "@nebulasounds",
    isVerified: true,
    profileImageUrl: "https://picsum.photos/seed/artist4/400/400",
    createdAt: new Date("2024-04-08"),
    updatedAt: new Date("2024-12-15"),
  },
];

// Créer les instances Artist
export const mockArtists = mockArtistsData.map((data) => new Artist(data));

export const mockVenuesData: IVenue[] = [
  {
    id: "venue-001",
    name: "Le Zénith Paris",
    description:
      "Salle mythique parisienne accueillant les plus grands concerts rock et metal. Acoustique exceptionnelle et capacité impressionnante.",
    type: VenueType.CONCERT_HALL,
    address: "211 Avenue Jean Jaurès",
    city: "Paris",
    country: "France",
    capacity: 6300,
    phone: "+33 1 42 08 60 00",
    website: "https://www.zenith-paris.com",
    managerId: "user-003",
    rating: 4.8,
    reviewCount: 342,
    isActive: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "venue-002",
    name: "La Cigale",
    description:
      "Club historique du quartier Pigalle. Ambiance intimiste pour des concerts inoubliables.",
    type: VenueType.CLUB,
    address: "120 Boulevard de Rochechouart",
    city: "Paris",
    country: "France",
    capacity: 1300,
    phone: "+33 1 49 25 81 75",
    website: "https://www.lacigale.fr",
    managerId: "user-003",
    rating: 4.6,
    reviewCount: 187,
    isActive: true,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-11-28"),
  },
  {
    id: "venue-003",
    name: "Le Bataclan",
    description:
      "Salle de spectacle emblématique avec une programmation éclectique. Architecture unique et son exceptionnel.",
    type: VenueType.THEATER,
    address: "50 Boulevard Voltaire",
    city: "Paris",
    country: "France",
    capacity: 1500,
    phone: "+33 1 43 14 00 30",
    website: "https://www.bataclan.fr",
    managerId: "user-004",
    rating: 4.7,
    reviewCount: 256,
    isActive: true,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-12-05"),
  },
  {
    id: "venue-004",
    name: "Hellfest Open Air",
    description: "Le plus grand festival metal de France. Trois jours de légende en plein air.",
    type: VenueType.FESTIVAL_GROUND,
    address: "Rue du Champ Louet",
    city: "Clisson",
    country: "France",
    capacity: 60000,
    website: "https://www.hellfest.fr",
    managerId: "user-004",
    rating: 4.9,
    reviewCount: 1203,
    isActive: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "venue-005",
    name: "Le Trabendo",
    description:
      "Salle de concert moderne dans le parc de la Villette. Idéale pour découvrir de nouveaux talents.",
    type: VenueType.CLUB,
    address: "211 Avenue Jean Jaurès",
    city: "Paris",
    country: "France",
    capacity: 700,
    phone: "+33 1 42 01 12 12",
    website: "https://www.trabendo.fr",
    managerId: "user-003",
    rating: 4.4,
    reviewCount: 98,
    isActive: true,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-11-15"),
  },
];

// Créer les instances Venue
export const mockVenues = mockVenuesData.map((data) => new Venue(data));

export const mockEventsData: IEvent[] = [
  {
    id: "event-001",
    title: "Electric Storm - Tournée Foudre",
    description:
      'Concert exceptionnel de The Electric Storm présentant leur nouvel album "Thunder & Lightning". Une soirée électrique garantie !',
    startDate: new Date("2025-03-15T20:00:00"),
    endDate: new Date("2025-03-15T23:30:00"),
    venueId: "venue-001",
    artistIds: ["artist-001"],
    status: EventStatus.PUBLISHED,
    capacity: 6300,
    bookedSeats: 4200,
    createdBy: "user-003",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: "event-002",
    title: "Iron Wolves & Electric Storm - Double Affiche",
    description:
      "Soirée exceptionnelle réunissant deux des plus grands noms du rock français. Une nuit mémorable en perspective.",
    startDate: new Date("2025-04-20T19:00:00"),
    endDate: new Date("2025-04-21T01:00:00"),
    venueId: "venue-003",
    artistIds: ["artist-001", "artist-002"],
    status: EventStatus.PUBLISHED,
    capacity: 1500,
    bookedSeats: 1450,
    createdBy: "user-004",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2025-01-03"),
  },
  {
    id: "event-003",
    title: "Chaos Theory - Release Party",
    description:
      'Soirée de lancement du nouvel EP "Anarchy Rising". Concert intimiste dans une ambiance punk explosive.',
    startDate: new Date("2025-02-28T21:00:00"),
    endDate: new Date("2025-03-01T00:00:00"),
    venueId: "venue-002",
    artistIds: ["artist-003"],
    status: EventStatus.PUBLISHED,
    capacity: 1300,
    bookedSeats: 890,
    createdBy: "user-003",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "event-004",
    title: "Hellfest 2025 - Day 1",
    description:
      "Premier jour du Hellfest avec une programmation de légende. Iron Wolves en tête d'affiche !",
    startDate: new Date("2025-06-20T12:00:00"),
    endDate: new Date("2025-06-21T02:00:00"),
    venueId: "venue-004",
    artistIds: ["artist-002", "artist-004"],
    status: EventStatus.PUBLISHED,
    capacity: 60000,
    bookedSeats: 58000,
    createdBy: "user-004",
    createdAt: new Date("2024-10-01"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "event-005",
    title: "Nebula Sounds - Voyage Cosmique",
    description:
      "Concert immersif avec projections visuelles. Découvrez l'univers progressif de Nebula Sounds.",
    startDate: new Date("2025-05-10T20:30:00"),
    endDate: new Date("2025-05-10T23:00:00"),
    venueId: "venue-005",
    artistIds: ["artist-004"],
    status: EventStatus.PUBLISHED,
    capacity: 700,
    bookedSeats: 450,
    createdBy: "user-003",
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-28"),
  },
  {
    id: "event-006",
    title: "Rock Night - Multi Artistes",
    description: "Soirée découverte avec plusieurs groupes émergents de la scène rock française.",
    startDate: new Date("2025-01-25T19:00:00"),
    endDate: new Date("2025-01-25T23:30:00"),
    venueId: "venue-002",
    artistIds: ["artist-003", "artist-004"],
    status: EventStatus.COMPLETED,
    capacity: 1300,
    bookedSeats: 1100,
    createdBy: "user-003",
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2025-01-26"),
  },
  {
    id: "event-007",
    title: "Electric Storm - Festival Privé (Brouillon)",
    description: "Événement en cours de préparation. Détails à venir.",
    startDate: new Date("2025-08-15T18:00:00"),
    endDate: new Date("2025-08-15T22:00:00"),
    venueId: "venue-001",
    artistIds: [],
    status: EventStatus.DRAFT,
    capacity: 6300,
    bookedSeats: 0,
    createdBy: "user-003",
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
  },
];

// Créer les instances Event
export const mockEvents = mockEventsData.map((data) => new Event(data));

export const mockBookingsData: IBooking[] = [
  {
    id: "booking-001",
    eventId: "event-001",
    userId: "user-005",
    numberOfSeats: 2,
    totalPrice: 120,
    status: BookingStatus.CONFIRMED,
    bookingReference: "BK-LKJ8H9K-A1B2C3",
    paymentId: "pay_12345678",
    ticketIds: ["TICKET-001a", "TICKET-001b"],
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "booking-002",
    eventId: "event-002",
    userId: "user-005",
    numberOfSeats: 4,
    totalPrice: 280,
    status: BookingStatus.CONFIRMED,
    bookingReference: "BK-MNO9P0Q-D4E5F6",
    paymentId: "pay_87654321",
    ticketIds: ["TICKET-002a", "TICKET-002b", "TICKET-002c", "TICKET-002d"],
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-11-20"),
  },
  {
    id: "booking-003",
    eventId: "event-003",
    userId: "user-006",
    numberOfSeats: 1,
    totalPrice: 35,
    status: BookingStatus.PENDING,
    bookingReference: "BK-RST1U2V-G7H8I9",
    ticketIds: ["TICKET-003a"],
    createdAt: new Date("2024-12-25"),
    updatedAt: new Date("2024-12-25"),
  },
  {
    id: "booking-004",
    eventId: "event-004",
    userId: "user-001",
    numberOfSeats: 3,
    totalPrice: 450,
    status: BookingStatus.CONFIRMED,
    bookingReference: "BK-WXY3Z4A-J1K2L3",
    paymentId: "pay_11223344",
    ticketIds: ["TICKET-004a", "TICKET-004b", "TICKET-004c"],
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "booking-005",
    eventId: "event-006",
    userId: "user-002",
    numberOfSeats: 2,
    totalPrice: 80,
    status: BookingStatus.COMPLETED,
    bookingReference: "BK-BCD5E6F-M4N5O6",
    paymentId: "pay_55667788",
    ticketIds: ["TICKET-005a", "TICKET-005b"],
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2025-01-26"),
  },
  {
    id: "booking-006",
    eventId: "event-001",
    userId: "user-004",
    numberOfSeats: 5,
    totalPrice: 300,
    status: BookingStatus.CANCELLED,
    bookingReference: "BK-GHI7J8K-P7Q8R9",
    ticketIds: ["TICKET-006a", "TICKET-006b", "TICKET-006c", "TICKET-006d", "TICKET-006e"],
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-20"),
  },
];

// Créer les instances Booking
export const mockBookings = mockBookingsData.map((data) => new Booking(data));

export const mockData = {
  users: mockUsers,
  artists: mockArtists,
  venues: mockVenues,
  events: mockEvents,
  bookings: mockBookings,
};

// Stats utiles
export const mockStats = {
  totalUsers: mockUsers.length,
  totalArtists: mockArtists.length,
  totalVenues: mockVenues.length,
  totalEvents: mockEvents.length,
  totalBookings: mockBookings.length,
  publishedEvents: mockEvents.filter((e) => e.status === EventStatus.PUBLISHED).length,
  completedEvents: mockEvents.filter((e) => e.status === EventStatus.COMPLETED).length,
  confirmedBookings: mockBookings.filter((b) => b.status === BookingStatus.CONFIRMED).length,
  totalRevenue: mockBookings
    .filter((b) => b.status === BookingStatus.CONFIRMED)
    .reduce((sum, b) => sum + b.totalPrice, 0),
};

console.log("=== TEST DE LA POO ===\n");

// Test 1 : Vérifier qu'un User peut être créé
const testUser = mockUsers[0];
console.log(`✓ User créé: ${testUser.name} (${testUser.email})`);
console.log(`  Role: ${testUser.isArtist() ? "Artiste ✅" : "Autre"}\n`);

// Test 2 : Vérifier qu'un Artist peut suivre/unfollow
const testArtist = mockArtists[0];
const initialFollowers = testArtist.followerCount;
testArtist.follow();
console.log(`✓ Artist "${testArtist.stageName}"`);
console.log(`  Followers: ${initialFollowers} → ${testArtist.followerCount}\n`);

// Test 3 : Vérifier qu'un Event peut gérer des réservations
const testEvent = mockEvents[0];
const initialSeats = testEvent.availableSeats;
const bookingSuccess = testEvent.bookSeats(50);
console.log(`✓ Event "${testEvent.title}"`);
console.log(`  Réservation de 50 places: ${bookingSuccess ? "Succès ✅" : "Échec ❌"}`);
console.log(`  Places disponibles: ${initialSeats} → ${testEvent.availableSeats}`);
console.log(`  Taux d'occupation: ${testEvent.occupancyRate}%\n`);

// Test 4 : Vérifier le state machine d'un Booking
const testBooking = mockBookings[2]; // Status PENDING
console.log(`✓ Booking "${testBooking.bookingReference}"`);
console.log(`  Status initial: ${testBooking.status}`);
const confirmSuccess = testBooking.confirm("pay_test123");
console.log(`  Confirmation: ${confirmSuccess ? "Succès ✅" : "Échec ❌"}`);
console.log(`  Status final: ${testBooking.status}\n`);

// Test 5 : Vérifier l'ajout d'artiste à un événement
const draftEvent = mockEvents[6]; // Event en DRAFT
console.log(`✓ Event Draft "${draftEvent.title}"`);
const addArtistSuccess = draftEvent.addArtist("artist-001");
console.log(`  Ajout artiste: ${addArtistSuccess ? "Succès ✅" : "Échec ❌"}`);
const publishSuccess = draftEvent.publish();
console.log(`  Publication: ${publishSuccess ? "Succès ✅" : "Échec ❌"}`);
console.log(`  Status: ${draftEvent.status}\n`);

// Test 6 : Stats globales
console.log("=== STATISTIQUES ===");
console.log(`Total utilisateurs: ${mockStats.totalUsers}`);
console.log(`Total artistes: ${mockStats.totalArtists}`);
console.log(`Total venues: ${mockStats.totalVenues}`);
console.log(`Total événements: ${mockStats.totalEvents}`);
console.log(`  - Publiés: ${mockStats.publishedEvents}`);
console.log(`  - Terminés: ${mockStats.completedEvents}`);
console.log(`Total réservations: ${mockStats.totalBookings}`);
console.log(`  - Confirmées: ${mockStats.confirmedBookings}`);
console.log(`Revenu total: ${mockStats.totalRevenue}€\n`);

console.log("✅ Tous les tests POO passent avec succès !");
