import { SignUpData } from '@/types';

export const authService = {
  getToken: () => localStorage.getItem('token'),

  setToken: (token: string) => localStorage.setItem('token', token),

  removeToken: () => localStorage.removeItem('token'),

  login: async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    authService.setToken(data.accessToken);
    return data;
  },

  signup: async (data: SignUpData) => {
    const response = await fetch('http://localhost:3000/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      if (result.message === 'Email already exists') {
        throw new Error('Email already in use');
      }
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  },

  //   logout: async () => {
  //     try {
  //       await fetch('http://localhost:3000/auth/logout', {
  //         method: 'POST',
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Logout error:', error);
  //     } finally {
  //       localStorage.removeItem('token');
  //     }
  //   },

  fetchWithAuth: async (url: string, options: RequestInit = {}) => {
    const token = authService.getToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },
};
