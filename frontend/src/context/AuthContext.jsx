import { createContext, useState, useEffect } from 'react';
import { authApi } from '@/api/authApi';
import { setTokens, clearTokens, getUser, isAuthenticated } from '@/utils/tokenManager';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const response = await authApi.getCurrentUser();
          setUser(response.data. user);
          setIsAuth(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          clearTokens();
          setUser(null);
          setIsAuth(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      const { user, token, refreshToken } = response.data;
      
      setTokens(token, refreshToken, user);
      setUser(user);
      setIsAuth(true);
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi. register(userData);
      const { user, token, refreshToken } = response.data;
      
      setTokens(token, refreshToken, user);
      setUser(user);
      setIsAuth(true);
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      setUser(null);
      setIsAuth(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    setTokens(null, null, updatedUser);
  };

  const value = {
    user,
    isAuth,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};