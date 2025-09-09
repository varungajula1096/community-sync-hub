import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Simulate user data for demo
  const mockUsers = {
    'admin@university.edu': {
      id: '1',
      email: 'admin@university.edu',
      name: 'University Admin',
      role: 'main_admin' as const,
      isEmailVerified: true,
      createdAt: new Date(),
      lastActive: new Date(),
    },
    'club.leader@university.edu': {
      id: '2',
      email: 'club.leader@university.edu',
      name: 'Tech Club Leader',
      role: 'primary_admin' as const,
      clubId: 'tech-club',
      clubName: 'Tech Innovation Club',
      isEmailVerified: true,
      createdAt: new Date(),
      lastActive: new Date(),
    },
    'manager@university.edu': {
      id: '3',
      email: 'manager@university.edu',
      name: 'Event Manager',
      role: 'manager' as const,
      clubId: 'tech-club',
      clubName: 'Tech Innovation Club',
      isEmailVerified: true,
      createdAt: new Date(),
      lastActive: new Date(),
    },
    'member@university.edu': {
      id: '4',
      email: 'member@university.edu',
      name: 'Club Member',
      role: 'member' as const,
      clubId: 'tech-club',
      clubName: 'Tech Innovation Club',
      isEmailVerified: true,
      createdAt: new Date(),
      lastActive: new Date(),
    },
  };

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem('auth_token');
    const userEmail = localStorage.getItem('user_email');
    
    if (token && userEmail && mockUsers[userEmail as keyof typeof mockUsers]) {
      setAuthState({
        user: mockUsers[userEmail as keyof typeof mockUsers],
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Simulate API call
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers[credentials.email as keyof typeof mockUsers];
    if (user && credentials.password === 'password') {
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user_email', credentials.email);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: RegisterData) => {
    // Simulate API call
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      clubId: data.clubId,
      isEmailVerified: false,
      createdAt: new Date(),
      lastActive: new Date(),
    };

    localStorage.setItem('auth_token', 'mock_jwt_token');
    localStorage.setItem('user_email', data.email);
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (updates: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};