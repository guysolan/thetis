import React from "react";
import { OrderType } from "../../../types";

const OrderTitle = (
    { title }: { title: string },
) => {
    return (
        <h1 className="mb-6 font-bold text-3xl capitalize">
            {title}
        </h1>
    );
};

export default OrderTitle;
