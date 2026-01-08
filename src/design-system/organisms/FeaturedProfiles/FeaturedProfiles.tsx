import React from "react";
import { ProfileCard } from "../../molecules/ProfileCard";
import { FeaturedProfilesProps } from "./FeaturedProfiles.types";

export const FeaturedProfiles: React.FC<FeaturedProfilesProps> = ({ profiles, onProfileClick }) => {
  return (
    <section className="mt-8">
      <div className="px-4 sm:px-6 mb-4">
        <h2 className="text-[#8B5A2B] text-lg sm:text-xl font-semibold">Featured Profiles</h2>
      </div>

      <div
        className="
      flex gap-3 sm:gap-4
      overflow-x-auto
      px-4 sm:px-6
      snap-x snap-mandatory
      no-scrollbar
    "
      >
        {profiles.map((profile) => (
          <div key={profile.id} className="snap-start">
            <ProfileCard {...profile} onClick={() => onProfileClick?.(profile.id)} />
          </div>
        ))}
      </div>
    </section>
  );
};

FeaturedProfiles.displayName = "FeaturedProfiles";
