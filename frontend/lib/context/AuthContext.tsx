'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@/types';
import { authApi } from '../api/auth';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (name: string, email?: string) => Promise<{ success: boolean; message: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(() => {
    localStorage.removeItem('flowmetrics_token');
    localStorage.removeItem('flowmetrics_user');
    setToken(null);
    setUser(null);
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const refreshUser = useCallback(async () => {
    const savedToken = localStorage.getItem('flowmetrics_token');
    const savedUserStr = localStorage.getItem('flowmetrics_user');
    
    if (!savedToken) {
      setIsLoading(false);
      return;
    }

    if (savedUserStr) {
      try {
        const parsedUser = JSON.parse(savedUserStr);
        setUser(parsedUser);
        setToken(savedToken);
      } catch {
        // Continue to sync
      }
    }

    try {
      const response = await authApi.getMe();
      if (response.success && response.data) {
        setUser(response.data);
        setToken(savedToken);
        localStorage.setItem('flowmetrics_user', JSON.stringify(response.data));
      }
    } catch {
      // Keep existing localStorage credentials if network or backend offline
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('flowmetrics_token', newToken);
    localStorage.setItem('flowmetrics_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const updateProfile = async (name: string, email?: string) => {
    try {
      const res = await authApi.updateProfile({ name, email });
      if (res.success && res.data) {
        if (res.data.token) {
          localStorage.setItem('flowmetrics_token', res.data.token);
          setToken(res.data.token);
        }
        if (res.data.user) {
          localStorage.setItem('flowmetrics_user', JSON.stringify(res.data.user));
          setUser(res.data.user);
        }
        return { success: true, message: res.message || 'Profile updated successfully' };
      }
      return { success: false, message: res.message || 'Failed to update profile' };
    } catch (err: any) {
      return { success: false, message: err.message || 'An error occurred while updating profile' };
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const res = await authApi.updatePassword({ currentPassword, newPassword });
      if (res.success) {
        return { success: true, message: res.message || 'Password changed successfully' };
      }
      return { success: false, message: res.message || 'Failed to change password' };
    } catch (err: any) {
      return { success: false, message: err.message || 'An error occurred while changing password' };
    }
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        logout,
        refreshUser,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
