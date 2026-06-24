import React from "react";
import { MapPin, CalendarDays, MessageCircle } from "lucide-react";
import { Card } from "../../atoms/Card";
import { Status } from "../../atoms/Status";
import { AvailabilitySlotProps } from "./AvailabilitySlot.types";
import { tokens } from "../../tokens";

export const AvailabilitySlot: React.FC<AvailabilitySlotProps> = ({
  dateRange,
  location,
  status,
  onContact,
  statusLabel,
}) => {
  return (
    <Card variant="outlined" className="w-full max-w-[360px] text-left">
      <article className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="mb-1 flex items-center gap-2 text-sm font-medium"
            style={{ color: tokens.colors.primary.dark }}
          >
            <CalendarDays className="h-4 w-4" style={{ color: tokens.colors.primary.main }} />
            {dateRange}
          </p>

          <p
            className="mb-2 flex items-center gap-2 text-sm"
            style={{ color: tokens.colors.primary.dark }}
          >
            <MapPin className="h-4 w-4" style={{ color: tokens.colors.secondary.main }} />
            {location}
          </p>

          {statusLabel ?? <Status kind="booking" status={status} size="sm" />}
        </div>

        {onContact ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: tokens.colors.secondary.light,
              color: tokens.colors.secondary.dark,
            }}
            onClick={onContact}
          >
            <MessageCircle className="h-4 w-4" />
            Contacter
          </button>
        ) : null}
      </article>
    </Card>
  );
};

AvailabilitySlot.displayName = "AvailabilitySlot";
