import React from "react";

// Single source of truth for simplified payment methods with URL-safe keys
export const PAYMENT_METHODS = {
  eu_wise: "Euro",
  canada_wise: "Canadian Dollar",
  international: "International (GBP)",
  us: "US Dollar",
  uk: "UK Pound",
} as const;

export type PaymentMethodKey = keyof typeof PAYMENT_METHODS;

// Helper function to get display name from URL-safe key
export const getPaymentMethodDisplayName = (key: PaymentMethodKey): string => {
  return PAYMENT_METHODS[key];
};

// Helper function to get URL-safe key from display name
export const getPaymentMethodKey = (
  displayName: string,
): PaymentMethodKey | null => {
  const entry = Object.entries(PAYMENT_METHODS).find(([_, value]) =>
    value === displayName
  );
  return entry ? entry[0] as PaymentMethodKey : null;
};

type Paragraph = string;

interface Section {
  title: string;
  lines: Paragraph[];
}

const sections: Record<PaymentMethodKey, Section> = {
  eu_wise: {
    title: "Euro",
    lines: [
      "Here are the EUR account details for Thetis Medical Ltd on Wise.",
      "If you're sending money from a bank in SEPA, you can use these details to make a domestic transfer. If you're sending from somewhere else, make an international Swift transfer.",
      "",
      "Name: Thetis Medical Ltd",
      "IBAN: BE55 9677 7079 8944",
      "Swift/BIC: TRWIBEB1XXX",
      "",
      "Bank name and address: Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium",
    ],
  },
  canada_wise: {
    title: "Canadian Dollar",
    lines: [
      "Here are the CAD account details for Thetis Medical Ltd on Wise.",
      "If you're sending money from a bank in Canada, you can use these details to make a domestic transfer. If you're sending from somewhere else, make an international Swift transfer.",
      "",
      "Name: Thetis Medical Ltd",
      "Account number: 200110848249",
      "Institution number: 621",
      "Transit number: 16001",
      "Swift/BIC: TRWICAW1XXX",
      "",
      "Bank name and address: Wise Payments Canada Inc., 99 Bank Street, Suite 1420, Ottawa, ON, K1P 1H4, Canada",
    ],
  },
  international: {
    title: "International (GBP)",
    lines: [
      "Beneficiary: THETIS MEDICAL LTD",
      "IBAN: GB33REVO00996957095509",
      "BIC: REVOGB21",
      "Intermediary BIC: CHASGB2L",
      "Beneficiary address: 15 Leopold Street, B12 0UP, Birmingham, United Kingdom",
      "Bank/Payment institution: Revolut Ltd",
      "Bank/Payment institution address: 7 Westferry Circus, E14 4HD, London, United Kingdom",
    ],
  },
  us: {
    title: "US Dollar",
    lines: [
      "Beneficiary: THETIS MEDICAL LTD",
      "Account number: 253018127559",
      "ACH routing number: 026013356",
      "Wire routing number: 026013356",
      "Beneficiary address: 15 Leopold Street, B12 0UP, Birmingham, United Kingdom",
      "Bank/Payment institution: Metropolitan Commercial Bank",
      "Bank/Payment institution address: 99 Park Ave, 10016, New York, United States",
    ],
  },
  uk: {
    title: "UK Pound",
    lines: [
      "Beneficiary: THETIS MEDICAL LTD",
      "Account number: 82556598",
      "Sort code: 04-00-75",
      "Beneficiary address: 15 Leopold Street, B12 0UP, Birmingham, United Kingdom",
      "Bank/Payment institution: Revolut Ltd",
      "Bank/Payment institution address: 7 Westferry Circus, E14 4HD, London, United Kingdom",
    ],
  },
};

interface PaymentDetailsProps {
  orderId: number;
  currency: string;
  enabledPaymentMethods?: Record<PaymentMethodKey, boolean>; // Object mapping payment method keys to enabled status
}

// Helper: available methods per currency (for toggles visibility)
export const getAvailablePaymentMethods = (
  currency: string,
): PaymentMethodKey[] => {
  const c = (currency || "GBP").toUpperCase();
  const map: Record<string, PaymentMethodKey[]> = {
    CAD: ["canada_wise", "international"],
    USD: ["us", "international"],
    GBP: ["uk", "international"],
    EUR: ["eu_wise", "international"],
  };
  return map[c] ?? ["international", "uk"];
};

const SectionBlock = ({ title, lines }: Section) => (
  <div>
    <h4>{title}</h4>
    {lines.map((line) => <p key={line}>{line}</p>)}
  </div>
);

const PaymentDetails = ({
  orderId,
  currency,
  enabledPaymentMethods,
}: PaymentDetailsProps) => {
  const isEnabled = (k: PaymentMethodKey) =>
    !enabledPaymentMethods || enabledPaymentMethods[k] !== false;

  return (
    <section>
      <h2 className="mb-1 font-medium text-neutral-900 text-lg">
        Payment Information
      </h2>
      <h4>Payment Reference: #{orderId?.toString().padStart(4, "0")}</h4>
      <section>
        {isEnabled("eu_wise") && <SectionBlock {...sections.eu_wise} />}
        {isEnabled("canada_wise") && <SectionBlock {...sections.canada_wise} />}
        {isEnabled("international") && (
          <SectionBlock {...sections.international} />
        )}
        {isEnabled("us") && <SectionBlock {...sections.us} />}
        {isEnabled("uk") && <SectionBlock {...sections.uk} />}
      </section>
    </section>
  );
};

export default PaymentDetails;
