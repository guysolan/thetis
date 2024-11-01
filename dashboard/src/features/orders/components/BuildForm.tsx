import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import SelectWarehouse from "../../warehouses/components/SelectWarehouse";
import OrderItems from "@/features/orders/components/OrderItems";
import ItemsTable from "./ItemsTable";
import { ItemView } from "../../items/types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { Switch } from "@/components/ui/switch";
import { formSchema } from "../schema";
import { useCreateOrder } from "../api/createOrder";

interface OrderFormProps {
    items: ItemView[];
}

export const OrderForm: React.FC<OrderFormProps> = ({ items }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            consumed_items: [],
            produced_items: [], // Add missing default value
            order_type: "purchase", // Add default order type
        },
    });

    usePurchaseForm(form.control, form.setValue);

    const itemsSummary = useWatch({
        control: form.control,
        name: "consumed_items",
    });

    // Memoize expensive calculations
    const partIsNegative = useMemo(
        () =>
            itemsSummary.some((part) =>
                part.quantity_after && part.quantity_after < 0
            ),
        [itemsSummary],
    );

    const { mutate: createOrder } = useCreateOrder();

    // Extract form submission logic
    const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
        const {
            order_items,
            consumed_items,
            produced_items,
            order_type,
            warehouse_id,
        } = formData;
        const item_changes = [
            ...consumed_items,
            ...produced_items,
            ...order_items,
        ];
        const item_changes_with_warehouse = item_changes.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: order_type === "sale"
                ? -1 * Number(ic.quantity_change)
                : Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            warehouse_id: warehouse_id,
        }));
        await createOrder({
            in_order_type: order_type,
            in_order_items: item_changes_with_warehouse,
        });
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col space-y-4 px-1 pt-2 pr-4"
                >
                    <h2>Order</h2>

                    <SelectWarehouse
                        name="warehouse_id"
                        label="Warehouse"
                    />

                    <Accordion
                        type="multiple"
                        defaultValue={["produced-items", "order-items"]}
                    >
                        <AccordionItem value="produced-items">
                            <AccordionTrigger>
                                Produced Items
                            </AccordionTrigger>
                            <AccordionContent>
                                <ItemsTable name="produced_items" />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="order-items">
                            <AccordionTrigger>Order Items</AccordionTrigger>
                            <AccordionContent>
                                <OrderItems showPrice={true} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="consumed-items">
                            <AccordionTrigger>
                                Consumed Items
                            </AccordionTrigger>
                            <AccordionContent>
                                <ItemsTable name="consumed_items" />
                                {/* <ItemQuantities items={itemsSummary} /> */}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

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
            <hr className="my-4" />
        </>
    );
};
