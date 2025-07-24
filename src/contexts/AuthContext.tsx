import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userName: string;
  userId: number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  // Convert userId to number
  const authWithNumberId = {
    ...auth,
    userId: Number(auth.userId)
  };

  return (
    <AuthContext.Provider value={authWithNumberId as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};