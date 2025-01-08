export interface Invoice {
  _id: string;
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
<<<<<<< HEAD
  status: "paid" | "pending" | "draft";
=======
  status: 'paid' | 'pending' | 'draft';
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71
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
<<<<<<< HEAD

export interface EditAddDialogProps {
  action?: string;
  createdId?: string;
  id?: string;
}

export interface InvoiceListItemProps {
  id: string;
  onClick: () => void;
}
=======
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71
