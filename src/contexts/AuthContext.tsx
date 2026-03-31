import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '@/models/types';
import { authController } from '@/controllers/authController';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });

  useEffect(() => {
    setAuthState(authController.getAuthState());
  }, []);

  const login = (email: string, password: string) => {
    const result = authController.login(email, password);
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true });
    }
    return { success: result.success, error: result.error };
  };

  const register = (name: string, email: string, password: string) => {
    const result = authController.register(name, email, password);
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true });
    }
    return { success: result.success, error: result.error };
  };

  const logout = () => {
    authController.logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
