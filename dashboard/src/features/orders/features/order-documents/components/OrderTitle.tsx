import React from "react";
import { OrderType } from "../../../types";

const OrderTitle = (
    { title }: { title: string },
) => {
    return (
        <h1>
            {title}
        </h1>
    );
};

export default OrderTitle;
