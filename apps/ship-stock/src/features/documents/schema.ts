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
    { id: "showSignature", label: "Signature" },
  ],
};

export const packingListOptions = {
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
    { id: "showSignature", label: "Signature" },
  ],
};

export const documentOptions = {
  commercialInvoice: commercialInvoiceOptions,
  purchaseOrder: purchaseOrderOptions,
  invoice: invoiceOptions,
  packingList: packingListOptions,
  shippingLabel: {},
};

export const documentOptionsSchema = z.object({
  from: z
    .object({
      show: z.boolean().default(true),
      billing: z.boolean().default(true),
      shipping: z.boolean().default(true),
      contact: z.boolean().default(true),
    })
    .default({
      show: true,
      billing: true,
      shipping: true,
      contact: true,
    }),
  to: z
    .object({
      show: z.boolean().default(true),
      billing: z.boolean().default(true),
      shipping: z.boolean().default(true),
      contact: z.boolean().default(true),
    })
    .default({
      show: true,
      billing: true,
      shipping: true,
      contact: true,
    }),
  payment: z.boolean().default(false),
  carriage: z.boolean().default(true),
  total: z.boolean().default(true),
  showSignature: z.boolean().default(true),
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
  showSignature: z.boolean().default(true),
});

export const packingListSchema = documentOptionsSchema.extend({
  showFDA: z.boolean().default(false),
  showExporter: z.boolean().default(false),
  showExchangeRates: z.boolean().default(false),
  showPackages: z.boolean().default(true),
  showShippingItems: z.boolean().default(false),
  showSignature: z.boolean().default(true),
});

export type CommercialInvoiceOptions = z.infer<typeof commercialInvoiceSchema>;

export type DocumentOptions = z.infer<typeof documentOptionsSchema>;
