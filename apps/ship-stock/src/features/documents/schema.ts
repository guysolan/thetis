import { z } from "zod";
import { PAYMENT_METHODS } from "../orders/features/order-documents/components/PaymentDetails";

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
    {
      id: "showFinancials",
      label: "Financials",
      description: "Items and services with pricing, tax, and totals",
    },
    {
      id: "showItemsManifest",
      label: "Items Manifest",
      description: "Item names, SKU, origin, HS codes, and quantities",
    },
    {
      id: "showShippingItems",
      label: "Items with Costing",
      description: "Items manifest with unit prices and line totals",
    },
    {
      id: "showPackages",
      label: "Package Breakdown",
      description: "Physical package details with dimensions and contents",
    },
  ],
};

export const invoiceOptions = {
  ...baseDocumentOptions,
  additional: [
    {
      id: "payment",
      label: "Payment Information",
      description: "Bank account details and payment instructions",
    },
    {
      id: "showItemsManifest",
      label: "Items Manifest",
      description: "Item names, SKU, origin, HS codes, and quantities",
    },
    {
      id: "showShippingItems",
      label: "Items with Costing",
      description: "Items manifest with unit prices and line totals",
    },
    {
      id: "showPackages",
      label: "Package Breakdown",
      description: "Physical package details with dimensions and contents",
    },
  ],
};

export const commercialInvoiceOptions = {
  ...baseDocumentOptions,
  additional: [
    {
      id: "showItemsManifest",
      label: "Items Manifest",
      description: "Item names, SKU, origin, HS codes, and quantities",
    },
    {
      id: "showShippingItems",
      label: "Items with Costing",
      description: "Items manifest with unit prices and line totals",
    },
    {
      id: "showPackages",
      label: "Package Breakdown",
      description: "Physical package details with dimensions and contents",
    },
    {
      id: "payment",
      label: "Payment Information",
      description: "Bank account details and payment instructions",
    },
    {
      id: "showFDA",
      label: "FDA Information",
      description: "FDA registration and compliance details",
    },
    {
      id: "showExporter",
      label: "Exporter Information",
      description: "Exporter declaration and certification",
    },
    {
      id: "showExchangeRates",
      label: "Exchange Rates",
      description: "Currency conversion rates for the transaction",
    },
    {
      id: "showSignature",
      label: "Signature",
      description: "Signature line for document authorization",
    },
  ],
};

export const packingListOptions = {
  ...baseDocumentOptions,
  additional: [
    {
      id: "showItemsManifest",
      label: "Items Manifest",
      description: "Item names, SKU, origin, HS codes, and quantities",
    },
    {
      id: "showShippingItems",
      label: "Items with Costing",
      description: "Items manifest with unit prices and line totals",
    },
    {
      id: "showPackages",
      label: "Package Breakdown",
      description: "Physical package details with dimensions and contents",
    },
    {
      id: "payment",
      label: "Payment Information",
      description: "Bank account details and payment instructions",
    },
    {
      id: "showFDA",
      label: "FDA Information",
      description: "FDA registration and compliance details",
    },
    {
      id: "showExporter",
      label: "Exporter Information",
      description: "Exporter declaration and certification",
    },
    {
      id: "showExchangeRates",
      label: "Exchange Rates",
      description: "Currency conversion rates for the transaction",
    },
    {
      id: "showSignature",
      label: "Signature",
      description: "Signature line for document authorization",
    },
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
  payment: z.object({
    show: z.boolean().default(false),
    paymentMethods: z.object(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map(
          (method) => [method, z.boolean().default(true)],
        ),
      ),
    ).default(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
      ),
    ),
  }).default({
    show: false,
    paymentMethods: Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
    ),
  }),
  showSignature: z.boolean().default(true),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(true),
  showItemsManifest: z.boolean().default(true),
  showExporterDetails: z.boolean().default(false),
  showFDADetails: z.boolean().default(false),
  showExchangeRates: z.boolean().default(false),
});

export const purchaseOrderOptionsSchema = documentOptionsSchema.extend({
  showFinancials: z.boolean().default(true),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(false),
  showItemsManifest: z.boolean().default(true),
  payment: z.object({
    show: z.boolean().default(false),
    paymentMethods: z.object(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map(
          (method) => [method, z.boolean().default(true)],
        ),
      ),
    ).default(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
      ),
    ),
  }).default({
    show: false,
    paymentMethods: Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
    ),
  }),
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
  showItemsManifest: z.boolean().default(true),
  showSignature: z.boolean().default(true),
  paymentMethods: z.object(
    Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map(
        (method) => [method, z.boolean().default(true)],
      ),
    ),
  ).default(
    Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
    ),
  ),
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
  payment: z.object({
    show: z.boolean().default(false),
    paymentMethods: z.object(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map(
          (method) => [method, z.boolean().default(true)],
        ),
      ),
    ).default(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
      ),
    ),
  }).default({
    show: false,
    paymentMethods: Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
    ),
  }),
});

export const invoiceOptionsSchema = documentOptionsSchema.extend({
  payment: z.object({
    show: z.boolean().default(true),
    paymentMethods: z.object(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map(
          (method) => [method, z.boolean().default(true)],
        ),
      ),
    ).default(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
      ),
    ),
  }).default({
    show: true,
    paymentMethods: Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
    ),
  }),
  showPackages: z.boolean().default(false),
  showShippingItems: z.boolean().default(true),
  showItemsManifest: z.boolean().default(true),
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

export const packingListSchema = documentOptionsSchema.extend({
  showExporterDetails: z.boolean().default(false),
  showFDADetails: z.boolean().default(false),
  showExchangeRates: z.boolean().default(false),
  showPackages: z.boolean().default(true),
  showShippingItems: z.boolean().default(false),
  showItemsManifest: z.boolean().default(true),
  showSignature: z.boolean().default(true),
  payment: z.object({
    show: z.boolean().default(false),
    paymentMethods: z.object(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map(
          (method) => [method, z.boolean().default(true)],
        ),
      ),
    ).default(
      Object.fromEntries(
        Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
      ),
    ),
  }).default({
    show: false,
    paymentMethods: Object.fromEntries(
      Object.keys(PAYMENT_METHODS).map((method) => [method, true]),
    ),
  }),
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
