export type UserRole = 'main_admin' | 'primary_admin' | 'manager' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clubId?: string;
  clubName?: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  lastActive: Date;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  primaryAdminId: string;
  members: User[];
  managers: User[];
  isActive: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  clubId?: string;
}