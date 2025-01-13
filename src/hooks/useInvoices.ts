import { useQuery } from '@tanstack/react-query';
import { invoiceService } from '@/services/invoice.service';
// import { Invoice } from '@/types';

export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: invoiceService.getAllInvoices,
  });
};
