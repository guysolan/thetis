import React from "react";

const OrderDescription = (
    { orderDate, orderId }: { orderDate: string; orderId: number },
) => {
    return (
        <div className="mb-8">
            <p>
                <strong>Date:</strong>{" "}
                {new Date(orderDate).toLocaleDateString()}
            </p>
            <p>
                <strong>Order Number:</strong>{" "}
                #{orderId.toString().padStart(4, "0")}
            </p>
        </div>
    );
};

export default OrderDescription;
