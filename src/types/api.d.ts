import { User, Ticket, Stats } from './app';

// Auth API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
  organization: string;
  department: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

// Users API
export interface UserUpdateRequest {
  id: number;
  name?: string;
  email?: string;
  role?: string;
  organization?: string;
  department?: string;
  active?: boolean;
  password?: string;
}

// Tickets API
export interface TicketCreateRequest {
  system: string;
  category: string;
  title: string;
  description: string;
  priority: string;
  subcategory?: string;
  attachments: string[];
}

export interface TicketUpdateRequest {
  id: number;
  status?: string;
  priority?: string;
  assignedTo?: number | null;
  title?: string;
  description?: string;
}

export interface TicketFilterParams {
  system?: string;
  status?: string;
  priority?: string;
  search?: string;
  userId?: number;
}

export interface TicketResponse {
  tickets: Ticket[];
  stats: Stats;
}

// Generic API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// src/types/api.d.ts
export interface Request {
  id: number;
  title: string;
  description: string;
  system: '1c' | 'mis';
  status: 'new' | 'in-progress' | 'resolved' | 'reopened';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created: string;
}

// Изменяем тип в файле src/types/api.d.ts
export interface RequestFormData {
  title: string;
  description: string;
  attachments: string[];
  files?: File[]; // Добавляем необязательное свойство
}