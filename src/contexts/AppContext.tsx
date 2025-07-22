import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, RequestTicket, ProblemCategory, PriorityLevel } from '@/types/app.d';
import { authAPI, requestsAPI } from '@/services/api';
import { useLocalStorage } from '@/hooks';

// Типы для контекста
interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tickets: RequestTicket[];
  categories: Record<PriorityLevel, ProblemCategory>;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => void;
  createTicket: (ticket: Omit<RequestTicket, 'id'>) => Promise<void>;
  updateTicket: (id: number, updates: Partial<RequestTicket>) => Promise<void>;
  clearError: () => void;
  fetchTickets: () => Promise<void>;
  getSupportUsers: () => User[];
}

// Создаем контекст с начальным значением
const AppContext = createContext<AppContextType | undefined>(undefined);

// Провайдер контекста
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [tickets, setTickets] = useState<RequestTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Категории проблем (статичные данные)
  const [categories] = useState<Record<PriorityLevel, ProblemCategory>>({
    critical: {
      name: "Авария",
      icon: "fire",
      items: [
        // ... структура категорий как в HTML ...
      ]
    },
    high: {
      name: "Сбой",
      icon: "exclamation-triangle",
      items: [
        // ... структура категорий ...
      ]
    },
    medium: {
      name: "Обслуживание",
      icon: "cogs",
      items: [
        // ... структура категорий ...
      ]
    },
    low: {
      name: "Дополнительно",
      icon: "ellipsis-h",
      items: [
        // ... структура категорий ...
      ]
    }
  });

  const isAuthenticated = !!user;

  // Восстановление сессии при загрузке
  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true);
      try {
        if (user?.token) {
          const restoredUser = await authAPI.restoreSession(user.token);
          setUser(restoredUser);
        }
      } catch (err) {
        console.error("Session restore error:", err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Авторизация
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authAPI.login(email, password);
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Ошибка авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  // Регистрация
  const register = async (userData: User) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await authAPI.register(userData);
      setUser(newUser);
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  // Выход
  const logout = () => {
    authAPI.logout();
    setUser(null);
    setTickets([]);
  };

  // Создание заявки
  const createTicket = async (ticket: Omit<RequestTicket, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) throw new Error("Требуется авторизация");
      const newTicket = await requestsAPI.createTicket({
        ...ticket,
        userId: user.id,
        status: 'new',
        created: new Date().toISOString(),
        comments: [],
        attachments: []
      });
      setTickets(prev => [...prev, newTicket]);
    } catch (err: any) {
      setError(err.message || "Ошибка создания заявки");
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление заявки
  const updateTicket = async (id: number, updates: Partial<RequestTicket>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTicket = await requestsAPI.updateTicket(id, updates);
      setTickets(prev => 
        prev.map(t => t.id === id ? updatedTicket : t)
      );
    } catch (err: any) {
      setError(err.message || "Ошибка обновления заявки");
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка заявок
  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("Требуется авторизация");
      const userTickets = await requestsAPI.getUserTickets(user.id);
      setTickets(userTickets);
    } catch (err: any) {
      setError(err.message || "Ошибка загрузки заявок");
    } finally {
      setIsLoading(false);
    }
  };

  // Получение пользователей поддержки
  const getSupportUsers = (): User[] => {
    // В реальном приложении это бы запрос к API
    return [
      // Моковые данные
      {
        id: 1,
        name: "Мария Сидорова",
        email: "support@mrtexpert.ru",
        role: "support",
        avatar: "МС",
        organization: "org1",
        department: "dep1"
      },
      {
        id: 2,
        name: "Иван Петров",
        email: "admin@mrtexpert.ru",
        role: "admin",
        avatar: "ИП",
        organization: "org1",
        department: "dep1"
      }
    ];
  };

  // Очистка ошибок
  const clearError = () => setError(null);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        tickets,
        categories,
        login,
        register,
        logout,
        createTicket,
        updateTicket,
        clearError,
        fetchTickets,
        getSupportUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Хук для использования контекста
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Экспорт контекста по умолчанию
export default AppContext;