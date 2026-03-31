// MVC Model - Mock database layer with seed data
import { User, Trip, Booking } from './types';
import destSantorini from '@/assets/dest-santorini.jpg';
import destAlps from '@/assets/dest-alps.jpg';
import destTokyo from '@/assets/dest-tokyo.jpg';
import destBali from '@/assets/dest-bali.jpg';

// Simulated database tables
let users: User[] = [
  { id: '1', email: 'admin@ssk.com', name: 'Admin User', role: 'admin', createdAt: '2025-01-01' },
  { id: '2', email: 'john@example.com', name: 'John Doe', role: 'user', createdAt: '2025-06-15' },
];

let trips: Trip[] = [
  {
    id: 't1', destination: 'Santorini, Greece', origin: 'New York', description: 'Experience the magic of white-washed buildings overlooking the stunning Aegean Sea. Enjoy world-class sunsets, delicious Mediterranean cuisine, and ancient ruins.',
    price: 1299, duration: '7 days', departureDate: '2026-06-15', returnDate: '2026-06-22', image: destSantorini, seats: 24, category: 'beach', rating: 4.8, featured: true,
  },
  {
    id: 't2', destination: 'Swiss Alps', origin: 'London', description: 'Discover breathtaking alpine scenery, charming villages, and world-renowned ski resorts. Hike pristine trails and enjoy Swiss chocolate and cheese.',
    price: 1899, duration: '5 days', departureDate: '2026-07-10', returnDate: '2026-07-15', image: destAlps, seats: 16, category: 'mountain', rating: 4.9, featured: true,
  },
  {
    id: 't3', destination: 'Tokyo, Japan', origin: 'Los Angeles', description: 'Immerse yourself in the perfect blend of ancient tradition and cutting-edge technology. From temples to Shibuya, Tokyo never disappoints.',
    price: 2199, duration: '10 days', departureDate: '2026-04-01', returnDate: '2026-04-11', image: destTokyo, seats: 30, category: 'city', rating: 4.7, featured: true,
  },
  {
    id: 't4', destination: 'Bali, Indonesia', origin: 'Sydney', description: 'Explore lush rice terraces, ancient temples, and pristine beaches. Bali offers the perfect mix of relaxation, culture, and adventure.',
    price: 999, duration: '8 days', departureDate: '2026-05-20', returnDate: '2026-05-28', image: destBali, seats: 20, category: 'adventure', rating: 4.6, featured: false,
  },
  {
    id: 't5', destination: 'Maldives', origin: 'Dubai', description: 'Unwind in overwater villas surrounded by crystal-clear turquoise waters. Snorkel with tropical fish and watch dolphins at sunset.',
    price: 2999, duration: '6 days', departureDate: '2026-08-05', returnDate: '2026-08-11', image: destSantorini, seats: 12, category: 'beach', rating: 5.0, featured: true,
  },
  {
    id: 't6', destination: 'Patagonia, Argentina', origin: 'Miami', description: 'Trek through one of the last wild frontiers on Earth. Glaciers, mountains, and vast open spaces await the adventurous traveler.',
    price: 1599, duration: '9 days', departureDate: '2026-09-12', returnDate: '2026-09-21', image: destAlps, seats: 14, category: 'adventure', rating: 4.5, featured: false,
  },
];

let bookings: Booking[] = [
  { id: 'b1', userId: '2', tripId: 't1', passengers: 2, totalPrice: 2598, status: 'confirmed', bookedAt: '2026-03-01', contactEmail: 'john@example.com', contactPhone: '+1234567890' },
];

// Database access functions (simulated DAO layer)
export const db = {
  users: {
    getAll: () => [...users],
    getById: (id: string) => users.find(u => u.id === id) || null,
    getByEmail: (email: string) => users.find(u => u.email === email) || null,
    create: (user: Omit<User, 'id' | 'createdAt'>) => {
      const newUser: User = { ...user, id: String(Date.now()), createdAt: new Date().toISOString().split('T')[0] };
      users = [...users, newUser];
      return newUser;
    },
    delete: (id: string) => { users = users.filter(u => u.id !== id); },
  },
  trips: {
    getAll: () => [...trips],
    getById: (id: string) => trips.find(t => t.id === id) || null,
    search: (query: string, category?: string) => {
      return trips.filter(t => {
        const matchesQuery = !query || t.destination.toLowerCase().includes(query.toLowerCase()) || t.origin.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = !category || category === 'all' || t.category === category;
        return matchesQuery && matchesCategory;
      });
    },
    getFeatured: () => trips.filter(t => t.featured),
    create: (trip: Omit<Trip, 'id'>) => {
      const newTrip: Trip = { ...trip, id: 't' + Date.now() };
      trips = [...trips, newTrip];
      return newTrip;
    },
    update: (id: string, data: Partial<Trip>) => {
      trips = trips.map(t => t.id === id ? { ...t, ...data } : t);
      return trips.find(t => t.id === id) || null;
    },
    delete: (id: string) => { trips = trips.filter(t => t.id !== id); },
  },
  bookings: {
    getAll: () => [...bookings],
    getByUserId: (userId: string) => bookings.filter(b => b.userId === userId),
    create: (booking: Omit<Booking, 'id' | 'bookedAt'>) => {
      const newBooking: Booking = { ...booking, id: 'b' + Date.now(), bookedAt: new Date().toISOString().split('T')[0] };
      bookings = [...bookings, newBooking];
      return newBooking;
    },
    updateStatus: (id: string, status: Booking['status']) => {
      bookings = bookings.map(b => b.id === id ? { ...b, status } : b);
      return bookings.find(b => b.id === id) || null;
    },
    delete: (id: string) => { bookings = bookings.filter(b => b.id !== id); },
  },
};
