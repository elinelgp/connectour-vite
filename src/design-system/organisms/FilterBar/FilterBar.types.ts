import { ReactNode } from "react";

export interface FilterBarProps {
  location?: string;
  capacity?: string;
  genre?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
  onLocationChange?: (value: string) => void;
  onCapacityChange?: (value: string) => void;
  onGenreChange?: (value: string) => void;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  onPeriodChange?: (value: string) => void;
  onSearch?: () => void;
  onReset?: () => void;
  searchLabel?: string;
  resetLabel?: string;
  className?: string;
  children?: ReactNode;
}
