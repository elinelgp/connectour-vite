# Design System & Frontend Architecture - Connectour

## Table of Contents
1. [Overview](#overview)
2. [Design System](#design-system)
3. [Domain (Data Models)](#domain-data-models)
4. [Features (Pages & Modules)](#features-pages--modules)
5. [Hooks (State & Business Logic)](#hooks-state--business-logic)
6. [Layouts (Page Structure)](#layouts-page-structure)
7. [Mocks (Test Data)](#mocks-test-data)
8. [Patterns & Conventions](#patterns--conventions)

---

## Overview

The Connectour frontend redesign follows a modern architecture based on:
- **Design System**: Reusable components organized by abstraction level (Atoms → Molecules → Organisms)
- **Domain-Driven Design**: Strongly typed data models with a base class
- **Feature-Based Structure**: Organization by business domain rather than file type
- **Custom Hooks**: Centralized state management and business logic

---

## Design System

The design system is organized using the **Atomic Design** methodology with centralized design tokens.

### 📍 Location: `/src/design-system/`

### Structure

```
design-system/
├── tokens/              # Centralized design tokens
│   ├── colors.ts        # Color palette
│   ├── typography.ts    # Typography configurations
│   ├── spacing.ts       # Spacing scale
│   ├── borderRadius.ts  # Border radius values
│   └── index.ts         # Centralized exports
├── atoms/               # Elementary non-composable components
│   ├── Avatar/
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   └── index.ts
├── molecules/           # Atom combinations
│   ├── ProfileCard/
│   ├── UserTypeCard/
│   └── index.ts
├── organisms/           # Complex components
│   ├── FeaturedProfiles/
│   ├── Header/
│   ├── UserTypeGrid/
│   └── index.ts
├── componentStyles.ts   # Shared styles and configurations
└── index.ts             # Centralized exports
```

### 🎨 Design Tokens

Tokens define the visual consistency of the project:

```typescript
import { tokens } from '@design-system';

// Accessing tokens
tokens.colors       // Color palette
tokens.spacing      // Spacing scale (xs, sm, md, lg, xl, etc.)
tokens.typography   // Font sizes, weights, and families
tokens.borderRadius // Predefined border radius values
```

### 🧩 Component Levels

#### **Atoms** (Elementary)
- Simple and non-composable components
- Examples: `Button`, `Input`, `Avatar`, `Badge`, `Card`
- Always reusable and generic
- Accept props for customization

#### **Molecules** (Composite)
- Combinations of atoms + light logic
- Examples: `ProfileCard` (Avatar + text + metadata), `UserTypeCard`
- Light business context (no complex business hooks)

#### **Organisms** (Complex)
- Complex components with business logic
- Examples: `Header`, `UserTypeGrid`, `FeaturedProfiles`
- Use hooks for state and data
- Integrate molecules and atoms

### 📋 Component Styles

The `componentStyles.ts` file centralizes shared styles:

```typescript
buttonSizeClasses     // Size configurations for buttons (sm, md, lg)
buttonVariantColors   // Color variants (primary, secondary, ghost)
inputSizeClasses      // Size configurations for inputs
```

### ✅ Best Practices

- **Always use tokens** rather than hardcoded values
- **Keep atoms pure**: no business logic, no non-UI hooks
- **Name explicitly**: `ProfileCard`, `UserTypeGrid` > `Card`, `Grid`
- **Export from index.ts**: Simplifies imports

---

## Domain (Data Models)

The domain folder contains all data models and business logic entities.

### 📍 Location: `/src/domain/`

### Structure

```
domain/
├── base/
│   ├── BaseEntity.ts   # Base class for all entities
│   └── index.ts
├── user/               # User model
├── artist/             # Artist model
├── venue/              # Venue model
├── event/              # Event model
├── booking/            # Booking model
└── index.ts            # Centralized exports
```

### 🏗️ BaseEntity

All entities inherit from `BaseEntity`:

```typescript
export abstract class BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  protected updatedAt: Date;

  constructor(id: string, createdAt: Date = new Date()) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  protected touch(): void {
    this.updatedAt = new Date();
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  abstract toJSON(): Record<string, unknown> | object;
}
```

### 📦 Main Entities

#### **User**
- Represents a platform user
- Roles: `ARTIST`, `VENUE_MANAGER`, `CLIENT`
- Properties: `id`, `email`, `name`, `role`, `createdAt`, `updatedAt`

#### **Artist**
- Represents a musical artist
- Properties: `id`, `name`, `genres`, `bio`, `avatar`, `venue` (association)
- Extends `BaseEntity`

#### **Venue**
- Represents a concert/event venue
- Properties: `id`, `name`, `type`, `location`, `capacity`, `features`
- Types: `CLUB`, `THEATER`, `ARENA`, `BAR`, etc.

#### **Event**
- Represents an event
- Properties: `id`, `title`, `artist`, `venue`, `date`, `status`
- Status: `PLANNED`, `CANCELLED`, `COMPLETED`

#### **Booking**
- Represents a reservation
- Properties: `id`, `user`, `event`, `date`, `status`, `seatsBooked`
- Status: `PENDING`, `CONFIRMED`, `CANCELLED`

### ✅ Patterns

```typescript
// Import entities
import { User, UserRole, Artist, Event, Booking } from '@domain';

// Create an instance
const user = new User('user-id', 'alice@example.com', 'Alice', UserRole.ARTIST);

// Access properties
console.log(user.id, user.createdAt);

// Use with TypeScript
const artists: Artist[] = [];
```

---

## Features (Pages & Modules)

Features represent application sections, organized by business domain.

### 📍 Location: `/src/features/`

### Structure

```
features/
├── admin/              # Admin pages
│   ├── Dashboard/
│   ├── UserManagement/
│   └── ...
├── home/               # Home page
│   ├── Home.tsx
│   └── ...
└── [future modules]/   # Artists, Events, Bookings, etc.
```

### 🏠 Home Feature

The home page displays:
- Header with navigation
- User type grid
- Featured profiles
- Call-to-action elements

### 🛠️ Admin Feature

Admin pages for user and data management.

### 📝 Conventions

- **1 folder = 1 feature**
- **Pages at feature root** (e.g., `home/Home.tsx`)
- **Sub-components**: organized in a `components/` folder or directly from molecules/organisms
- **Use hooks** for state and data

---

## Hooks (State & Business Logic)

Custom hooks manage global state and centralized business logic.

### 📍 Location: `/src/hooks/`

### Structure

```
hooks/
├── useEvents.ts        # State and logic for events
├── useArtists.ts       # State and logic for artists
├── useVenues.ts        # State and logic for venues
├── useBookings.ts      # State and logic for bookings
├── useUsers.ts         # State and logic for users
├── useSearch.ts        # Search logic
├── useNavigation.ts    # Navigation logic
└── index.ts            # Centralized exports
```

### 📊 Available Hooks

#### **useEvents / useEvent**
```typescript
const { events, loading, error } = useEvents();
const { event, loading } = useEvent(eventId);
```

#### **useArtists / useArtist**
```typescript
const { artists, loading } = useArtists();
const { artist, loading } = useArtist(artistId);
```

#### **useVenues**
```typescript
const { venues, loading } = useVenues();
```

#### **useBookings**
```typescript
const { bookings, loading } = useBookings();
```

#### **useUsers**
```typescript
const { users, loading } = useUsers();
```

#### **useSearch**
```typescript
const { results, loading, search } = useSearch(query);
```

#### **useNavigation**
```typescript
const { currentPath, navigate } = useNavigation();
```

### 🔄 Pattern Used

Each hook follows a consistent structure:
```typescript
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Data fetching logic
  }, []);

  return { events, loading, error };
}
```

### ✅ Best Practices

- **1 hook = 1 business domain** (Events, Artists, etc.)
- **Always return**: `data`, `loading`, `error`
- **Import types from domain**: `import { Event } from '@domain'`
- **Export from index.ts** to centralize imports

---

## Layouts (Page Structure)

Layouts provide the global structure for pages.

### 📍 Location: `/src/layouts/`

### Structure

```
layouts/
├── MainLayout/         # Main layout for application pages
│   ├── MainLayout.tsx
│   ├── index.ts
│   └── ...
├── ErrorLayout/        # Layout for error pages
│   ├── ErrorLayout.tsx
│   ├── index.ts
│   └── ...
```

### 🎯 MainLayout

Main layout containing:
- Header / Navigation
- Sidebar (optional)
- Main content
- Footer (optional)

```typescript
import { MainLayout } from '@layouts';

export function HomePage() {
  return (
    <MainLayout>
      <h1>Welcome to Home</h1>
    </MainLayout>
  );
}
```

### ⚠️ ErrorLayout

Layout for error pages (404, 500, etc.)

```typescript
import { ErrorLayout } from '@layouts';

export function NotFoundPage() {
  return <ErrorLayout code={404} message="Page not found" />;
}
```

### 📝 Conventions

- **Props children**: `children: ReactNode`
- **Styles**: Use design system tokens
- **Responsiveness**: Implement via Tailwind or CSS Modules

---

## Mocks (Test Data)

Mocks provide fictional data for development and testing.

### 📍 Location: `/src/mocks/`

### Structure

```
mocks/
└── data.ts            # All mock data
```

### 📋 Available Data

```typescript
export const mockUsersData: IUser[]      // Fictional users
export const mockArtistsData: IArtist[]  // Fictional artists
export const mockVenuesData: IVenue[]    // Fictional venues
export const mockEventsData: IEvent[]    // Fictional events
export const mockBookingsData: IBooking[]// Fictional bookings
```

### 🔍 Mock Data Structure

Mock data reproduces domain entities:

```typescript
const mockUser: IUser = {
  id: 'user-001',
  email: 'alice.martin@rock.com',
  name: 'Alice Martin',
  role: UserRole.ARTIST,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
};
```

### ✅ Usage

```typescript
import { mockUsersData, mockEventsData } from '@mocks';

// In hooks or tests
const users = mockUsersData;
const events = mockEventsData;
```

### 📝 Conventions

- **Realistic and contextually relevant** data
- **Unique IDs**: `user-001`, `artist-002`, etc.
- **Realistic and varied** dates
- **Matching**: Mock data should reflect domain models

---

## Patterns & Conventions

### 🎯 Global Architecture

```
src/
├── assets/            # Images, icons, fonts
├── core/              # Central utilities
├── components/        # Generic components (not used here)
├── design-system/     # ⭐ Tokens + Components (Atoms/Molecules/Organisms)
├── domain/            # ⭐ Data models
├── features/          # ⭐ Application pages and modules
├── hooks/             # ⭐ Business logic and state
├── layouts/           # ⭐ Page structure
├── mocks/             # ⭐ Test data
├── providers/         # React Context / Providers
├── routes/            # Routing
├── services/          # API services (future)
├── types/             # Additional TypeScript types
├── utils/             # Utilities
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

### 📦 Import Aliases

To simplify imports, use aliases (if configured):

```typescript
// ✅ Preferred
import { Button, Card } from '@design-system';
import { User, UserRole } from '@domain';
import { useEvents } from '@hooks';
import { mockUsersData } from '@mocks';
import { MainLayout } from '@layouts';

// ❌ Avoid
import { Button } from '../../design-system/atoms';
import { User } from '../../../domain/user';
```

### 🔄 Data Flow

```
Mock Data (mocks/) → Hooks (hooks/) → Components (design-system/) → Features (features/)
                                  ↓
                            Domain Models (domain/)
```

1. **Mocks** provide initial data
2. **Hooks** manage state and logic based on Domain
3. **Domain Models** define data structures
4. **Design System Components** display data
5. **Features** assemble components for pages

### ✅ TypeScript Checklist

- [ ] All files use `.ts` or `.tsx`
- [ ] Entities inherit from `BaseEntity`
- [ ] Interfaces use `I` prefix (e.g., `IUser`)
- [ ] Types imported from domain and design-system
- [ ] No `any`: use explicit types

### 🎨 Design System Checklist

- [ ] Use **tokens** for colors, spacing, typography
- [ ] Keep **atoms** simple and generic
- [ ] **Molecules** combine atoms
- [ ] **Organisms** integrate business logic
- [ ] Export from `index.ts`

### 🔗 Hooks & Domain Checklist

- [ ] 1 hook = 1 business domain
- [ ] Hooks return `{ data, loading, error }`
- [ ] Entities imported from domain
- [ ] Mock data corresponds to domain

---

## Complete Usage Examples

### Display an artists list

```typescript
// features/artists/ArtistsList.tsx
import { useState } from 'react';
import { useArtists } from '@hooks';
import { UserTypeGrid } from '@design-system';
import { MainLayout } from '@layouts';

export function ArtistsListPage() {
  const { artists, loading, error } = useArtists();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MainLayout>
      <h1>Artists</h1>
      <UserTypeGrid artists={artists} />
    </MainLayout>
  );
}
```

### Create a search feature

```typescript
// features/search/Search.tsx
import { useState } from 'react';
import { useSearch } from '@hooks';
import { Input, Card } from '@design-system';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearch(query);

  return (
    <>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.map((result) => (
        <Card key={result.id}>{result.name}</Card>
      ))}
    </>
  );
}
```

---

## Roadmap & Future Improvements

- [ ] Real API integration (replace mocks)
- [ ] Centralized state management (Redux / Zustand)
- [ ] Animations and transitions
- [ ] Dark mode
- [ ] Unit and E2E tests

---

## Resources & Documentation

- **Design Tokens**: [src/design-system/tokens](./src/design-system/tokens)
- **Domain Models**: [src/domain](./src/domain)
- **Custom Hooks**: [src/hooks](./src/hooks)
- **Layouts**: [src/layouts](./src/layouts)
- **Features**: [src/features](./src/features)
- **Mocks**: [src/mocks](./src/mocks)

---

**Last Updated**: March 2026  
**Author**: Frontend Team Connectour
