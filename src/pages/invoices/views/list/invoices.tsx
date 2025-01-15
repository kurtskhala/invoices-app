import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DownArrow from '@/assets/icon-arrow-down.svg';
import Empty from '@/assets/illustration-empty.svg';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Invoice } from '@/types';
import InvoiceListItem from '@/layouts/invoices-layout/components/invoiceListItem';
import EditAddDialog from '@/layouts/invoices-layout/components/editAddInvoice';
import { useInvoices } from '@/hooks/useInvoices';

const Invoices = () => {
  const navigate = useNavigate();

  const { data: invoices = [], isLoading, error } = useInvoices();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleInvoiceClick = (invoice: Invoice) => {
    navigate(`/invoices/${invoice._id}`, {
      state: { invoice },
    });
  };

  const filteredInvoices = useMemo(() => {
    if (statusFilter === '') return invoices;
    return invoices.filter((invoice) => invoice.status === statusFilter);
  }, [statusFilter, invoices]);

  const handleFilter = (status: string) => {
    setStatusFilter(status);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: Failed to load invoices. Please try again later.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center h-sm:gap-y-[64px]  gap-y-[15px] px-4">
      {/* Header */}
      <div className="h-sm:mt-[77px] mt-[20px] lg:w-[780px] md:w-[560px] gap-x-[40px] h-[55px] flex justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Invoices</p>
          <p className="text-muted-foreground opacity-55">
            {invoices.length
              ? `There are ${invoices.length} total invoice(s)`
              : 'No invoices'}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-x-[40px] justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="font-bold flex items-center gap-x-2">
                Filter by status <img src={DownArrow} alt="down-arrow" />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFilter('')}>
                Clear All
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilter('paid')}>
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter('pending')}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter('draft')}>
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditAddDialog action="add"></EditAddDialog>
        </div>
      </div>

      {/* Body */}
      {invoices.length ? (
        <div className="max-h-[60vh] custom-scrollbar overflow-auto lg:w-[780px] md:w-[560px] flex flex-col gap-y-4 mb-5">
          {filteredInvoices.map((item) => (
            <InvoiceListItem
              id={item._id}
              key={item.id}
              onClick={() => handleInvoiceClick(item)}
            />
          ))}
        </div>
      ) : (
        <img src={Empty} alt="empty" />
      )}
    </div>
  );
};

export default Invoices;
