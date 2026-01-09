import React from "react";
import { ProfileCard } from "../../molecules/ProfileCard";
import { FeaturedProfilesProps } from "./FeaturedProfiles.types";
import { tokens } from "../../tokens";

export const FeaturedProfiles: React.FC<FeaturedProfilesProps> = ({ profiles, onProfileClick }) => {
  return (
    <section style={{ marginTop: tokens.spacing["2xl"] }}>
      <div className="px-4 sm:px-6" style={{ marginBottom: tokens.spacing.lg }}>
        <h2
          className="text-lg sm:text-xl font-semibold"
          style={{ color: tokens.colors.neutral.brown }}
        >
          Featured Profiles
        </h2>
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
