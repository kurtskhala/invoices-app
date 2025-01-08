import { Badge } from '@/components/ui/badge';
import RightArrow from '@/assets/icon-arrow-right.svg';

const InvoiceListItem = ({ item, onClick }) => {
  const date = new Date(item.paymentDue);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
      <img src={RightArrow} alt="left arrow"/>
    </div>
  );
};

export default InvoiceListItem;
