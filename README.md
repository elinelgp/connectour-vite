# Connectour - Event Booking Platform

A modern web application that connects artists and music venues for seamless event organization and booking.

## 🎯 Overview

Connectour is a comprehensive platform designed to facilitate the connection between **musicians/artists** and **concert venues**. The platform enables efficient event management, scheduling, and collaboration between all stakeholders in the music industry.

## 🎨 Key Features

- **Artist Management** - Create and manage artist profiles with portfolios
- **Venue Directory** - Browse and connect with music venues
- **Availability Scheduling** - Artists can set their availability calendar
- **Concert Booking** - Streamlined process for booking and confirming concerts
- **Messaging System** - Direct communication between artists and venues
- **Dashboard Analytics** - Role-based dashboards for artists, producers, and agents
- **Geographic Search** - Find venues and artists by location
- **Task Management** - Track booking tasks and deadlines
- **Multi-role Support** - Support for artists, producers, agents, and venue managers

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - Latest React with hooks and concurrent rendering
- **Vite** - Lightning-fast build tool and dev server
- **TypeScript** - Type-safe development

### UI & Styling
- **Custom Design System** - Bespoke component library built from scratch
- **Tailwind CSS** - Utility-first CSS framework
- **Storybook** - Component documentation and development
- **Lucide React** - Beautiful icon library
- **Design Tokens** - Centralized design system with color, spacing, and typography tokens

### State Management & Utilities
- **Jotai** - Primitive and flexible state management
- **Notistack** - Toast notification system
- **React Router v6** - Client-side routing
- **Day.js** - Lightweight date manipulation

### Backend
- **Firebase** - Cloud backend services
  - Firestore - NoSQL database
  - Authentication
  - Cloud Functions

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript ESLint** - Type-aware linting
- **Storybook** - Component development and testing

## 📁 Project Structure

```
src/
├── design-system/       # Custom design system
│   ├── atoms/           # Basic components (Button, Input, Card, Avatar, Badge)
│   ├── molecules/       # Composed components (UserTypeCard, ProfileCard)
│   ├── organisms/       # Complex components (Header, UserTypeGrid, FeaturedProfiles)
│   ├── tokens.ts        # Design tokens (colors, spacing, typography)
│   └── componentStyles.ts  # Centralized component styles
├── features/            # Feature-based modules
│   ├── home/            # Homepage feature
│   └── admin/           # Admin features
├── layouts/             # Layout components
│   ├── MainLayout/      # Main app layout with navigation
│   └── ErrorLayout/     # Error page layout
├── components/          # Legacy components (gradual migration)
├── routes/              # Page components and routing
│   ├── router.tsx       # Router configuration
│   ├── index.tsx        # Route definitions
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useSearch.ts
│   ├── useNavigation.ts
│   └── ...
├── services/            # Firebase and API services
│   ├── artist-service.ts
│   ├── user-service.ts
│   ├── venue-service.ts
│   └── ...
├── domain/              # Business logic (OOP models)
│   ├── base/            # Base entities
│   ├── user/
│   ├── artist/
│   ├── event/
│   ├── venue/
│   └── booking/
├── types/               # TypeScript type definitions
├── core/                # Core utilities and configuration
│   ├── store.ts         # State management setup
│   └── theme.ts         # Theme configuration
└── main.tsx             # Entry point
```

## 🎨 Design System

The application features a comprehensive custom design system:

### Atoms (Basic Components)
- **Button** - Primary, Secondary, Ghost variants with multiple sizes
- **Input** - Form inputs with icon support and validation states
- **Card** - Container component with Default, Elevated, Outlined variants
- **Avatar** - User avatars with size variants
- **Badge** - Status badges with color variants

### Molecules
- **UserTypeCard** - Card for user type selection
- **ProfileCard** - Featured profile display

### Organisms
- **Header** - Page header with search functionality
- **UserTypeGrid** - Grid layout for user types
- **FeaturedProfiles** - Carousel of featured profiles

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint

# Format code
pnpm run format
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server (http://localhost:8080) |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build locally |
| `pnpm run storybook` | Start Storybook on port 6006 |
| `pnpm run build-storybook` | Build static Storybook |
| `pnpm run lint` | Run ESLint |
| `pnpm run format` | Format code with Prettier |
| `pnpm run prepare` | Setup Husky git hooks |

## 🔧 Configuration

### Vite Configuration
- Configured in `vite.config.ts`
- React Fast Refresh enabled
- ESLint plugin integration

### TypeScript
- Main config: `tsconfig.json`
- Build config: `tsconfig.build.json`
- Node config: `tsconfig.node.json`

### Firebase
- Firestore indexes: `db/firestore.indexes.json`
- Security rules: `db/firestore.rules`

## 📦 Database Models

Core entities in Firestore:
- **Artist** - Music performer information
- **Venue** - Concert venue details
- **Concert** - Event details
- **Availability** - Artist availability slots
- **Subscription** - Service subscriptions
- **Option** - Venue options and preferences
- **User** - User accounts and profiles
- **Region** - Geographic regions
- **Department** - Geographic departments

## 🎨 Design System Architecture

### Component Development with Storybook

The design system is documented and developed using Storybook:
- Interactive component playground
- Visual testing for all variants
- Responsive behavior preview
- Design token documentation

Access Storybook by running `pnpm run storybook` and navigating to http://localhost:6006

### Styling Approach

**Custom Design System** (New Features)
- Token-based design system (`tokens.ts`, `componentStyles.ts`)
- Atomic Design methodology (atoms → molecules → organisms)
- Tailwind CSS for utility classes
- Fully responsive and accessible components

**Material-UI** (Legacy Routes)
- Used for existing dashboard and admin features
- Lazy-loaded only when accessing legacy routes
- Gradual migration to custom design system planned

### Theme Configuration

- **Primary Colors**: Orange (#FF9F5A) and Teal (#5C9C9C)
- **Tailwind Config**: Extended with custom design tokens
- **CSS Variables**: Defined in `index.css` for consistent theming

## 🔐 Authentication

Authentication is handled through Firebase Authentication, with user data managed in Firestore. The app supports multiple user roles:
- Artists
- Venues
- Producers
- Agents

## 📱 Responsive Design

The application is built with a mobile-first approach:
- Custom breakpoints in Tailwind config
- Mobile-optimized navigation
- Responsive typography and spacing scales
- Touch-friendly interactive elements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions, please open an issue on the repository.
