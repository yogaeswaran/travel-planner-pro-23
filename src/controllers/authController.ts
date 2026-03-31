// MVC Controller - Authentication logic
import { db } from '@/models/data';
import { AuthState, User } from '@/models/types';

const AUTH_KEY = 'ssk_auth';

export const authController = {
  /** Get current auth state from localStorage */
  getAuthState: (): AuthState => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      const user = JSON.parse(stored) as User;
      return { user, isAuthenticated: true };
    }
    return { user: null, isAuthenticated: false };
  },

  /** Login with email and password */
  login: (email: string, _password: string): { success: boolean; user?: User; error?: string } => {
    const user = db.users.getByEmail(email);
    if (!user) return { success: false, error: 'Invalid email or password' };
    // In production, verify password hash here
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  /** Register a new user */
  register: (name: string, email: string, _password: string): { success: boolean; user?: User; error?: string } => {
    if (db.users.getByEmail(email)) return { success: false, error: 'Email already registered' };
    const user = db.users.create({ name, email, role: 'user' });
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  /** Logout current user */
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  /** Check if current user is admin */
  isAdmin: (): boolean => {
    const { user } = authController.getAuthState();
    return user?.role === 'admin';
  },
};
