import React from "react";

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
        international: [{
            title: "Global - Swift",
            details: [
                { label: "Recipient", value: "THETIS MEDICAL LTD" },
                { label: "Beneficiary", value: "THETIS MEDICAL LTD" },
                { label: "IBAN", value: "GB33REVO00996957095509" },
                { label: "BIC", value: "REVOGB21" },
                { label: "Intermediary BIC", value: "CHASGB2L" },
            ],
        }],
    },
    {
        currency: "CAD",
        international: {
            title: "CAD - Global - Swift",
            details: [
                { label: "Recipient", value: "THETIS MEDICAL LTD" },
                { label: "IBAN", value: "GB33REVO00996957095509" },
                { label: "BIC", value: "REVOGB21" },
                { label: "Intermediary BIC", value: "BARCGB22" },
            ],
        },
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
        international: [{
            title: "Global - Swift",
            details: [
                { label: "Recipient", value: "THETIS MEDICAL LTD" },
                { label: "IBAN", value: "GB33REVO00996957095509" },
                { label: "BIC", value: "REVOGB21" },
                { label: "Intermediary BIC", value: "CHASGB2L" },
            ],
        }],
    },
];

const PaymentDetails = (
    { orderId, currency }: { orderId: number; currency: string },
) => {
    const filteredAccounts = bankAccounts.filter((account) => {
        if (currency === "USD" || currency === "GBP" || currency === "EUR") {
            return account.currency === currency;
        }
        return account.currency === "GBP"; // Default to GBP for other currencies
    });

    const getBankAddress = (currency: string) => {
        switch (currency) {
            case "USD":
                return "Lead Bank, 1801 Main Street, 64108, Kansas City, United States";
            default:
                return "Revolut Ltd 7 Westferry Circus, E14 4HD, London, United Kingdom";
        }
    };

    const renderBankDetails = (title: string, details: BankDetail[]) => (
        <div key={title}>
            <h4>{title}</h4>
            {details.map((detail) => (
                <p key={detail.label}>
                    {detail.label}: {detail.value}
                </p>
            ))}
        </div>
    );

    return (
        <section>
            <h2 className="mb-1 font-medium text-lg text-neutral-900">
                Payment Information
            </h2>
            <h4>
                Payment Reference: #{orderId.toString().padStart(4, "0")}
            </h4>
            <section>
                {filteredAccounts.map((account) => (
                    <section key={account.currency}>
                        {account.local && (
                            <div>
                                {renderBankDetails(
                                    account.local.title,
                                    account.local.details,
                                )}
                            </div>
                        )}
                        {Array.isArray(account.international)
                            ? (
                                account.international.map((intl) => (
                                    renderBankDetails(intl.title, intl.details)
                                ))
                            )
                            : (
                                <div>
                                    {renderBankDetails(
                                        account.international[0].title,
                                        account.international[0].details,
                                    )}
                                </div>
                            )}
                    </section>
                ))}
                <div>
                    <h3>Address</h3>
                    <p>
                        Recipient address: 15 Leopold Street, B12 0UP,
                        Birmingham, United Kingdom
                    </p>
                    <p>
                        Bank Address: {getBankAddress(currency)}
                    </p>
                </div>
            </section>
        </section>
    );
};

export default PaymentDetails;
