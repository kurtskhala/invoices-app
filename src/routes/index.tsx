import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_PATHS } from "./auth/index.enum";
import { AUTH_ROUTES } from "./auth";
import { INVOICE_VIEW_ROUTE } from "./invoices";
import Layout from "@/layouts/invoices-layout/layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={`/${AUTH_PATHS.LOGIN}`} />} />
      <Route path={AUTH_PATHS.DEFAULT} element={<Layout />}>
        {AUTH_ROUTES}
        {INVOICE_VIEW_ROUTE}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
