import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import deleteIcon from '@/assets/icon-delete.svg';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { Invoice, InvoiceFormProps } from '@/types';
import { FC, useState } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import { invoiceService } from '@/services/invoice.service';

const InvoiceForm: FC<InvoiceFormProps> = ({ action }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Invoice>({
    invoiceDate: '',
    description: '',
    paymentTerms: 0,
    clientName: '',
    clientEmail: '',
    status: 'draft',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    items: [{ name: '', quantity: 0, price: 0 }],
  });
  console.log(formData, 'formData');

  const [items, setItems] = useState([
    { id: uuidv4(), name: '', quantity: 0, price: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { id: uuidv4(), name: '', quantity: 0, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      const formDataItems = updatedItems.map(({ id, ...item }) => item);
      setFormData((prev) => ({
        ...prev,
        items: formDataItems,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id.includes('.')) {
      const [parentKey, childKey] = id.split('.');
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else if (id === 'paymentTerms') {
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
              field === 'quantity' || field === 'price' ? Number(value) : value,
          }
        : item
    );
    setItems(updatedItems);

    const formDataItems = updatedItems.map(({ id, ...item }) => item);
    setFormData((prev) => ({
      ...prev,
      items: formDataItems,
    }));
  };

  console.log(items, 'items');

  const handleDateChange = (selectedDate: Date) => {
    setFormData((prev) => ({
      ...prev,
      invoiceDate: format(selectedDate, 'yyyy-MM-dd'),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await invoiceService.addInvoice(formData);
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  return (
    <Card className="md:w-full border-none bg-background p-0 shadow-none">
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit}>
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
                  className="text-foreground font-bold"
                  id="senderAddress.street"
                  placeholder="19 Union Terrace"
                  onChange={handleInputChange}
                />
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
                    className="text-foreground font-bold"
                    id="senderAddress.city"
                    placeholder="London"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="senderAddress.postCode"
                  >
                    Post Code
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="senderAddress.postCode"
                    placeholder="E1 3EZ"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="senderAddress.country"
                  >
                    Country
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="senderAddress.country"
                    placeholder="United Kingdom"
                    onChange={handleInputChange}
                  />
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
                  className="text-foreground font-bold"
                  id="clientName"
                  placeholder="Alex Grim"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="clientEmail"
                >
                  Client's Email
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="clientEmail"
                  placeholder="alexgrim@mail.com"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="clientAddress.street"
                >
                  Street Address
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="clientAddress.street"
                  placeholder="84 Church Way"
                  onChange={handleInputChange}
                />
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
                    className="text-foreground font-bold"
                    id="clientAddress.city"
                    placeholder="Bradford"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="clientAddress.postCode"
                  >
                    Post Code
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="clientAddress.postCode"
                    placeholder="BD1 9PB"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="clientAddress.country"
                  >
                    Country
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="clientAddress.country"
                    placeholder="United Kingdom"
                    onChange={handleInputChange}
                  />
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
                <DatePicker handleDateChange={handleDateChange} />
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="paymentTerms"
                >
                  Payment Terms
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="paymentTerms"
                  placeholder="Net 30 Days"
                  onChange={handleInputChange}
                />
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
                className="text-foreground font-bold"
                id="description"
                placeholder="Graphic Design"
                onChange={handleInputChange}
              />
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
                        handleItemChange(item.id, 'name', e.target.value)
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
                      onChange={(e) =>
                        handleItemChange(item.id, 'quantity', e.target.value)
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
                      onChange={(e) =>
                        handleItemChange(item.id, 'price', e.target.value)
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
                      value={(item.quantity * item.price).toFixed(2)}
                    />
                  </div>
                  <img
                    className={`col-span-2 pt-4 ${
                      items.length > 1 ? 'opacity-100' : 'opacity-50'
                    }`}
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={addItem}>
              + Add New Item
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {action === 'Edit' ? (
              <>
                <DrawerClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DrawerClose>
                <Button variant="custom">Save Changes</Button>
              </>
            ) : (
              <>
                <DrawerClose asChild>
                  <Button variant="destructive">Discard</Button>
                </DrawerClose>
                <Button variant="secondary">Save As Draft</Button>
                <Button variant="custom">Save & Send</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
