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
- **Material-UI (MUI)** - Comprehensive Material Design component library
  - MUI Material - Classic Material Design
  - MUI Joy - Modern design system
- **Emotion** - CSS-in-JS styling solution
- **MUI X Data Grid** - Advanced data grid for tables
- **MUI X Date Pickers** - Professional date/time selection

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

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── availabilities-*.tsx    # Availability grid components
│   ├── concerts-grid.tsx       # Concert listings
│   ├── geo-search-bar.tsx      # Location-based search
│   ├── layout.tsx              # Main layout wrapper
│   ├── navigation.tsx          # Navigation components
│   └── ...
├── routes/              # Page components and routing
│   ├── router.tsx              # Router configuration
│   ├── dashboard*.tsx          # Various dashboards
│   ├── artist-page.tsx         # Artist profile
│   ├── login.tsx               # Authentication
│   ├── messages.tsx            # Messaging page
│   └── tasks.tsx               # Task management
├── services/            # Firebase and API services
│   ├── artist-service.ts       # Artist operations
│   ├── user-service.ts         # User management
│   ├── venue-service.ts        # Venue operations
│   └── ext-service.ts          # External integrations
├── types/               # TypeScript type definitions
│   ├── artist.ts
│   ├── concert.ts
│   ├── availability.ts
│   ├── venue.ts
│   └── ...
├── core/                # Core utilities and configuration
│   ├── store.ts         # State management setup
│   └── theme.ts         # MUI theme configuration
├── assets/              # Static assets
├── App.tsx              # Root component
└── main.tsx             # Entry point
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
| `pnpm run dev` | Start development server (http://localhost:5173) |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build locally |
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

## 🎨 Theme System

The application supports dual theme systems:
- **Material-UI Theme** - Primary design system
- **Joy UI Theme** - Alternative modern design option

Theme configuration is centralized in `src/core/theme.ts` for easy maintenance and consistency.

## 🔐 Authentication

Authentication is handled through Firebase Authentication, with user data managed in Firestore. The app supports multiple user roles:
- Artists
- Venues
- Producers
- Agents

## 📱 Responsive Design

The application is built with a mobile-first approach using MUI's responsive grid system and breakpoints.

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions, please open an issue on the repository.
