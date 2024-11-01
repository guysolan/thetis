import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import SelectWarehouse from "../../warehouses/components/SelectWarehouse";
import OrderItems from "@/features/orders/components/OrderItems";
import ItemsTable from "./ItemsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { shipmentFormSchema } from "../schema";
import { useCreateOrder } from "../api/createOrder";
import { useShipmentForm } from "../hooks/useShipmentForm";
import LockCard from "./LockCard";

const ShipmentForm = () => {
    const form = useForm<z.infer<typeof shipmentFormSchema>>({
        resolver: zodResolver(shipmentFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            to_items: [],
            from_items: [],
            order_type: "shipment", // Add default order type
        },
    });

    useShipmentForm(form.control, form.setValue);

    const fromItems = useWatch({
        control: form.control,
        name: "from_items",
    });

    // Memoize expensive calculations
    const partIsNegative = useMemo(
        () =>
            fromItems.some((part) =>
                part.quantity_after && part.quantity_after < 0
            ),
        [fromItems],
    );

    const { mutate: createOrder } = useCreateOrder();

    // Extract form submission logic
    const handleSubmit = async (
        formData: z.infer<typeof shipmentFormSchema>,
    ) => {
        const {
            from_items,
            from_warehouse_id,
            to_warehouse_id,
            to_items,
        } = formData;
        const from_item_changes_with_warehouse = from_items.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: Number(ic.quantity_change),
            item_price: 0,
            item_tax: 0,
            warehouse_id: from_warehouse_id,
        }));
        const to_item_changes_with_warehouse = to_warehouse_id
            ? to_items.map((ic) => ({
                item_id: ic.item_id,
                quantity_change: Number(ic.quantity_change),
                item_price: 0,
                item_tax: 0,
                warehouse_id: to_warehouse_id,
            }))
            : [];

        const item_changes_with_warehouse = [
            ...from_item_changes_with_warehouse,
            ...to_item_changes_with_warehouse,
        ];

        await createOrder({
            in_order_type: "shipment",
            in_order_items: item_changes_with_warehouse,
        });
    };

    const fromWarehouseId = useWatch({
        control: form.control,
        name: "from_warehouse_id",
    });

    const toWarehouseId = useWatch({
        control: form.control,
        name: "to_warehouse_id",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                <SelectWarehouse
                    name="from_warehouse_id"
                    label="From Warehouse"
                />

                <SelectWarehouse
                    name="to_warehouse_id"
                    label="To Warehouse"
                />

                {fromWarehouseId && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <OrderItems showPrice={false} />
                            </CardContent>
                        </Card>
                        <LockCard
                            title={<SelectWarehouse name="from_warehouse_id" />}
                        >
                            <ItemsTable
                                warehouse_name="from_warehouse_id"
                                name="from_items"
                            />
                        </LockCard>
                        {toWarehouseId && (
                            <LockCard
                                title={
                                    <SelectWarehouse name="to_warehouse_id" />
                                }
                            >
                                <ItemsTable
                                    name="to_items"
                                    warehouse_name="to_warehouse_id"
                                />
                            </LockCard>
                        )}
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

export default ShipmentForm;
