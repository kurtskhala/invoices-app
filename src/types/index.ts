export interface Invoice {
  _id: string;
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
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
  action?: string;
  createdId?: string;
  id?: string;
}

export interface InvoiceListItemProps {
  id: string;
  onClick: () => void;
}
