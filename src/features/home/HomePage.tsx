import React from "react";
import { Header } from "../../design-system/organisms/Header";
import { UserTypeGrid } from "../../design-system/organisms/UserTypeGrid";
import { FeaturedProfiles } from "../../design-system/organisms/FeaturedProfiles";
import { useSearch } from "../../hooks/useSearch";
import { useHomeData } from "./useHomeData";
import { HomePageProps } from "./HomePage.types";

const HomePage: React.FC<HomePageProps> = () => {
  // Hooks personnalisés
  const { searchQuery, handleSearchChange } = useSearch();
  const { userTypes, featuredProfiles } = useHomeData();

  // Handlers
  const handleTypeClick = (typeId: string) => {
    console.log("Type clicked:", typeId);
    // Navigation ou action future
  };

  const handleProfileClick = (profileId: string) => {
    console.log("Profile clicked:", profileId);
    // Navigation ou action future
  };

  return (
    <>
      {/* Header avec recherche */}
      <Header
        title="Connectour"
        subtitle="Connecting artists, tour managers, venues and organizers worldwide"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search artists, venues, events..."
      />

      {/* Grille des types d'utilisateurs */}
      <UserTypeGrid userTypes={userTypes} onTypeClick={handleTypeClick} />

      {/* Profils mis en avant */}
      <FeaturedProfiles profiles={featuredProfiles} onProfileClick={handleProfileClick} />
    </>
  );
};

export default HomePage;
