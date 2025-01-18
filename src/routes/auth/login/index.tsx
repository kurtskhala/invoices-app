import { lazy, Suspense } from 'react';

const Login = lazy(() => import('@/pages/login'));

export const LoginComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Login />
  </Suspense>
);
