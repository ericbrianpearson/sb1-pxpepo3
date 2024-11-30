import { useState, useCallback, useEffect } from 'react';
import { AuthState } from '../types/auth';
import { AUTH_CONFIG } from '../config/auth';
import axios from 'axios';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>(initialState);

  const handleAuthSuccess = useCallback(async (accessToken: string) => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      const { data: userData } = await axios.get(AUTH_CONFIG.endpoints.userInfo, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      setAuth({
        isAuthenticated: true,
        user: {
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
        },
        accessToken,
        loading: false,
        error: null,
      });

      // Store the token in sessionStorage
      sessionStorage.setItem('email_sanitizer_token', accessToken);
    } catch (error) {
      console.error('Authentication error:', error);
      setAuth(prev => ({
        ...initialState,
        error: 'Failed to authenticate. Please try again.',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('email_sanitizer_token');
    setAuth(initialState);
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const token = sessionStorage.getItem('email_sanitizer_token');
    if (token) {
      handleAuthSuccess(token);
    }
  }, [handleAuthSuccess]);

  return {
    auth,
    handleAuthSuccess,
    logout,
  };
};