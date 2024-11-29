import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from './api';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const { data } = await api.post('/auth/local', {
            identifier: email,
            password,
          });

          const user = jwtDecode(data.jwt);
          set({ token: data.jwt, user, isAuthenticated: true });
          
          // Add token to API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        delete api.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);