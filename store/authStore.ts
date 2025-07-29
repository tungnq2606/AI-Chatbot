import { AppConfig } from '@/constants/AppConfig';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === AppConfig.DEMO_EMAIL && password === AppConfig.DEMO_PASSWORD) {
        const user: User = {
          id: '1',
          email,
          name: 'Demo User'
        };
        
        await SecureStore.setItemAsync(AppConfig.USER_TOKEN_KEY, 'demo_token_123');
        await SecureStore.setItemAsync(AppConfig.USER_DATA_KEY, JSON.stringify(user));
        
        set({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  signup: async (email: string, password: string, name: string) => {
    try {
      // Simulate API call - replace with actual signup logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        email,
        name
      };
      
      await SecureStore.setItemAsync(AppConfig.USER_TOKEN_KEY, `token_${user.id}`);
      await SecureStore.setItemAsync(AppConfig.USER_DATA_KEY, JSON.stringify(user));
      
      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(AppConfig.USER_TOKEN_KEY);
      await SecureStore.deleteItemAsync(AppConfig.USER_DATA_KEY);
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuthStatus: async () => {
    try {
      const token = await SecureStore.getItemAsync(AppConfig.USER_TOKEN_KEY);
      const userData = await SecureStore.getItemAsync(AppConfig.USER_DATA_KEY);
      
      if (token && userData) {
        const user = JSON.parse(userData);
        set({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Check auth status error:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
}));
