import { FC } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DeletePopUpProps } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDeleteInvoice } from '@/hooks/useInvoices';

const DeletePopUp: FC<DeletePopUpProps> = ({ createdId, id }) => {
  const navigate = useNavigate();
  const deleteInvoiceMutation = useDeleteInvoice();

  const handleDelete = async () => {
    try {
      await deleteInvoiceMutation.mutateAsync(id as string);
      navigate('/invoices');
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-[9px] sm:text-[15px] bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 rounded-[24px] font-bold">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete invoice #${createdId}. This action
        cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteInvoiceMutation.isPending}
          >
            {deleteInvoiceMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopUp;
