import { useMemo } from "react";
import { Music, Users, Building2, Calendar } from "lucide-react";
import { UserType } from "../../design-system/organisms/UserTypeGrid";
import { Profile } from "../../design-system/organisms/FeaturedProfiles";
import { mockFeaturedProfiles } from "../../mocks/data";

/**
 * Hook personnalisé pour gérer les données de la HomePage
 * Utilise les données mockées du fichier mocks/data.ts
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

  // Profils mis en avant - utilise les vraies données mockées
  const featuredProfiles: Profile[] = useMemo(() => mockFeaturedProfiles as Profile[], []);

  return {
    userTypes,
    featuredProfiles,
  };
};
