// MVC Controller - Trip business logic
import { db } from '@/models/data';
import { Trip } from '@/models/types';

export const tripController = {
  getAllTrips: () => db.trips.getAll(),
  getFeaturedTrips: () => db.trips.getFeatured(),
  getTripById: (id: string) => db.trips.getById(id),
  searchTrips: (query: string, category?: string) => db.trips.search(query, category),
  createTrip: (trip: Omit<Trip, 'id'>) => db.trips.create(trip),
  updateTrip: (id: string, data: Partial<Trip>) => db.trips.update(id, data),
  deleteTrip: (id: string) => db.trips.delete(id),
};
