import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import PriceItems from "@/features/orders/order-forms/components/PriceItems";
import StockItems from "./StockItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { buildFormSchema } from "../schema";
import { useCreateOrder } from "../../api/createOrder";
import LockCard from "../../components/LockCard";
import DatePicker from "@/components/DatePicker";
import dayjs from "dayjs";
import CompanyAddressSelect from "@/features/companies/components/CompanyAddressSelect";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";
import { useBuildForm } from '../hooks/useBuildForm';

const BuildForm = () => {
    const { data: stockpileItems } = useSelectItemsByAddress();

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
            produced_items: [],
            order_type: "build",
            from_company_id: "",
            from_billing_address_id: "",
            from_shipping_address_id: "",
        },
    });

    useBuildForm(form.control, form.setValue);

    const fromShippingAddressId = useWatch({
        control: form.control,
        name: "from_shipping_address_id",
    });

    const consumedItems = useWatch({
        control: form.control,
        name: "consumed_items",
    });

    // Memoize expensive calculations
    const partIsNegative = useMemo(
        () =>
            consumedItems?.some((part) => {
                const stockpileItem = stockpileItems?.find(
                    (w) =>
                        String(w.address_id) === String(fromShippingAddressId) &&
                        String(w.item_id) === String(part.item_id)
                );
                const currentQuantity = stockpileItem?.item_quantity ?? 0;
                const quantityAfter = currentQuantity + (part.quantity_change || 0);
                return quantityAfter < 0;
            }),
        [consumedItems, fromShippingAddressId, stockpileItems]
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
            from_company_id,
            from_billing_address_id,
            from_shipping_address_id,
        } = formData;

        const item_changes = [
            ...consumed_items,
            ...produced_items,
            ...order_items.map((item) => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change)),
            })),
            ...order_items.map((item) => ({
                ...item,
                quantity_change: -1 * Math.abs(Number(item.quantity_change)),
                item_price: 0,
                item_tax: 0,
            })),
        ];

        const item_changes_with_warehouse = item_changes.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            address_id: from_shipping_address_id,
        }));

        await createOrder({
            in_order_type: order_type,
            in_order_date: order_date.toISOString(),
            in_order_items: item_changes_with_warehouse,
            in_from_company_id: from_company_id,
            in_to_company_id: null,
            in_from_billing_address_id: from_billing_address_id,
            in_from_shipping_address_id: from_shipping_address_id,
            in_to_billing_address_id: null,
            in_to_shipping_address_id: null,
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                <DatePicker name="order_date" label="Order Date" />

                <CompanyAddressSelect direction="from" />

                {fromShippingAddressId && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Produced Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <StockItems name="produced_items" address_name="from_shipping_address_id" />
                            </CardContent>
                        </Card>
                        <LockCard title="Order Items">
                            <PriceItems showPrice={true} />
                        </LockCard>
                        <LockCard title="Consumed Items">
                            <StockItems name="consumed_items" address_name="from_shipping_address_id" />
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
