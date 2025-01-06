import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { INVOICE_PATHS } from './index.enum';

const InvoiceView = lazy(() => import('@/pages/invoices/views/list'));

export const INVOICE_VIEW_ROUTE = [
  <Route
    key="invoices"
    path={INVOICE_PATHS.INVOICES}
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceView />
      </Suspense>
    }
  />,
];
