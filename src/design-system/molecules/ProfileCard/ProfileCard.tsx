import React from "react";
import { MapPin, Star } from "lucide-react";
import { Card } from "../../atoms/Card";
import { Avatar } from "../../atoms/Avatar";
import { Badge } from "../../atoms/Badge";
import { ProfileCardProps } from "./ProfileCard.types";
import { tokens } from "../../tokens";

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  type,
  location,
  rating,
  genre,
  avatarUrl,
  onClick,
}) => {
  return (
    <Card variant="elevated" className="min-w-[280px] text-left" onClick={onClick}>
      {/* Header avec Avatar et Rating */}
      <div className="flex items-start justify-between" style={{ marginBottom: tokens.spacing.md }}>
        <Avatar src={avatarUrl} alt={name} size="md" />
        <div className="flex items-center gap-1" style={{ color: tokens.colors.accent.yellow }}>
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm" style={{ fontWeight: tokens.typography.fontWeights.semibold }}>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Nom */}
      <h3
        className="font-semibold"
        style={{ color: tokens.colors.neutral.brown, marginBottom: tokens.spacing.sm }}
      >
        {name}
      </h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: tokens.spacing.md }}>
        <Badge variant="secondary">{type}</Badge>
        {genre && <Badge variant="primary">{genre}</Badge>}
      </div>

      {/* Localisation */}
      <div
        className="flex items-center gap-1 text-sm"
        style={{ color: `${tokens.colors.neutral.brown}b3` }}
      >
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
    </Card>
  );
};

ProfileCard.displayName = "ProfileCard";
