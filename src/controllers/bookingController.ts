// MVC Controller - Booking business logic
import { db } from '@/models/data';
import { Booking } from '@/models/types';

export const bookingController = {
  getAllBookings: () => db.bookings.getAll(),
  getUserBookings: (userId: string) => db.bookings.getByUserId(userId),

  createBooking: (data: Omit<Booking, 'id' | 'bookedAt'>): { success: boolean; booking?: Booking; error?: string } => {
    const trip = db.trips.getById(data.tripId);
    if (!trip) return { success: false, error: 'Trip not found' };
    if (data.passengers > trip.seats) return { success: false, error: 'Not enough seats available' };
    const booking = db.bookings.create(data);
    // Reduce available seats
    db.trips.update(data.tripId, { seats: trip.seats - data.passengers });
    return { success: true, booking };
  },

  cancelBooking: (id: string) => db.bookings.updateStatus(id, 'cancelled'),
  deleteBooking: (id: string) => db.bookings.delete(id),
};
