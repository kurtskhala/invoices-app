import { Badge } from "@/components/ui/badge";
import RightArrow from "@/assets/icon-arrow-right.svg";
import { useEffect, useState } from "react";
import { Invoice } from "@/types";
import { InvoiceListItemProps } from "@/types";

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ id, onClick }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/invoices/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch invoice");
        }
        const data = await response.json();
        setInvoice(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
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

  if (!invoice) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(invoice.paymentDue);

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <div
      onClick={() => onClick()}
      className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-evenly items-center sm:gap-x-2 gap-x-10 cursor-pointer"
    >
      <p>
        <span className="text-muted-foreground">#</span>
        <span className="font-bold">{`${invoice.id}`}</span>
      </p>
      <p className="text-muted-foreground hidden sm:block">
        Due {formattedDate}
      </p>
      <p className="text-muted-foreground hidden sm:block">
        {invoice.clientName}
      </p>
      <p className="font-bold hidden sm:block">£ {invoice.total.toFixed(2)}</p>
      <Badge variant={invoice.status}>{invoice.status}</Badge>
      <img src={RightArrow} alt="left arrow" />
    </div>
  );
};

export default InvoiceListItem;
