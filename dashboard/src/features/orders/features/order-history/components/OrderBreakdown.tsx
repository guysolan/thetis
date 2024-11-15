import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OrderView } from "../../types";
import FinancialTransactions from "./FinancialTransactions";
import StockMovements from "./StockMovements";

interface OrderBreakdownProps {
    order: OrderView;
}

const OrderBreakdown = ({ order }: OrderBreakdownProps) => {
    return (
        <Tabs defaultValue="financial" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="financial">Financial Transactions</TabsTrigger>
                <TabsTrigger value="stock">Stock Movements</TabsTrigger>
            </TabsList>
            <TabsContent value="financial">
                <FinancialTransactions 
                    orderType={order.order_type}
                    orderItems={order.items}
                />
            </TabsContent>
            <TabsContent value="stock">
                <StockMovements orderItems={order.items} />
            </TabsContent>
        </Tabs>
    );
};

export default OrderBreakdown;
