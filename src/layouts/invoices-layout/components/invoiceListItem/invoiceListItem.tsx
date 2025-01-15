import { Badge } from '@/components/ui/badge';
import RightArrow from '@/assets/icon-arrow-right.svg';
import { InvoiceListItemProps } from '@/types';
import { useInvoice } from '@/hooks/useInvoices';

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ id, onClick }) => {
  const { data: item, isLoading, isError, error } = useInvoice(id as string);

  if (isLoading) {
    return (
      <div className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-center items-center text-red-500">
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  }

  if (!item) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = item.paymentDue ? new Date(item.paymentDue) : new Date();
  const formattedDate = date?.toLocaleDateString('en-GB', options);

  return (
    <div
      onClick={() => onClick()}
      className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-evenly items-center sm:gap-x-2 gap-x-10 cursor-pointer"
    >
      <p>
        <span className="text-muted-foreground">#</span>

        <span className="font-bold">{`${item?.id}`}</span>
      </p>
      <p className="text-muted-foreground hidden sm:block">
        Due {formattedDate}
      </p>
      <p className="text-muted-foreground hidden sm:block">
        {item?.clientName}
      </p>
      <p className="font-bold hidden sm:block">£ {item?.total}</p>
      <Badge variant={item?.status}>{item?.status}</Badge>
      <img src={RightArrow} alt="left arrow" />
    </div>
  );
};

export default InvoiceListItem;
