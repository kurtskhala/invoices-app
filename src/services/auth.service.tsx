import Cookies from 'js-cookie';
import { SignUpData } from '@/types';
import { ProtectedRouteProps } from '@/types';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TOKEN_COOKIE_NAME = 'auth_token';
const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: 'strict' as const,
  path: '/',
};

// eslint-disable-next-line react-refresh/only-export-components
export const authService = {
  getToken: (): string | null => Cookies.get(TOKEN_COOKIE_NAME) || null,

  setToken: (token: string): void => {
    Cookies.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS);
  },

  removeToken: (): void => Cookies.remove(TOKEN_COOKIE_NAME, { path: '/' }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: async (email: string, password: string): Promise<any> => {
    const response = await fetch('https://shark-app-jk6jb.ondigitalocean.app/auth/sign-in', {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signup: async (data: SignUpData): Promise<any> => {
    const response = await fetch('https://shark-app-jk6jb.ondigitalocean.app/auth/sign-up', {
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

  // logout: async () => {
  //   try {
  //     await fetch('http://localhost:3000/auth/logout', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE_NAME)}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   } finally {
  //     authService.removeToken();
  //   }
  // },

  getUserId: (): string | null => {
    const token = authService.getToken();
    if (!token) return null;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwtDecode(token);
      return decoded.userId || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  fetchWithAuth: async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const token = authService.getToken();

    if (!token) {
      throw new Error('Unauthorized: No token provided');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },

  isAuthenticated: (): boolean => {
    return Boolean(authService.getToken());
  },
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/signin',
}) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};
