import { Badge } from '@/components/ui/badge';
import RightArrow from '@/assets/icon-arrow-right.svg';

const InvoiceListItem = ({ item }) => {
  const date = new Date(item.paymentDue);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return (
    <div className="p-[30px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-evenly items-center">
      <p>
        <span className="text-muted-foreground">#</span>
        <span className="font-bold">{`${item.id}`}</span>
      </p>
      <p className="text-muted-foreground">Due {formattedDate}</p>
      <p className="text-muted-foreground">{item.clientName}</p>
      <p className="font-bold">£ {item.total}</p>
      <Badge variant={item.status}>{item.status}</Badge>
      <img src={RightArrow} alt="left arrow" />
    </div>
  );
};

export default InvoiceListItem;
