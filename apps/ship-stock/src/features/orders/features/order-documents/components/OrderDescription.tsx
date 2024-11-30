import React from "react";

const OrderDescription = (
    { orderDate, orderId, currency }: {
        orderDate: string;
        orderId: number;
        currency: string;
    },
) => {
    return (
        <section>
            <p>
                <strong>Date:</strong>{" "}
                {new Date(orderDate).toLocaleDateString()}
            </p>
            <p>
                <strong>Order Number:</strong>{" "}
                #{orderId.toString().padStart(4, "0")}
            </p>
            <p>
                <strong>Currency:</strong> {currency}
            </p>
        </section>
    );
};

export default OrderDescription;
