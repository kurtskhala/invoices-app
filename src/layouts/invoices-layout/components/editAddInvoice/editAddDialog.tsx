import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { EditAddDialogProps } from "@/types";
import { FC } from "react";
import InvoiceForm from "../invoiceForm";
import Plus from "@/assets/icon-plus.svg";

const EditAddDialog: FC<EditAddDialogProps> = ({ action, createdId, id }) => {
  console.log(id);
  return (
    <Drawer>
      {action === "Edit" ? (
        <DrawerTrigger className="font-bold rounded-[24px] h-10 px-4 py-2 text-[9px] sm:text-[15px] hover:bg-accent hover:text-accent-foreground">
          {action}
        </DrawerTrigger>
      ) : (
        <DrawerTrigger className=" flex items-center gap-x-4 font-bold rounded-[24px] bg-primary-purple  text-primary-foreground hover:bg-dark-purple w-[150px] px-2 py-2">
          <img
            src={Plus}
            alt="plus"
            className="bg-background p-2 rounded-full"
          />
          <p>New Invoice</p>
        </DrawerTrigger>
      )}

      <DrawerContent className="after:h-auto overflow-y-auto custom-scrollbar">
        <DrawerHeader>
          <DrawerTitle>{`${action} ${
            createdId ? `#${createdId}` : ""
          }`}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
          <InvoiceForm action={action}></InvoiceForm>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default EditAddDialog;
