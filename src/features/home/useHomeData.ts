import { useMemo } from "react";
import { Music, Users, Building2, Calendar } from "lucide-react";
import { UserType } from "../../design-system/organisms/UserTypeGrid";
import { Profile } from "../../design-system/organisms/FeaturedProfiles";

/**
 * Hook personnalisé pour gérer les données de la HomePage
 * Dans une vraie app, ces données viendraient d'une API
 */
export const useHomeData = () => {
  // Types d'utilisateurs
  const userTypes: UserType[] = useMemo(
    () => [
      {
        id: "artists",
        title: "Artists",
        icon: Music,
        description: "Find and connect with musicians",
        iconColor: "primary",
      },
      {
        id: "tour-managers",
        title: "Tour Managers",
        icon: Users,
        description: "Professional tour management",
        iconColor: "secondary",
      },
      {
        id: "venues",
        title: "Venues",
        icon: Building2,
        description: "Discover performance spaces",
        iconColor: "primary",
      },
      {
        id: "organizers",
        title: "Organizers",
        icon: Calendar,
        description: "Event and festival organizers",
        iconColor: "secondary",
      },
    ],
    []
  );

  // Profils mis en avant
  const featuredProfiles: Profile[] = useMemo(
    () => [
      {
        id: "1",
        name: "Sarah Johnson",
        type: "Jazz Artist",
        location: "New York, NY",
        rating: 4.8,
        genre: "Jazz",
      },
      {
        id: "2",
        name: "Blue Note Jazz Club",
        type: "Venue",
        location: "New York, NY",
        rating: 4.9,
      },
      {
        id: "3",
        name: "Michael Chen",
        type: "Tour Manager",
        location: "Los Angeles, CA",
        rating: 4.7,
      },
    ],
    []
  );

  return {
    userTypes,
    featuredProfiles,
  };
};
