import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types/app.d';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async () => {
    // Реальная логика получения данных пользователя
    return { user: 'John Doe' };
  }
);

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: Role,
    organization: string,
    department: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // В реальном приложении здесь будет вызов API
        const mockUsers = [
          {
            id: 1,
            name: "Иван Петров",
            email: "admin@mrtexpert.ru",
            role: "admin" as Role,
            avatar: "ИП",
            organization: "org1",
            department: "dep1"
          },
          {
            id: 2,
            name: "Мария Сидорова",
            email: "support@mrtexpert.ru",
            role: "support" as Role,
            avatar: "МС",
            organization: "org1",
            department: "dep1"
          }
        ];
        
        const user = mockUsers.find(
          u => u.email === email && u.password === password
        );
        
        if (!user) throw new Error("Неверные учетные данные");
        
        set({ user, isAuthenticated: true });
      },
      
      register: async (email, password, name, role, organization, department) => {
        const newUser = {
          id: Date.now(),
          name,
          email,
          role,
          avatar: name.slice(0, 2).toUpperCase(),
          organization,
          department
        };
        
        set({ user: newUser, isAuthenticated: true });
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      updateUser: (userData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }))
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);