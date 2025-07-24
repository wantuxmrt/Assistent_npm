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
  system: '1c' | 'mis';
  category: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  subcategory?: string;
  attachments: string[];
}

export interface TicketUpdateRequest {
  id: number;
  status?: 'new' | 'in-progress' | 'resolved' | 'reopened';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  assignedTo?: number | null;
  title?: string;
  description?: string;
}

export interface TicketFilterParams {
  system?: '1c' | 'mis';
  status?: 'new' | 'in-progress' | 'resolved' | 'reopened';
  priority?: 'critical' | 'high' | 'medium' | 'low';
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

export interface RequestFormData {
  title: string;
  description: string;
  attachments: string[];
  files?: File[];
}

// Request 
export interface Ticket {
  id: number;
  system: '1c' | 'mis';
  category: string;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'resolved' | 'reopened';
  priority: 'critical' | 'high' | 'medium' | 'low';
  created: string;
  userId: number;
  assignedTo: number | null; // Добавлена поддержка null
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  author: string;
  time: string;
  text: string;
}