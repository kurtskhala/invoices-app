import { Badge } from '@/components/ui/badge';
import RightArrow from '@/assets/icon-arrow-right.svg';

import { Invoice, InvoiceListItemProps } from '@/types';
import { useEffect, useState } from 'react';
import { invoiceService } from '@/services/invoice.service';

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ id, onClick }) => {
  const [item, setItem] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      try {
        const data = await invoiceService.getInvoice(id);
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return (
      <div className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!item) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(item.paymentDue);
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return (
    <div
      onClick={() => onClick()}
      className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-evenly items-center sm:gap-x-2 gap-x-10 cursor-pointer"
    >
      <p>
        <span className="text-muted-foreground">#</span>

        <span className="font-bold">{`${item.id}`}</span>
      </p>
      <p className="text-muted-foreground hidden sm:block">
        Due {formattedDate}
      </p>
      <p className="text-muted-foreground hidden sm:block">{item.clientName}</p>
      <p className="font-bold hidden sm:block">£ {item.total.toFixed(2)}</p>
      <Badge variant={item.status}>{item.status}</Badge>
      <img src={RightArrow} alt="left arrow" />
    </div>
  );
};

export default InvoiceListItem;
