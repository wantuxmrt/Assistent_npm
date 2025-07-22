// Файл: src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from './routesConfig';

interface PrivateRouteProps {
  children: React.ReactElement;
  allowedRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // Пользователь не аутентифицирован
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Проверка роли, если требуется
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;