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
    { id: "showPackages", label: "Packages" },
    { id: "showShippingItems", label: "Shipping Items" },
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
  shippingDetails: z.object({
    show: z.boolean().default(true),
    reasonForExport: z.boolean().default(true),
    modeOfTransport: z.boolean().default(true),
    incoterms: z.boolean().default(true),
    unitOfMeasurement: z.boolean().default(true),
    shipmentNumber: z.boolean().default(true),
    airwaybill: z.boolean().default(true),
    referenceNumber: z.boolean().default(true),
  }),
  from: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }),
  to: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }),
  payment: z.boolean().default(false),
  total: z.boolean().default(true),
  showSignature: z.boolean().default(true),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(true),
  showServicesTable: z.boolean().default(true),
  showExporterDetails: z.boolean().default(false),
  showFDADetails: z.boolean().default(false),
  showExchangeRates: z.boolean().default(false),
});

export const purchaseOrderOptionsSchema = documentOptionsSchema.extend({
  carriage: z.boolean().default(false),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(true),
  showServicesTable: z.boolean().default(true),
  shippingDetails: z.object({
    show: z.boolean().default(true),
    reasonForExport: z.boolean().default(true),
    modeOfTransport: z.boolean().default(true),
    incoterms: z.boolean().default(true),
    unitOfMeasurement: z.boolean().default(true),
    shipmentNumber: z.boolean().default(true),
    airwaybill: z.boolean().default(true),
    referenceNumber: z.boolean().default(true),
  }).default({
    show: true,
    reasonForExport: true,
    modeOfTransport: true,
    incoterms: true,
    unitOfMeasurement: true,
    shipmentNumber: true,
    airwaybill: true,
    referenceNumber: true,
  }),
  from: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }).default({
    show: true,
    billing: true,
    shipping: true,
    contact: true,
  }),
  to: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }).default({
    show: true,
    billing: true,
    shipping: true,
    contact: true,
  }),
});

export const commercialInvoiceSchema = documentOptionsSchema.extend({
  showExporterDetails: z.boolean().default(true),
  showFDADetails: z.boolean().default(true),
  showExchangeRates: z.boolean().default(true),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(true),
  showSignature: z.boolean().default(true),
  shippingDetails: z.object({
    show: z.boolean().default(true),
    reasonForExport: z.boolean().default(true),
    modeOfTransport: z.boolean().default(true),
    incoterms: z.boolean().default(true),
    unitOfMeasurement: z.boolean().default(true),
    shipmentNumber: z.boolean().default(true),
    airwaybill: z.boolean().default(true),
    referenceNumber: z.boolean().default(true),
  }).default({
    show: true,
    reasonForExport: true,
    modeOfTransport: true,
    incoterms: true,
    unitOfMeasurement: true,
    shipmentNumber: true,
    airwaybill: true,
    referenceNumber: true,
  }),
  from: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }).default({
    show: true,
    billing: true,
    shipping: true,
    contact: true,
  }),
  to: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }).default({
    show: true,
    billing: true,
    shipping: true,
    contact: true,
  }),
  payment: z.boolean().default(false),
});

export const invoiceOptionsSchema = documentOptionsSchema.extend({
  payment: z.boolean().default(true),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(true),
  showExporterDetails: z.boolean().default(false),
  showFDADetails: z.boolean().default(false),
  showExchangeRates: z.boolean().default(false),
  shippingDetails: z.object({
    show: z.boolean().default(true),
    reasonForExport: z.boolean().default(true),
    modeOfTransport: z.boolean().default(true),
    incoterms: z.boolean().default(true),
    unitOfMeasurement: z.boolean().default(true),
    shipmentNumber: z.boolean().default(true),
    airwaybill: z.boolean().default(true),
    referenceNumber: z.boolean().default(true),
  }).default({
    show: true,
    reasonForExport: true,
    modeOfTransport: true,
    incoterms: true,
    unitOfMeasurement: true,
    shipmentNumber: true,
    airwaybill: true,
    referenceNumber: true,
  }),
});

export const packingListSchema = documentOptionsSchema.extend({
  showExporterDetails: z.boolean().default(false),
  showFDADetails: z.boolean().default(false),
  showExchangeRates: z.boolean().default(false),
  showPackages: z.boolean().default(true),
  showShippingItems: z.boolean().default(false),
  showSignature: z.boolean().default(true),
  shippingDetails: z.object({
    show: z.boolean().default(true),
    reasonForExport: z.boolean().default(true),
    modeOfTransport: z.boolean().default(true),
    incoterms: z.boolean().default(true),
    unitOfMeasurement: z.boolean().default(true),
    shipmentNumber: z.boolean().default(true),
    airwaybill: z.boolean().default(true),
    referenceNumber: z.boolean().default(true),
  }).default({
    show: true,
    reasonForExport: true,
    modeOfTransport: true,
    incoterms: true,
    unitOfMeasurement: true,
    shipmentNumber: true,
    airwaybill: true,
    referenceNumber: true,
  }),
  from: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }).default({
    show: true,
    billing: true,
    shipping: true,
    contact: true,
  }),
  to: z.object({
    show: z.boolean().default(true),
    billing: z.boolean().default(true),
    shipping: z.boolean().default(true),
    contact: z.boolean().default(true),
  }).default({
    show: true,
    billing: true,
    shipping: true,
    contact: true,
  }),
});

export type CommercialInvoiceOptions = z.infer<typeof commercialInvoiceSchema>;

export type DocumentOptions = z.infer<typeof documentOptionsSchema>;

export type PurchaseOrderOptions = z.infer<typeof purchaseOrderOptionsSchema>;
export type InvoiceOptions = z.infer<typeof invoiceOptionsSchema>;
export type PackingListOptions = z.infer<typeof packingListSchema>;
