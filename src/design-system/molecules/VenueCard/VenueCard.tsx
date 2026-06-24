import React from "react";
import { MapPin, Users, Clock3, MessageCircle } from "lucide-react";
import { Card } from "../../atoms/Card";
import { Avatar } from "../../atoms/Avatar";
import { Badge } from "../../atoms/Badge";
import { VenueCardProps } from "./VenueCard.types";
import { tokens } from "../../tokens";

export const VenueCard: React.FC<VenueCardProps> = ({
  name,
  location,
  capacity,
  genres = [],
  responseTime,
  avatarUrl,
  onContact,
  onClick,
}) => {
  return (
    <Card variant="elevated" className="w-full max-w-[360px] text-left" onClick={onClick}>
      <article className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className="font-semibold truncate"
            style={{ color: tokens.colors.primary.dark, marginBottom: tokens.spacing.xs }}
          >
            {name}
          </h3>
          <p
            className="flex items-center gap-1 text-sm"
            style={{ color: tokens.colors.primary.dark }}
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{location}</span>
          </p>
        </div>
        <Avatar src={avatarUrl} alt={name} size="md" />
      </article>

      <div className="mt-4 flex flex-wrap gap-2">
        {genres.slice(0, 3).map((genre) => (
          <Badge key={genre} variant="secondary">
            {genre}
          </Badge>
        ))}
      </div>

      <div
        className="mt-4 flex flex-wrap items-center gap-3 text-sm"
        style={{ color: tokens.colors.primary.dark }}
      >
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {capacity} pers.
        </span>
        {responseTime ? (
          <span className="flex items-center gap-1">
            <Clock3 className="h-4 w-4" />
            {responseTime}
          </span>
        ) : null}
      </div>

      {onContact ? (
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: tokens.colors.secondary.light,
            color: tokens.colors.secondary.dark,
          }}
          onClick={(event) => {
            event.stopPropagation();
            onContact();
          }}
        >
          <MessageCircle className="h-4 w-4" />
          Contacter
        </button>
      ) : null}
    </Card>
  );
};

VenueCard.displayName = "VenueCard";
