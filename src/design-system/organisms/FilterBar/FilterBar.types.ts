import { ReactNode } from "react";
import { VenueType } from "../../../domain/venue/VenueType.enum";

export interface FilterBarProps {
  location?: string;
  capacity?: string;
  type?: VenueType | "";
  startDate?: string;
  endDate?: string;
  onLocationChange?: (value: string) => void;
  onCapacityChange?: (value: string) => void;
  onTypeChange?: (value: VenueType | "") => void;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  onSearch?: () => void;
  onReset?: () => void;
  isSearching?: boolean;
  searchLabel?: string;
  resetLabel?: string;
  className?: string;
  children?: ReactNode;
}
