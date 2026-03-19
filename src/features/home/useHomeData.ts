import { useMemo } from "react";
import { Music, Users, Building2, Calendar } from "lucide-react";
import { UserType } from "../../design-system/organisms/UserTypeGrid";
import { Profile } from "../../design-system/organisms/FeaturedProfiles";
import { mockFeaturedProfiles } from "../../mocks/data";

export const useHomeData = () => {
  const userTypes: UserType[] = useMemo(
    () => [
      {
        id: "artists",
        title: "Artistes",
        icon: Music,
        description: "Trouvez et contactez des musiciens",
        iconColor: "primary",
      },
      {
        id: "tour-managers",
        title: "Tourneurs",
        icon: Users,
        description: "Gestion professionnelle de tournée",
        iconColor: "secondary",
      },
      {
        id: "venues",
        title: "Salles",
        icon: Building2,
        description: "Découvrez les lieux de concerts",
        iconColor: "primary",
      },
      {
        id: "organizers",
        title: "Organisateurs",
        icon: Calendar,
        description: "Organisateurs d'événements et festivals",
        iconColor: "secondary",
      },
    ],
    []
  );

  const featuredProfiles: Profile[] = useMemo(() => mockFeaturedProfiles as Profile[], []);

  return {
    userTypes,
    featuredProfiles,
  };
};
