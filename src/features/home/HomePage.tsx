import React from "react";
import { Header } from "../../design-system/organisms/Header";
import { UserTypeGrid } from "../../design-system/organisms/UserTypeGrid";
import { FeaturedProfiles } from "../../design-system/organisms/FeaturedProfiles";
import { useSearch } from "../../hooks/useSearch";
import { useHomeData } from "./useHomeData";
import { HomePageProps } from "./HomePage.types";

const HomePage: React.FC<HomePageProps> = () => {
  const { searchQuery, handleSearchChange } = useSearch();
  const { userTypes, featuredProfiles } = useHomeData();

  const handleTypeClick = (typeId: string) => {
    console.log("Type clicked:", typeId);
  };

  const handleProfileClick = (profileId: string) => {
    console.log("Profile clicked:", profileId);
  };

  return (
    <>
      <Header
        title="Connectour"
        subtitle="L'application qui met en relation artistes, tourneurs, salles et organisateurs"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Chercher un artiste, une salle..."
      />

      <UserTypeGrid userTypes={userTypes} onTypeClick={handleTypeClick} />

      <FeaturedProfiles profiles={featuredProfiles} onProfileClick={handleProfileClick} />
    </>
  );
};

export default HomePage;
