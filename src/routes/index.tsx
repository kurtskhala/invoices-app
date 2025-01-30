import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_PATHS } from "./auth/index.enum";
import { INVOICE_VIEW_ROUTE } from "./invoices";
import { LoginComponent } from "./auth/login";
import { RegisterComponent } from "./auth/register";
import Layout from "@/layouts/invoices-layout/layout";
import SignInGuard from "@/components/route-guards/signInedGuard";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route element={<SignInGuard />}>
        <Route path={AUTH_PATHS.LOGIN} element={<LoginComponent />} />
        <Route path={AUTH_PATHS.REGISTER} element={<RegisterComponent />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<Layout />}>
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
