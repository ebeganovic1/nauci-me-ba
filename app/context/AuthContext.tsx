// app/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: 'guest' | 'student' | 'tutor';
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Provera da li postoji sesija pri učitavanju
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulacija API poziva - u pravoj aplikaciji bi ovo bio fetch ka backendu
      const mockUsers = [
        { id: '1', email: 'student@example.com', password: 'password', fullName: 'Test Student', role: 'student' as const },
        { id: '2', email: 'tutor@example.com', password: 'password', fullName: 'Test Tutor', role: 'tutor' as const },
      ];
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Simulacija registracije
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        phone: userData.phone || '',
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}