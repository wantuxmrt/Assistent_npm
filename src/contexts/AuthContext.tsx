// Файл: src/contexts/AuthContext.tsx
import React, { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userName: string;
  userId: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
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