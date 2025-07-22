import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api/authAPI';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      
      try {
        const userData = await loginUser(email, password);
        setUser(userData);
        navigate('/');
      } catch (err) {
        setError('Неверные учетные данные');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      role: string,
      organization: string,
      department: string
    ) => {
      setLoading(true);
      setError(null);
      
      try {
        const userData = await registerUser(
          email,
          password,
          role,
          organization,
          department
        );
        setUser(userData);
        navigate('/');
      } catch (err) {
        setError('Ошибка регистрации');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};