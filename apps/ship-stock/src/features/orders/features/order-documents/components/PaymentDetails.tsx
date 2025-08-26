import React from "react";

// Single source of truth for all payment methods
export const PAYMENT_METHODS = {
  "UK - Local": "UK - Local",
  "Global - Swift": "Global - Swift",
  "Canada - Domestic Transfer": "Canada - Domestic Transfer",
  "International - Swift": "International - Swift",
  "European Economic Area Transfer": "European Economic Area Transfer",
  "Non-EEA Transfer": "Non-EEA Transfer",
  "USA - Local Transfer": "USA - Local Transfer",
} as const;

export type PaymentMethodKey = keyof typeof PAYMENT_METHODS;

interface BankAccount {
  currency: string;
  local?: {
    title: string;
    details: BankDetail[];
  };
  international: {
    title: string;
    details: BankDetail[];
  }[];
}

interface BankDetail {
  label: string;
  value: string;
}

const bankAccounts: BankAccount[] = [
  {
    currency: "GBP",
    local: {
      title: "UK - Local",
      details: [
        { label: "Recipient", value: "THETIS MEDICAL LTD" },
        { label: "Account Number", value: "82556598" },
        { label: "Sort Code", value: "04-00-75" },
      ],
    },
    international: [
      {
        title: "Global - Swift",
        details: [
          { label: "Recipient", value: "THETIS MEDICAL LTD" },
          { label: "Beneficiary", value: "THETIS MEDICAL LTD" },
          { label: "IBAN", value: "GB33REVO00996957095509" },
          { label: "BIC", value: "REVOGB21" },
          { label: "Intermediary BIC", value: "CHASGB2L" },
        ],
      },
    ],
  },
  {
    currency: "CAD",
    local: {
      title: "Canada - Domestic Transfer",
      details: [
        { label: "Recipient", value: "THETIS MEDICAL LTD" },
        { label: "Account Number", value: "200110848249" },
        { label: "Institution Number", value: "621" },
        { label: "Transit Number", value: "16001" },
      ],
    },
    international: [
      {
        title: "International - Swift",
        details: [
          { label: "Recipient", value: "THETIS MEDICAL LTD" },
          { label: "Account Number", value: "200110848249" },
          { label: "Swift/BIC", value: "TRWICAW1XXX" },
        ],
      },
    ],
  },
  {
    currency: "EUR",
    international: [
      {
        title: "European Economic Area Transfer",
        details: [
          { label: "Recipient", value: "THETIS MEDICAL LTD" },
          { label: "IBAN", value: "GB33REVO00996957095509" },
          { label: "BIC", value: "REVOGB21" },
        ],
      },
      {
        title: "Non-EEA Transfer",
        details: [
          { label: "Recipient", value: "THETIS MEDICAL LTD" },
          { label: "IBAN", value: "GB33REVO00996957095509" },
          { label: "BIC", value: "REVOGB21" },
          { label: "Intermediary BIC", value: "CHASDEFX" },
        ],
      },
    ],
  },
  {
    currency: "USD",
    local: {
      title: "USA - Local Transfer",
      details: [
        { label: "Recipient", value: "THETIS MEDICAL LTD" },
        { label: "Account Number", value: "218598687013" },
        { label: "ACH Routing Number", value: "101019644" },
        { label: "Wire Routing Number", value: "101019644" },
      ],
    },
    international: [
      {
        title: "Global - Swift",
        details: [
          { label: "Recipient", value: "THETIS MEDICAL LTD" },
          { label: "IBAN", value: "GB33REVO00996957095509" },
          { label: "BIC", value: "REVOGB21" },
          { label: "Intermediary BIC", value: "CHASGB2L" },
        ],
      },
    ],
  },
];

interface PaymentDetailsProps {
  orderId: number;
  currency: string;
  enabledPaymentMethods?: string[]; // Array of payment method titles to show
}

// Helper function to get all available payment method titles for a currency
export const getAvailablePaymentMethods = (
  currency: string,
): PaymentMethodKey[] => {
  const supportedCurrency = ["USD", "GBP", "EUR", "CAD"].includes(currency)
    ? currency
    : "GBP";
  const account = bankAccounts.find((acc) =>
    acc.currency === supportedCurrency
  );

  if (!account) return [];

  const methods: PaymentMethodKey[] = [];
  if (account.local && account.local.title in PAYMENT_METHODS) {
    methods.push(account.local.title as PaymentMethodKey);
  }
  if (account.international) {
    account.international.forEach((intl) => {
      if (intl.title in PAYMENT_METHODS) {
        methods.push(intl.title as PaymentMethodKey);
      }
    });
  }

  return methods;
};

const PaymentDetails = ({
  orderId,
  currency,
  enabledPaymentMethods,
}: PaymentDetailsProps) => {
  const filteredAccounts = bankAccounts.filter((account) => {
    if (
      currency === "USD" || currency === "GBP" || currency === "EUR" ||
      currency === "CAD"
    ) {
      return account.currency === currency;
    }
    return account.currency === "GBP"; // Default to GBP for other currencies
  });

  const getBankAddress = (currency: string) => {
    switch (currency) {
      case "USD":
        return "Lead Bank, 1801 Main Street, 64108, Kansas City, United States";
      case "CAD":
        return "Wise Payments Canada Inc., 99 Bank Street, Suite 1420, Ottawa, ON, K1P 1H4, Canada";
      default:
        return "Revolut Ltd 7 Westferry Circus, E14 4HD, London, United Kingdom";
    }
  };

  const renderBankDetails = (title: string, details: BankDetail[]) => {
    // If enabledPaymentMethods is provided, only show methods that are enabled
    if (enabledPaymentMethods && !enabledPaymentMethods.includes(title)) {
      return null;
    }

    return (
      <div key={title}>
        <h4>{title}</h4>
        {details.map((detail) => (
          <p key={detail.label}>
            {detail.label}: {detail.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <section>
      <h2 className="mb-1 font-medium text-neutral-900 text-lg">
        Payment Information
      </h2>
      <h4>Payment Reference: #{orderId?.toString().padStart(4, "0")}</h4>
      <section>
        {filteredAccounts.map((account) => (
          <section key={account.currency}>
            {account.local &&
              renderBankDetails(account.local.title, account.local.details)}
            {Array.isArray(account.international) &&
              account.international.map((intl) =>
                renderBankDetails(intl.title, intl.details)
              )}
          </section>
        ))}
        <div>
          <h3>Address</h3>
          <p>
            Recipient address: 15 Leopold Street, B12 0UP, Birmingham, United
            Kingdom
          </p>
          <p>Bank Address: {getBankAddress(currency)}</p>
        </div>
      </section>
    </section>
  );
};

export default PaymentDetails;
