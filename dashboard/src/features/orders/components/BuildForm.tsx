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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { buildFormSchema } from "../schema";
import { useCreateOrder } from "../api/createOrder";
import { Lock } from "lucide-react";
import LockCard from "./LockCard";
import DatePicker from '../../../components/DatePicker';
import dayjs from 'dayjs';

const BuildForm = () => {
    const form = useForm<z.infer<typeof buildFormSchema>>({
        resolver: zodResolver(buildFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            order_date: dayjs().toDate(),
            consumed_items: [],
            produced_items: [], // Add missing default value
            order_type: "purchase", // Add default order type
        },
    });

    usePurchaseForm(form.control, form.setValue);

    const warehouseId = useWatch({
        control: form.control,
        name: "warehouse_id",
    });

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
    const handleSubmit = async (formData: z.infer<typeof buildFormSchema>) => {
        const {
            order_items,
            consumed_items,
            produced_items,
            order_type,
            order_date,
            warehouse_id,
        } = formData;
        const item_changes = [
            ...consumed_items,
            ...produced_items,
            // Add order items twice - once positive, once negative
            ...order_items.map(item => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change))
            })),
            ...order_items.map(item => ({
                ...item,
                quantity_change: -1 * Math.abs(Number(item.quantity_change)),
                item_price: 0,
                item_tax: 0
            })),
        ];
        const item_changes_with_warehouse = item_changes.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            warehouse_id: warehouse_id,
        }));
        await createOrder({
            in_order_type: order_type,
            in_order_date: order_date,
            in_order_items: item_changes_with_warehouse,
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                <DatePicker name="order_date" label='Order Date' />

                
                <SelectWarehouse
                    name="warehouse_id"
                    label="Warehouse"
                />


                {warehouseId && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Produced Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ItemsTable name="produced_items" />
                            </CardContent>
                        </Card>
                        <LockCard title="Order Items">
                            <OrderItems showPrice={true} />
                        </LockCard>
                        <LockCard title="Consumed Items">
                            <ItemsTable name="consumed_items" />
                        </LockCard>
                    </>
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
            </form>
        </Form>
    );
};

export default BuildForm;
