import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import deleteIcon from "@/assets/icon-delete.svg";
import { v4 as uuidv4 } from "uuid";

import { Invoice, InvoiceFormProps } from "@/types";
import { FC, useState, useRef } from "react";
import { DrawerClose } from "@/components/ui/drawer";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { ValidationErrors } from "@/types";
import {
  validateInvoiceForm,
  validateInvoiceFormForDraft,
} from "@/utils/validations";
import { useAddInvoice, useUpdateInvoice } from "@/hooks/useInvoices";

const InvoiceForm: FC<InvoiceFormProps> = ({ action, invoice, id }) => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const initialFormData: Invoice = {
    invoiceDate:
      action === "edit" && invoice
        ? invoice.invoiceDate
        : new Date().toISOString().split("T")[0],
    description: action === "edit" && invoice ? invoice.description : "",
    paymentTerms: action === "edit" && invoice ? invoice.paymentTerms : "",
    clientName: action === "edit" && invoice ? invoice.clientName : "",
    clientEmail: action === "edit" && invoice ? invoice.clientEmail : "",
    status: action === "edit" && invoice ? invoice.status : "draft",
    senderAddress:
      action === "edit" && invoice
        ? invoice.senderAddress
        : { street: "", city: "", postCode: "", country: "" },
    clientAddress:
      action === "edit" && invoice
        ? invoice.clientAddress
        : { street: "", city: "", postCode: "", country: "" },
    items:
      action === "edit" && invoice
        ? invoice.items
        : [{ name: "", quantity: "", price: "" }],
  };

  const addInvoiceMutation = useAddInvoice();
  const editInvoiceMutation = useUpdateInvoice();

  const [formData, setFormData] = useState<Invoice>(initialFormData);

  const [items, setItems] = useState(
    initialFormData.items.map((item) => ({ ...item, id: uuidv4() }))
  );

  const addItem = () => {
    setItems([...items, { id: uuidv4(), name: "", quantity: 0, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const formDataItems = updatedItems.map(({ id, ...item }) => item);
      setFormData((prev) => ({
        ...prev,
        items: formDataItems,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id.includes(".")) {
      const [parentKey, childKey] = id.split(".") as [keyof Invoice, string];
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...(prev[parentKey] as Record<string, unknown>),
          [childKey]: value,
        },
      }));
    } else if (id === "paymentTerms") {
      setFormData((prev) => ({
        ...prev,
        [id]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleItemChange = (
    id: string,
    field: string,
    value: string | number
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]:
              field === "quantity" || field === "price" ? Number(value) : value,
          }
        : item
    );
    setItems(updatedItems);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formDataItems = updatedItems.map(({ id, ...item }) => item);
    setFormData((prev) => ({
      ...prev,
      items: formDataItems,
    }));
  };

  const handleDateChange = (selectedDate: Date) => {
    setFormData((prev) => ({
      ...prev,
      invoiceDate: format(selectedDate, "yyyy-MM-dd"),
    }));
  };

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (
    e: React.FormEvent,
    status: "draft" | "pending"
  ) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      status,
    };
    if (status === "pending") {
      const [isValid, errors] = validateInvoiceForm(updatedFormData);
      if (!isValid) {
        setValidationErrors(errors);
        return;
      }
    } else {
      const [isValid, errors] = validateInvoiceFormForDraft(updatedFormData);
      if (!isValid) {
        setValidationErrors(errors);
        return;
      }
    }
    try {
      if (action === "add") {
        await addInvoiceMutation.mutateAsync(updatedFormData);
      } else if (action === "edit") {
        if (id) {
          delete updatedFormData.clientAddress._id;
          delete updatedFormData.senderAddress._id;
          updatedFormData.items.forEach((item) => {
            delete item._id;
            delete item.total;
          });
          await editInvoiceMutation.mutateAsync({ id, data: updatedFormData });
        } else {
          console.error("Error: Invoice ID is undefined");
        }
      }
      closeRef.current?.click();
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  return (
    <Card className="md:w-full border-none bg-background p-0 shadow-none">
      <CardContent>
        <form className="space-y-8">
          {/* Bill From Section */}
          <div className="space-y-4">
            <h3 className="text-md text-primary-purple font-bold">Bill From</h3>
            <div className="grid gap-4">
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="senderAddress.street"
                >
                  Street Address
                </Label>
                <Input
                  className={`text-foreground font-bold ${
                    validationErrors.senderAddress?.street
                      ? "border-red-500"
                      : ""
                  }`}
                  id="senderAddress.street"
                  placeholder="19 Union Terrace"
                  onChange={handleInputChange}
                  value={formData.senderAddress.street}
                />
                {validationErrors.senderAddress?.street && (
                  <span className="text-red-500 text-sm mt-1">
                    {validationErrors.senderAddress?.street}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="senderAddress.city"
                  >
                    City
                  </Label>
                  <Input
                    className={`text-foreground font-bold ${
                      validationErrors.senderAddress?.city
                        ? "border-red-500"
                        : ""
                    }`}
                    id="senderAddress.city"
                    placeholder="London"
                    onChange={handleInputChange}
                    value={formData.senderAddress.city}
                  />
                  {validationErrors.senderAddress?.city && (
                    <span className="text-red-500 text-sm mt-1">
                      {validationErrors.senderAddress?.city}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="senderAddress.postCode"
                  >
                    Post Code
                  </Label>
                  <Input
                    className={`text-foreground font-bold ${
                      validationErrors.senderAddress?.postCode
                        ? "border-red-500"
                        : ""
                    }`}
                    id="senderAddress.postCode"
                    placeholder="E1 3EZ"
                    onChange={handleInputChange}
                    value={formData.senderAddress.postCode}
                  />
                  {validationErrors.senderAddress?.postCode && (
                    <span className="text-red-500 text-sm mt-1">
                      {validationErrors.senderAddress?.postCode}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="senderAddress.country"
                  >
                    Country
                  </Label>
                  <Input
                    className={`text-foreground font-bold ${
                      validationErrors.senderAddress?.country
                        ? "border-red-500"
                        : ""
                    }`}
                    id="senderAddress.country"
                    placeholder="United Kingdom"
                    onChange={handleInputChange}
                    value={formData.senderAddress.country}
                  />
                  {validationErrors.senderAddress?.country && (
                    <span className="text-red-500 text-sm mt-1">
                      {validationErrors.senderAddress?.country}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="space-y-4">
            <h3 className="text-md text-primary-purple font-bold">Bill To</h3>
            <div className="grid gap-4">
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="clientName"
                >
                  Client's Name
                </Label>
                <Input
                  className={`text-foreground font-bold ${
                    validationErrors.clientName ? "border-red-500" : ""
                  }`}
                  id="clientName"
                  placeholder="Alex Grim"
                  onChange={handleInputChange}
                  value={formData.clientName}
                />
                {validationErrors.clientName && (
                  <span className="text-red-500 text-sm mt-1">
                    {validationErrors.clientName}
                  </span>
                )}
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="clientEmail"
                >
                  Client's Email
                </Label>
                <Input
                  className={`text-foreground font-bold ${
                    validationErrors.clientEmail ? "border-red-500" : ""
                  }`}
                  id="clientEmail"
                  placeholder="alexgrim@mail.com"
                  onChange={handleInputChange}
                  value={formData.clientEmail}
                />
                {validationErrors.clientEmail && (
                  <span className="text-red-500 text-sm mt-1">
                    {validationErrors.clientEmail}
                  </span>
                )}
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="clientAddress.street"
                >
                  Street Address
                </Label>
                <Input
                  className={`text-foreground font-bold ${
                    validationErrors.clientAddress?.street
                      ? "border-red-500"
                      : ""
                  }`}
                  id="clientAddress.street"
                  placeholder="84 Church Way"
                  onChange={handleInputChange}
                  value={formData.clientAddress.street}
                />
                {validationErrors.clientAddress?.street && (
                  <span className="text-red-500 text-sm mt-1">
                    {validationErrors.clientAddress?.street}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="clientAddress.city"
                  >
                    City
                  </Label>
                  <Input
                    className={`text-foreground font-bold ${
                      validationErrors.clientAddress?.city
                        ? "border-red-500"
                        : ""
                    }`}
                    id="clientAddress.city"
                    placeholder="Bradford"
                    onChange={handleInputChange}
                    value={formData.clientAddress.city}
                  />
                  {validationErrors.clientAddress?.city && (
                    <span className="text-red-500 text-sm mt-1">
                      {validationErrors.clientAddress?.city}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="clientAddress.postCode"
                  >
                    Post Code
                  </Label>
                  <Input
                    className={`text-foreground font-bold ${
                      validationErrors.clientAddress?.postCode
                        ? "border-red-500"
                        : ""
                    }`}
                    id="clientAddress.postCode"
                    placeholder="BD1 9PB"
                    onChange={handleInputChange}
                    value={formData.clientAddress.postCode}
                  />
                  {validationErrors.clientAddress?.postCode && (
                    <span className="text-red-500 text-sm mt-1">
                      {validationErrors.clientAddress?.postCode}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="clientAddress.country"
                  >
                    Country
                  </Label>
                  <Input
                    className={`text-foreground font-bold ${
                      validationErrors.clientAddress?.country
                        ? "border-red-500"
                        : ""
                    }`}
                    id="clientAddress.country"
                    placeholder="United Kingdom"
                    onChange={handleInputChange}
                    value={formData.clientAddress.country}
                  />
                  {validationErrors.clientAddress?.country && (
                    <span className="text-red-500 text-sm mt-1">
                      {validationErrors.clientAddress?.country}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label
                  className="text-sm text-muted-foreground pb-1"
                  htmlFor="invoiceDate"
                >
                  Invoice Date
                </Label>
                <DatePicker
                  handleDateChange={handleDateChange}
                  initialDate={formData.invoiceDate}
                  disabled={action === "edit"}
                />
                {validationErrors.invoiceDate && (
                  <span className="text-red-500 text-sm mt-1">
                    {validationErrors.invoiceDate}
                  </span>
                )}
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="paymentTerms"
                >
                  Payment Terms
                </Label>
                <Input
                  className={`text-foreground font-bold ${
                    validationErrors.paymentTerms ? "border-red-500" : ""
                  }`}
                  id="paymentTerms"
                  placeholder="Net 30 Days"
                  onChange={handleInputChange}
                  value={formData.paymentTerms}
                />
                {validationErrors.paymentTerms && (
                  <span className="text-red-500 text-sm mt-1">
                    {validationErrors.paymentTerms}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Label
                className="text-sm text-muted-foreground"
                htmlFor="description"
              >
                Project Description
              </Label>
              <Input
                className={`text-foreground font-bold ${
                  validationErrors.description ? "border-red-500" : ""
                }`}
                id="description"
                placeholder="Graphic Design"
                onChange={handleInputChange}
                value={formData.description}
              />
              {validationErrors.description && (
                <span className="text-red-500 text-sm mt-1">
                  {validationErrors.description}
                </span>
              )}
            </div>
          </div>

          {/* Item List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Item List</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  className="grid grid-cols-12 gap-4 items-center"
                  key={item.id}
                >
                  <div className="col-span-4">
                    <Label className="text-sm text-muted-foreground">
                      Item Name
                    </Label>
                    <Input
                      className="text-foreground font-bold"
                      placeholder="Banner Design"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(item.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-muted-foreground">
                      Qty.
                    </Label>
                    <Input
                      className="text-foreground font-bold"
                      type="number"
                      placeholder="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(item.id, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-muted-foreground">
                      Price
                    </Label>
                    <Input
                      className="text-foreground font-bold"
                      type="number"
                      placeholder="156.00"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(item.id, "price", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm text-muted-foreground">
                      Total
                    </Label>
                    <Input
                      className="text-foreground font-bold"
                      disabled
                      value={(
                        Number(item.quantity) * Number(item.price)
                      ).toFixed(2)}
                    />
                  </div>
                  <img
                    className={`col-span-2 pt-4 ${
                      items.length > 1 ? "opacity-100" : "opacity-50"
                    }`}
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              ))}
              {validationErrors.items && (
                <span className="text-red-500 text-sm mt-1">
                  {validationErrors.items}
                </span>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addItem}
            >
              + add New Item
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {action === "edit" ? (
              <>
                <DrawerClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DrawerClose>
                <Button
                  variant="custom"
                  onClick={(e) => handleSubmit(e, "pending")}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <DrawerClose asChild>
                  <Button variant="destructive">Discard</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={(e) => handleSubmit(e, "draft")}
                  >
                    Save As Draft
                  </Button>
                </DrawerClose>
                <Button
                  type="button"
                  variant="custom"
                  onClick={(e) => handleSubmit(e, "pending")}
                >
                  Save & Send
                </Button>
              </>
            )}
          </div>
        </form>
        <DrawerClose ref={closeRef} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
