// validation.ts
import { Invoice, ValidationErrors } from "@/types";

export const validateInvoiceForm = (
  formData: Invoice
): [boolean, ValidationErrors] => {
  const errors: ValidationErrors = {};

  // Validate sender address
  if (
    !formData.senderAddress.street ||
    !formData.senderAddress.city ||
    !formData.senderAddress.postCode ||
    !formData.senderAddress.country
  ) {
    errors.senderAddress = {
      street: !formData.senderAddress.street ? "Street is required" : undefined,
      city: !formData.senderAddress.city ? "City is required" : undefined,
      postCode: !formData.senderAddress.postCode
        ? "Post Code is required"
        : undefined,
      country: !formData.senderAddress.country
        ? "Country is required"
        : undefined,
    };
  }

  // Validate client address
  if (
    !formData.clientAddress.street ||
    !formData.clientAddress.city ||
    !formData.clientAddress.postCode ||
    !formData.clientAddress.country
  ) {
    errors.clientAddress = {
      street: !formData.clientAddress.street ? "Street is required" : undefined,
      city: !formData.clientAddress.city ? "City is required" : undefined,
      postCode: !formData.clientAddress.postCode
        ? "Post Code is required"
        : undefined,
      country: !formData.clientAddress.country
        ? "Country is required"
        : undefined,
    };
  }

  // Validate client details
  if (!formData.clientName) errors.clientName = "Client name is required";
  if (!formData.clientEmail) {
    errors.clientEmail = "Client email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
    errors.clientEmail = "Invalid email format";
  }

  // Validate invoice details
  if (!formData.invoiceDate) errors.invoiceDate = "Invoice date is required";
  if (!formData.paymentTerms)
    errors.paymentTerms = "Payment terms are required";
  if (!formData.description) errors.description = "Description is required";

  // Validate items
  if (!formData.items.length) {
    errors.items = ["At least one item is required"];
  } else {
    const invalidItems = formData.items.some(
      (item) => !item.name || !item.quantity || !item.price
    );
    if (invalidItems) {
      errors.items = ["All item fields must be filled"];
    }
  }

  return [Object.keys(errors).length === 0, errors];
};

export const validateInvoiceFormForDraft = (
  formData: Invoice
): [boolean, ValidationErrors] => {
  const errors: ValidationErrors = {};

  // Validate client details
  if (!formData.clientEmail) {
    errors.clientEmail = "Client email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
    errors.clientEmail = "Invalid email format";
  }

  return [Object.keys(errors).length === 0, errors];
};
