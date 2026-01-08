import { useState, useCallback, useEffect } from "react";
import { EventStatus, Event } from "../domain";
import { mockEvents } from "../mocks/data";

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;

  // Actions
  bookSeats: (eventId: string, count: number) => Promise<boolean>;
  cancelSeats: (eventId: string, count: number) => Promise<boolean>;
  publishEvent: (eventId: string) => Promise<boolean>;
  startEvent: (eventId: string) => Promise<boolean>;
  completeEvent: (eventId: string) => Promise<boolean>;
  cancelEvent: (eventId: string) => Promise<boolean>;
  addArtist: (eventId: string, artistId: string) => Promise<boolean>;
  removeArtist: (eventId: string, artistId: string) => Promise<boolean>;

  // Filtres
  getPublishedEvents: () => Event[];
  getUpcomingEvents: () => Event[];
  getAvailableEvents: () => Event[];
  getPastEvents: () => Event[];
  getEventsByStatus: (status: EventStatus) => Event[];
  getEventsByVenue: (venueId: string) => Event[];
  getEventsByArtist: (artistId: string) => Event[];
  findById: (id: string) => Event | undefined;

  // Utils
  refresh: () => Promise<void>;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial
  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setEvents([...mockEvents]);
    } catch (err) {
      setError("Erreur lors du chargement des événements");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // === ACTIONS ===

  const bookSeats = useCallback(
    async (eventId: string, count: number): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) {
        setError("Événement introuvable");
        return false;
      }

      const success = event.bookSeats(count);
      if (!success) {
        setError("Impossible de réserver ces places");
        return false;
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const cancelSeats = useCallback(
    async (eventId: string, count: number): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.cancelSeats(count);
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const publishEvent = useCallback(
    async (eventId: string): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.publish();
      if (!success) {
        setError("Impossible de publier cet événement");
        return false;
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const startEvent = useCallback(
    async (eventId: string): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.start();
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const completeEvent = useCallback(
    async (eventId: string): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.complete();
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const cancelEvent = useCallback(
    async (eventId: string): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.cancel();
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const addArtist = useCallback(
    async (eventId: string, artistId: string): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.addArtist(artistId);
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  const removeArtist = useCallback(
    async (eventId: string, artistId: string): Promise<boolean> => {
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;

      const success = event.removeArtist(artistId);
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setEvents([...events]);
      return true;
    },
    [events]
  );

  // === FILTRES ===

  const getPublishedEvents = useCallback(() => {
    return events.filter((e) => e.status === EventStatus.PUBLISHED);
  }, [events]);

  const getUpcomingEvents = useCallback(() => {
    return events.filter((e) => e.isUpcoming);
  }, [events]);

  const getAvailableEvents = useCallback(() => {
    return events.filter((e) => e.status === EventStatus.PUBLISHED && !e.isFull);
  }, [events]);

  const getPastEvents = useCallback(() => {
    return events.filter((e) => e.isPast);
  }, [events]);

  const getEventsByStatus = useCallback(
    (status: EventStatus) => {
      return events.filter((e) => e.status === status);
    },
    [events]
  );

  const getEventsByVenue = useCallback(
    (venueId: string) => {
      return events.filter((e) => e.venueId === venueId);
    },
    [events]
  );

  const getEventsByArtist = useCallback(
    (artistId: string) => {
      return events.filter((e) => e.artistIds.includes(artistId));
    },
    [events]
  );

  const findById = useCallback(
    (id: string) => {
      return events.find((e) => e.id === id);
    },
    [events]
  );

  return {
    events,
    loading,
    error,
    bookSeats,
    cancelSeats,
    publishEvent,
    startEvent,
    completeEvent,
    cancelEvent,
    addArtist,
    removeArtist,
    getPublishedEvents,
    getUpcomingEvents,
    getAvailableEvents,
    getPastEvents,
    getEventsByStatus,
    getEventsByVenue,
    getEventsByArtist,
    findById,
    refresh: loadEvents,
  };
}

/**
 * Hook pour un événement unique
 */
export function useEvent(eventId: string) {
  const {
    events,
    loading,
    error,
    bookSeats,
    cancelSeats,
    publishEvent,
    startEvent,
    completeEvent,
    cancelEvent,
    addArtist,
    removeArtist,
  } = useEvents();

  const event = events.find((e) => e.id === eventId);

  return {
    event,
    loading,
    error,
    bookSeats: (count: number) => bookSeats(eventId, count),
    cancelSeats: (count: number) => cancelSeats(eventId, count),
    publish: () => publishEvent(eventId),
    start: () => startEvent(eventId),
    complete: () => completeEvent(eventId),
    cancel: () => cancelEvent(eventId),
    addArtist: (artistId: string) => addArtist(eventId, artistId),
    removeArtist: (artistId: string) => removeArtist(eventId, artistId),
  };
}
