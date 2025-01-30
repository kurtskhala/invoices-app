import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const SignInGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const hasAuthToken = !!Cookies.get("auth_token");

  if (hasAuthToken) {
    return <Navigate to="/invoices" replace />;
  }

  return children || <Outlet />;
};

export default SignInGuard;
