// Типы ролей пользователей
export type Role = 'admin' | 'support' | 'manager' | 'user';

// Типы систем для тикетов
export type TicketSystem = '1c' | 'mis';

// Статусы тикетов
export type TicketStatus = 'new' | 'in-progress' | 'resolved' | 'reopened';

// Приоритеты тикетов
export type Priority = 'critical' | 'high' | 'medium' | 'low';

// Интерфейс пользователя
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  organization: string;
  department: string;
  password?: string;
  active?: boolean;
}

// Интерфейс комментария
export interface Comment {
  author: string;
  text: string;
  time: string;
}

// Интерфейс тикета
export interface Ticket {
  id: number;
  system: TicketSystem;
  category: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  created: string;
  userId: number;
  assignedTo?: number;
  comments: Comment[];
  attachments: string[];
  subcategory?: string;
}

// Организации и отделы
export interface Organization {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}