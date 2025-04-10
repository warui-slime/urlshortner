import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setCredentials, logout } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/services/authApi';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loginMutation] = useLoginMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          dispatch(setCredentials(response.data));
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      dispatch(setCredentials(response));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { 
    user,
    isLoading,
    login,
    logout: logoutUser
  };
};