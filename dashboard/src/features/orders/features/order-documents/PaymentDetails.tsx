import React from "react";

const PaymentDetails = ({ orderId }: { orderId: number }) => {
    return (
        <div className="mt-8 py-4 border-t text-neutral-700 text-sm">
            <h3 className="mb-1 font-medium text-lg text-neutral-900">
                Payment Information
            </h3>
            <b>
                Payment Reference: #{orderId.toString().padStart(4, "0")}
            </b>
            <p>Beneficiary: THETIS MEDICAL LTD</p>
            <p>IBAN: GB33REVO00996957095509</p>
            <p>BIC: REVOGB21</p>
            <p>Bank / Payment institution: Revolut Ltd</p>
            <p>
                Beneficiary address: 15 Leopold Street, B12 0UP, Birmingham,
                United Kingdom
            </p>
        </div>
    );
};

export default PaymentDetails;
