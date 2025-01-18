import { Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_PATHS } from './auth/index.enum';
import { INVOICE_VIEW_ROUTE } from './invoices';
import { LoginComponent } from './auth/login';
import { RegisterComponent } from './auth/register';
import Layout from '@/layouts/invoices-layout/layout';
import { ProtectedRoute } from '@/services/auth.service';
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path={AUTH_PATHS.LOGIN} element={<LoginComponent />} />
      <Route path={AUTH_PATHS.REGISTER} element={<RegisterComponent />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute redirectTo={`/${AUTH_PATHS.LOGIN}`}>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect for root path */}
        <Route index element={<Navigate to={AUTH_PATHS.DEFAULT} replace />} />

        {/* Invoice routes and other protected content */}
        {INVOICE_VIEW_ROUTE}
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to={AUTH_PATHS.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRoutes;
