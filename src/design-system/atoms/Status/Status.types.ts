import { BookingStatus, EventStatus } from "../../../domain";

export type StatusSize = "sm" | "md" | "lg";

export type StatusProps =
  | {
      kind: "event";
      status: EventStatus;
      size?: StatusSize;
      className?: string;
    }
  | {
      kind: "booking";
      status: BookingStatus;
      size?: StatusSize;
      className?: string;
    };
