// MVC Models - Data types representing the application's domain

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Trip {
  id: string;
  destination: string;
  origin: string;
  description: string;
  price: number;
  duration: string;
  departureDate: string;
  returnDate: string;
  image: string;
  seats: number;
  category: 'beach' | 'mountain' | 'city' | 'adventure';
  rating: number;
  featured: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  tripId: string;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  contactEmail: string;
  contactPhone: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
