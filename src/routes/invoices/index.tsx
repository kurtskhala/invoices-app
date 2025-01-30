import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { INVOICE_PATHS } from "./index.enum";
import AuthGuard from "@/components/route-guards/authGuard";

const InvoiceView = lazy(() => import("@/pages/invoices/views/list"));
const InvoiceDetail = lazy(
  () => import("@/pages/invoices/views/invoiceDetails")
);

export const INVOICE_VIEW_ROUTE = [
  <Route
    key="invoices"
    path={INVOICE_PATHS.INVOICES}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <InvoiceView />
        </AuthGuard>
      </Suspense>
    }
  />,
  <Route
    key="invoice"
    path={INVOICE_PATHS.INVOICE}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <InvoiceDetail />
        </AuthGuard>
      </Suspense>
    }
  />,
];
