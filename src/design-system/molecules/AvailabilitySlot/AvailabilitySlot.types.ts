import { ReactNode } from "react";
import { BookingStatus } from "../../../domain";

export interface AvailabilitySlotProps {
  dateRange: string;
  location: string;
  status: BookingStatus;
  onContact?: () => void;
  statusLabel?: ReactNode;
}
