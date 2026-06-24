import React from "react";
import { StatusProps } from "./Status.types";
import { tokens } from "../../tokens";
import { statusBaseStyles, statusSizeStyles } from "../../componentStyles";
import { EventStatus, BookingStatus } from "../../../domain";

const eventStatusColorMap: Record<EventStatus, string> = {
  [EventStatus.DRAFT]: tokens.colors.status.draft,
  [EventStatus.PUBLISHED]: tokens.colors.status.published,
  [EventStatus.ONGOING]: tokens.colors.status.ongoing,
  [EventStatus.COMPLETED]: tokens.colors.status.completed,
  [EventStatus.CANCELLED]: tokens.colors.status.cancelled,
};

const bookingStatusColorMap: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: tokens.colors.status.pending,
  [BookingStatus.CONFIRMED]: tokens.colors.status.confirmed,
  [BookingStatus.COMPLETED]: tokens.colors.status.completed,
  [BookingStatus.CANCELLED]: tokens.colors.status.cancelled,
  [BookingStatus.NO_SHOW]: tokens.colors.status.noShow,
};

const isEventStatusProps = (props: StatusProps): props is Extract<StatusProps, { kind: "event" }> =>
  props.kind === "event";

const isBookingStatusProps = (
  props: StatusProps
): props is Extract<StatusProps, { kind: "booking" }> => props.kind === "booking";

const getLabel = (props: StatusProps): string => {
  if (isEventStatusProps(props)) {
    switch (props.status) {
      case EventStatus.DRAFT:
        return "Brouillon";
      case EventStatus.PUBLISHED:
        return "Publié";
      case EventStatus.ONGOING:
        return "En cours";
      case EventStatus.COMPLETED:
        return "Terminé";
      case EventStatus.CANCELLED:
        return "Annulé";
    }
  }

  if (isBookingStatusProps(props)) {
    switch (props.status) {
      case BookingStatus.PENDING:
        return "En attente";
      case BookingStatus.CONFIRMED:
        return "Confirmée";
      case BookingStatus.COMPLETED:
        return "Complétée";
      case BookingStatus.CANCELLED:
        return "Annulée";
      case BookingStatus.NO_SHOW:
        return "Absent";
    }
  }

  return String(props.status);
};

const getStatusColor = (props: StatusProps): string => {
  if (isEventStatusProps(props)) {
    return eventStatusColorMap[props.status as EventStatus];
  }

  if (isBookingStatusProps(props)) {
    return bookingStatusColorMap[props.status as BookingStatus];
  }

  return tokens.colors.neutral.gray;
};

export const Status: React.FC<StatusProps> = ({ status, kind, size = "md", className = "" }) => {
  const badgeClasses = [className].filter(Boolean).join(" ");

  const combinedStyles: React.CSSProperties = {
    ...statusBaseStyles,
    ...statusSizeStyles[size],
    backgroundColor: getStatusColor({ kind, status }),
  };

  return (
    <span className={badgeClasses} style={combinedStyles}>
      {getLabel({ kind, status })}
    </span>
  );
};

Status.displayName = "Status";
