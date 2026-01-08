import { useState, useCallback, useEffect } from "react";
import { Venue, VenueType } from "../domain";
import { mockVenues } from "../mocks/data";

interface UseVenuesReturn {
  venues: Venue[];
  loading: boolean;
  error: string | null;

  // Actions
  activateVenue: (venueId: string) => Promise<boolean>;
  deactivateVenue: (venueId: string) => Promise<boolean>;
  updateRating: (venueId: string, rating: number, reviewCount: number) => Promise<boolean>;

  // Filtres
  findByManagerId: (managerId: string) => Venue[];
  findByCity: (city: string) => Venue[];
  findByType: (type: VenueType) => Venue[];
  findActive: () => Venue[];
  findByCapacityRange: (min: number, max: number) => Venue[];
  findById: (id: string) => Venue | undefined;

  refresh: () => Promise<void>;
}

export function useVenues(): UseVenuesReturn {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVenues = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 300));
      setVenues([...mockVenues]);
    } catch (err) {
      setError('Erreur lors du chargement des venues');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVenues();
  }, [loadVenues]);

  // === ACTIONS ===

  const activateVenue = useCallback(async (venueId: string): Promise<boolean> => {
    const venue = venues.find(v => v.id === venueId);
    if (!venue) return false;

    venue.activate();
    await new Promise(resolve => setTimeout(resolve, 200));
    setVenues([...venues]);
    return true;
  }, [venues]);

  const deactivateVenue = useCallback(async (venueId: string): Promise<boolean> => {
    const venue = venues.find(v => v.id === venueId);
    if (!venue) return false;

    venue.deactivate();
    await new Promise(resolve => setTimeout(resolve, 200));
    setVenues([...venues]);
    return true;
  }, [venues]);

  const updateRating = useCallback(async (
    venueId: string,
    rating: number,
    reviewCount: number
  ): Promise<boolean> => {
    const venue = venues.find(v => v.id === venueId);
    if (!venue) return false;

    venue.updateRating(rating, reviewCount);
    await new Promise(resolve => setTimeout(resolve, 200));
    setVenues([...venues]);
    return true;
  }, [venues]);

  // === FILTRES ===

  const findByManagerId = useCallback((managerId: string) => {
    return venues.filter(v => v.managerId === managerId);
  }, [venues]);

  const findByCity = useCallback((city: string) => {
    return venues.filter(v => v.city.toLowerCase() === city.toLowerCase());
  }, [venues]);

  const findByType = useCallback((type: VenueType) => {
    return venues.filter(v => v.type === type);
  }, [venues]);

  const findActive = useCallback(() => {
    return venues.filter(v => v.isActive);
  }, [venues]);

  const findByCapacityRange = useCallback((min: number, max: number) => {
    return venues.filter(v => v.capacity >= min && v.capacity <= max);
  }, [venues]);

  const findById = useCallback((id: string) => {
    return venues.find(v => v.id === id);
  }, [venues]);

  return {
    venues,
    loading,
    error,
    activateVenue,
    deactivateVenue,
    updateRating,
    findByManagerId,
    findByCity,
    findByType,
    findActive,
    findByCapacityRange,
    findById,
    refresh: loadVenues,
  };
}
