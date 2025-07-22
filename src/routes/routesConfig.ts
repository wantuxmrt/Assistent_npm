// Файл: src/routes/routesConfig.ts

// Типы для ролей пользователей
export type UserRole = 'user' | 'support' | 'admin' | 'manager';

// Интерфейс конфигурации маршрута
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  isPrivate?: boolean;
  allowedRoles?: UserRole[];
  layout?: boolean;
}

// Импорт страниц
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import AdminPage from '../pages/AdminPage';
import ModerationPage from '../pages/ModerationPage';
import HelpPage from '../pages/HelpPage';
import NotFoundPage from '../pages/NotFoundPage';

// Конфигурация маршрутов
const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <MainPage />,
    isPrivate: true,
    allowedRoles: ['user', 'support', 'admin', 'manager'],
    layout: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    layout: false,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    isPrivate: true,
    allowedRoles: ['user', 'support', 'admin', 'manager'],
    layout: true,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    isPrivate: true,
    allowedRoles: ['admin'],
    layout: true,
  },
  {
    path: '/moderation',
    element: <ModerationPage />,
    isPrivate: true,
    allowedRoles: ['manager'],
    layout: true,
  },
  {
    path: '/help',
    element: <HelpPage />,
    isPrivate: true,
    allowedRoles: ['user', 'support', 'admin', 'manager'],
    layout: true,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    layout: false,
  },
];

export default routesConfig;