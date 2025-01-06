'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth, login as loginApi, logout as logoutApi, apiClient } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children, initialUser }) => {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);
  const [error, setError] = useState(null);

  const updateUserState = (userData) => {
    setUser(userData);
    setIsAuthenticated(!!userData);
  };

  useEffect(() => {
    if (!initialUser) {
      checkAuth()
        .then((userData) => {
          updateUserState(userData);
        })
        .catch((err) => {
          updateUserState(null);
          setError(err.message);
          console.error('Authentication error:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [initialUser]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginApi(credentials);
      updateUserState(userData);
      router.push('/');
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutApi();
      updateUserState(null);
    } catch (err) {
      setError(err.message);
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, error, login, logout, apiClient }}>
      {loading ? <div><LoadingSpinner></LoadingSpinner></div> : children}
    </AuthContext.Provider>
  );
};