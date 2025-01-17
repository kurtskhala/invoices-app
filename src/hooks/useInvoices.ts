import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Invoice } from '@/types';
import { invoiceService } from '@/services/invoice.service';

// Query keys
export const invoiceKeys = {
  all: ['invoices'] as const,
  details: (id: string) => ['invoice', id] as const,
};

// Hooks
export function useInvoices() {
  return useQuery({
    queryKey: invoiceKeys.all,
    queryFn: () => invoiceService.getAllInvoices(),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: invoiceKeys.details(id),
    queryFn: () => invoiceService.getInvoice(id),
  });
}

export function useAddInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice: Invoice) => invoiceService.addInvoice(invoice),
    onSuccess: (newInvoice) => {
      queryClient.setQueryData(
        invoiceKeys.all,
        (oldInvoices: Invoice[] | undefined) => {
          return oldInvoices ? [...oldInvoices, newInvoice] : [newInvoice];
        }
      );
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });
}

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      invoiceService.updateInvoiceStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.details(id) });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) =>
      invoiceService.updateInvoice(id, data),
    onSuccess: (updatedInvoice, { id }) => {
      queryClient.setQueryData(invoiceKeys.details(id), updatedInvoice);
      queryClient.setQueryData(
        invoiceKeys.all,
        (oldInvoices: Invoice[] | undefined) => {
          return oldInvoices
            ? oldInvoices.map((invoice) =>
                invoice.id === id ? updatedInvoice : invoice
              )
            : [updatedInvoice];
        }
      );
      queryClient.invalidateQueries({ queryKey: invoiceKeys.details(id) });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceService.deleteInvoice(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        invoiceKeys.all,
        (oldInvoices: Invoice[] | undefined) => {
          return oldInvoices
            ? oldInvoices.filter((invoice) => invoice.id !== id)
            : [];
        }
      );
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });
}
