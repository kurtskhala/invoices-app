export interface Invoice {
  _id?: string;
  id?: string;
  createdAt?: string;
  invoiceDate: string;
  paymentDue?: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: 'paid' | 'pending' | 'draft';
  senderAddress: {
    _id?: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    _id?: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    _id?: string;
    name: string;
    quantity: number;
    price: number;
    total?: number;
  }[];
  total?: number;
}

export interface ValidationErrors {
  senderAddress?: {
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
  };
  clientAddress?: {
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
  };
  clientName?: string;
  clientEmail?: string;
  invoiceDate?: string;
  paymentTerms?: string;
  description?: string;
  items?: string[];
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface DeletePopUpProps {
  id?: string;
  createdId?: string;
}

export interface EditAddDialogProps {
  action: string;
  createdId?: string;
  invoice?: Invoice;
  id?: string;
}

export interface InvoiceListItemProps {
  id?: string;
  onClick: () => void;
}

export interface InvoiceFormProps {
  action: string;
  id?: string;
  invoice?: Invoice;
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}
