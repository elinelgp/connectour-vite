import { useMemo } from "react";
import { Venue, VenueType } from "../domain";

export interface VenueSearchFilters {
  location: string;
  capacity: string;
  type: VenueType | "";
}

function matchesCapacityRange(range: string, capacity: number): boolean {
  if (!range) return true;
  if (range.endsWith("+")) {
    return capacity >= Number(range.replace("+", ""));
  }
  const [min, max] = range.split("-").map(Number);
  return capacity >= min && capacity <= max;
}

export function useVenueSearch(venues: Venue[], filters: VenueSearchFilters): Venue[] {
  return useMemo(() => {
    return venues.filter((venue) => {
      const matchesLocation =
        !filters.location || venue.city.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCapacity = matchesCapacityRange(filters.capacity, venue.capacity);
      const matchesType = !filters.type || venue.type === filters.type;
      return matchesLocation && matchesCapacity && matchesType;
    });
  }, [venues, filters]);
}
