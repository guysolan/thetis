import { createFileRoute } from "@tanstack/react-router";

import { OrderForm } from "@/features/orders/components/OrderForm";

const OrdersPage = () => {
    return (
        <>
            <OrderForm />
        </>
    );
};

export const Route = createFileRoute("/_apps/stock/orders/new")({
    component: OrdersPage,
});
