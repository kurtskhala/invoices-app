import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceFormProps } from "@/types";
import { FC } from "react";

const InvoiceForm: FC<InvoiceFormProps> = ({ action }) => {
  return (
    <Card className="md:w-full border-none bg-background p-0 shadow-none">
      <CardContent>
        <div className="space-y-8">
          {/* Bill From Section */}
          <div className="space-y-4">
            <h3 className="text-md text-primary-purple font-bold">Bill From</h3>
            <div className="grid gap-4">
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="street-address"
                >
                  Street Address
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="street-address"
                  placeholder="19 Union Terrace"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="city"
                  >
                    City
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="city"
                    placeholder="London"
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="post-code"
                  >
                    Post Code
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="post-code"
                    placeholder="E1 3EZ"
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="country"
                  >
                    Country
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="country"
                    placeholder="United Kingdom"
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
                  htmlFor="client-name"
                >
                  Client's Name
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="client-name"
                  placeholder="Alex Grim"
                />
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="client-email"
                >
                  Client's Email
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="client-email"
                  placeholder="alexgrim@mail.com"
                />
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="client-street"
                >
                  Street Address
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="client-street"
                  placeholder="84 Church Way"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="client-city"
                  >
                    City
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="client-city"
                    placeholder="Bradford"
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="client-post-code"
                  >
                    Post Code
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="client-post-code"
                    placeholder="BD1 9PB"
                  />
                </div>
                <div>
                  <Label
                    className="text-sm text-muted-foreground"
                    htmlFor="client-country"
                  >
                    Country
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    id="client-country"
                    placeholder="United Kingdom"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="invoice-date"
                >
                  Invoice Date
                </Label>
                <Input
                  className="text-foreground font-bold"
                  type="date"
                  id="invoice-date"
                />
              </div>
              <div>
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor="payment-terms"
                >
                  Payment Terms
                </Label>
                <Input
                  className="text-foreground font-bold"
                  id="payment-terms"
                  placeholder="Net 30 Days"
                />
              </div>
            </div>
            <div>
              <Label
                className="text-sm text-muted-foreground"
                htmlFor="project-description"
              >
                Project Description
              </Label>
              <Input
                className="text-foreground font-bold"
                id="project-description"
                placeholder="Graphic Design"
              />
            </div>
          </div>

          {/* Item List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Item List</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <Label className="text-sm text-muted-foreground">
                    Item Name
                  </Label>
                  <Input
                    className="text-foreground font-bold"
                    placeholder="Banner Design"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm text-muted-foreground">Qty.</Label>
                  <Input
                    className="text-foreground font-bold"
                    type="number"
                    placeholder="1"
                  />
                </div>
                <div className="col-span-3">
                  <Label className="text-sm text-muted-foreground">Price</Label>
                  <Input
                    className="text-foreground font-bold"
                    type="number"
                    placeholder="156.00"
                  />
                </div>
                <div className="col-span-3">
                  <Label className="text-sm text-muted-foreground">Total</Label>
                  <Input
                    className="text-foreground font-bold"
                    disabled
                    value="156.00"
                  />
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              + Add New Item
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {action === "Edit" ? (
              <>
                <Button variant="destructive">Cancel</Button>
                <Button variant="custom">Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="destructive">Discard</Button>
                <Button variant="secondary">Save As Draft</Button>
                <Button variant="custom">Save & Send</Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
