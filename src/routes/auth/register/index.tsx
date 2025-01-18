import { lazy, Suspense } from 'react';

const Register = lazy(() => import('@/pages/register'));

export const RegisterComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Register />
  </Suspense>
);
