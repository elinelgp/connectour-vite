import { useState, useCallback, useEffect } from "react";
import { Booking, BookingStatus } from "../domain";
import { mockBookings } from "../mocks/data";

interface UseBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;

  // Actions
  confirmBooking: (bookingId: string, paymentId?: string) => Promise<boolean>;
  completeBooking: (bookingId: string) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  markNoShow: (bookingId: string) => Promise<boolean>;
  createBooking: (
    eventId: string,
    userId: string,
    seats: number,
    price: number
  ) => Promise<Booking | null>;

  // Filtres
  findByUserId: (userId: string) => Booking[];
  findByEventId: (eventId: string) => Booking[];
  findByStatus: (status: BookingStatus) => Booking[];
  findByReference: (reference: string) => Booking | undefined;
  findActive: () => Booking[];
  findById: (id: string) => Booking | undefined;

  // Stats
  calculateRevenue: (eventId?: string) => number;

  refresh: () => Promise<void>;
}

export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setBookings([...mockBookings]);
    } catch (err) {
      setError("Erreur lors du chargement des réservations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // === ACTIONS ===

  const confirmBooking = useCallback(
    async (bookingId: string, paymentId?: string): Promise<boolean> => {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) return false;

      const success = booking.confirm(paymentId);
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setBookings([...bookings]);
      return true;
    },
    [bookings]
  );

  const completeBooking = useCallback(
    async (bookingId: string): Promise<boolean> => {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) return false;

      const success = booking.complete();
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setBookings([...bookings]);
      return true;
    },
    [bookings]
  );

  const cancelBooking = useCallback(
    async (bookingId: string): Promise<boolean> => {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) return false;

      const success = booking.cancel();
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setBookings([...bookings]);
      return true;
    },
    [bookings]
  );

  const markNoShow = useCallback(
    async (bookingId: string): Promise<boolean> => {
      const booking = bookings.find((b) => b.id === bookingId);
      if (!booking) return false;

      const success = booking.markNoShow();
      if (!success) return false;

      await new Promise((resolve) => setTimeout(resolve, 200));
      setBookings([...bookings]);
      return true;
    },
    [bookings]
  );

  const createBooking = useCallback(
    async (
      eventId: string,
      userId: string,
      seats: number,
      price: number
    ): Promise<Booking | null> => {
      try {
        const booking = Booking.create(eventId, userId, seats, price);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setBookings([...bookings, booking]);
        return booking;
      } catch (err) {
        setError("Erreur lors de la création de la réservation");
        console.error(err);
        return null;
      }
    },
    [bookings]
  );

  // === FILTRES ===

  const findByUserId = useCallback(
    (userId: string) => {
      return bookings.filter((b) => b.userId === userId);
    },
    [bookings]
  );

  const findByEventId = useCallback(
    (eventId: string) => {
      return bookings.filter((b) => b.eventId === eventId);
    },
    [bookings]
  );

  const findByStatus = useCallback(
    (status: BookingStatus) => {
      return bookings.filter((b) => b.status === status);
    },
    [bookings]
  );

  const findByReference = useCallback(
    (reference: string) => {
      return bookings.find((b) => b.bookingReference === reference);
    },
    [bookings]
  );

  const findActive = useCallback(() => {
    return bookings.filter((b) => b.isActive);
  }, [bookings]);

  const findById = useCallback(
    (id: string) => {
      return bookings.find((b) => b.id === id);
    },
    [bookings]
  );

  // === STATS ===

  const calculateRevenue = useCallback(
    (eventId?: string) => {
      let relevantBookings = bookings.filter((b) => b.status === BookingStatus.CONFIRMED);

      if (eventId) {
        relevantBookings = relevantBookings.filter((b) => b.eventId === eventId);
      }

      return relevantBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    },
    [bookings]
  );

  return {
    bookings,
    loading,
    error,
    confirmBooking,
    completeBooking,
    cancelBooking,
    markNoShow,
    createBooking,
    findByUserId,
    findByEventId,
    findByStatus,
    findByReference,
    findActive,
    findById,
    calculateRevenue,
    refresh: loadBookings,
  };
}
