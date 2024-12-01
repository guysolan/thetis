import { z } from "zod";

export const baseDocumentOptions = {
  from: [
    { id: "show", label: "Show From Section" },
    { id: "billing", label: "Billing Address" },
    { id: "shipping", label: "Shipping Address" },
    { id: "contact", label: "Contact Information" },
  ],
  to: [
    { id: "show", label: "Show To Section" },
    { id: "billing", label: "Billing Address" },
    { id: "shipping", label: "Shipping Address" },
    { id: "contact", label: "Contact Information" },
  ],
};

export const purchaseOrderOptions = {
  ...baseDocumentOptions,
  additional: [
    { id: "carriage", label: "Carriage" },
    { id: "total", label: "Total Amount" },
  ],
};

export const invoiceOptions = {
  ...baseDocumentOptions,
  additional: [
    { id: "payment", label: "Payment Information" },
    { id: "carriage", label: "Carriage" },
    { id: "total", label: "Total Amount" },
  ],
};

export const commercialInvoiceOptions = {
  ...baseDocumentOptions,
  additional: [
    { id: "showPackages", label: "Packages" },
    { id: "showShippingItems", label: "Shipping Items" },
    { id: "payment", label: "Payment Information" },
    { id: "carriage", label: "Carriage" },
    { id: "total", label: "Total Amount" },
    { id: "showFDA", label: "FDA Information" },
    { id: "showExporter", label: "Exporter Information" },
    { id: "showExchangeRates", label: "Exchange Rates" },
  ],
};

export const documentOptions = {
  commercialInvoice: commercialInvoiceOptions,
  purchaseOrder: purchaseOrderOptions,
  invoice: invoiceOptions,
};

export const documentOptionsSchema = z.object({
  from: z
    .object({
      show: z.boolean().default(true),
      billing: z.boolean().default(false),
      shipping: z.boolean().default(true),
      contact: z.boolean().default(true),
    })
    .default({
      show: true,
      billing: false,
      shipping: true,
      contact: true,
    }),
  to: z
    .object({
      show: z.boolean().default(true),
      billing: z.boolean().default(false),
      shipping: z.boolean().default(false),
      contact: z.boolean().default(true),
    })
    .default({
      show: true,
      billing: false,
      shipping: false,
      contact: true,
    }),
  payment: z.boolean().default(false),
  carriage: z.boolean().default(true),
  total: z.boolean().default(true),
});

export const purchaseOrderOptionsSchema = documentOptionsSchema.extend({
  carriage: z.boolean().default(false),
});

export const invoiceOptionsSchema = documentOptionsSchema.extend({
  payment: z.boolean().default(true),
});

export const commercialInvoiceSchema = documentOptionsSchema.extend({
  showFDA: z.boolean().default(true),
  showExporter: z.boolean().default(true),
  showExchangeRates: z.boolean().default(true),
  showPackages: z.boolean().default(true),
  showShippingItems: z.boolean().default(true),
});

export type CommercialInvoiceOptions = z.infer<typeof commercialInvoiceSchema>;

export type DocumentOptions = z.infer<typeof documentOptionsSchema>;
