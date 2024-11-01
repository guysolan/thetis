import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormLabel } from "@/components/ui/form";
import SelectWarehouse from "../../warehouses/components/SelectWarehouse";
import OrderItems from "@/features/orders/components/OrderItems";
import ItemsTable from "./ItemsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { saleFormSchema } from "../schema";
import { useCreateOrder } from "../api/createOrder";
import { useSaleForm } from "../hooks/useSaleForm";
import { Separator } from "../../../components/ui/separator";
import LockCard from './LockCard';

const SaleForm = () => {
    const form = useForm<z.infer<typeof saleFormSchema>>({
        resolver: zodResolver(saleFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            consumed_items: [],
            order_type: "sale", // Add default order type
        },
    });

    useSaleForm(form.control, form.setValue);

    const consumedItems = useWatch({
        control: form.control,
        name: "consumed_items",
    });

    // Memoize expensive calculations
    const partIsNegative = useMemo(
        () =>
            consumedItems.some((part) =>
                part.quantity_after && part.quantity_after < 0
            ),
        [consumedItems],
    );

    const { mutate: createOrder } = useCreateOrder();

    // Extract form submission logic
    const handleSubmit = async (formData: z.infer<typeof saleFormSchema>) => {
        const {
            order_items,
            consumed_items,
            order_type,
            warehouse_id,
        } = formData;
        const item_changes = [...order_items]
        const item_changes_with_warehouse = item_changes.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: -1 * Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            warehouse_id: warehouse_id,
        }));
        await createOrder({
            in_order_type: order_type,
            in_order_items: item_changes_with_warehouse,
        });
    };

    const warehouseId = useWatch({
        control: form.control,
        name: "warehouse_id",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                <SelectWarehouse
                    name="warehouse_id"
                    label="Warehouse"
                />

                {warehouseId && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <OrderItems showPrice={true} />
                            </CardContent>
                        </Card>
                        <LockCard title="Consumed Items">
                            <ItemsTable name="consumed_items" />
                        </LockCard>
                        <Button
                            onClick={() => {
                                console.log(form.formState.errors);
                                console.log(form.getValues());
                            }}
                            disabled={partIsNegative}
                            type="submit"
                        >
                            Create Order
                        </Button>
                    </>
                )}
            </form>
        </Form>
    );
};

export default SaleForm;
