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
      <div className="flex items-start justify-between" style={{ marginBottom: tokens.spacing.md }}>
        <Avatar src={avatarUrl} alt={name} size="md" />
        <div className="flex items-center gap-1" style={{ color: tokens.colors.accent.yellow }}>
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm" style={{ fontWeight: tokens.typography.fontWeights.semibold, color: tokens.colors.primary.dark }}>
            {rating.toFixed(1) }
          </span>
        </div>
      </div>

      <h3
        className="font-semibold"
        style={{ color: tokens.colors.primary.dark, marginBottom: tokens.spacing.sm }}
      >
        {name}
      </h3>

      <div className="flex flex-wrap gap-2" style={{ marginBottom: tokens.spacing.md }}>
        <Badge variant="secondary">{type}</Badge>
        {genre && <Badge variant="primary">{genre}</Badge>}
      </div>

      <div
        className="flex items-center gap-1 text-sm"
        style={{ color: tokens.colors.primary.dark }}
      >
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
    </Card>
  );
};

ProfileCard.displayName = "ProfileCard";
