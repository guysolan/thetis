import React from "react";
import { OrderType } from "../types";

const OrderTitle = (
    { orderType }: { orderType: OrderType },
) => {
    return <h1 className="mb-6 font-bold text-3xl capitalize">{orderType} Order</h1>;
};

export default OrderTitle;
