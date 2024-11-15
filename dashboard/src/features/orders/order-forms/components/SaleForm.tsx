import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormLabel } from "@/components/ui/form";
import PriceItems from "@/features/orders/order-forms/components/PriceItems";
import StockItems from "./StockItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { saleFormSchema } from "../schema";
import { useCreateOrder } from "../../api/createOrder";
import { useSaleForm } from "../hooks/useSaleForm";
import LockCard from "../../components/LockCard";
import dayjs from "dayjs";
import DatePicker from "../../../../components/DatePicker";
import CompanyAddressSelect from "../../../companies/components/CompanyAddressSelect";

const SaleForm = () => {
    const form = useForm<z.infer<typeof saleFormSchema>>({
        resolver: zodResolver(saleFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            order_date: dayjs().toDate(),
            consumed_items: [],
            order_type: "sale",
            from_company_id: "",
            from_billing_address_id: "",
            from_shipping_address_id: "",
            to_company_id: "",
            to_billing_address_id: "",
            to_shipping_address_id: "",
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
            order_type,
            order_date,
            from_company_id,
            to_company_id,
            from_billing_address_id,
            from_shipping_address_id,
            to_billing_address_id,
            to_shipping_address_id,
        } = formData;

        const item_changes_with_address = order_items.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: -1 * Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            address_id: from_shipping_address_id,
        }));

        await createOrder({
            in_order_type: order_type,
            in_order_date: order_date.toISOString(),
            in_order_items: item_changes_with_address,
            in_from_company_id: from_company_id,
            in_to_company_id: to_company_id,
            in_from_billing_address_id: from_billing_address_id,
            in_from_shipping_address_id: from_shipping_address_id,
            in_to_billing_address_id: to_billing_address_id,
            in_to_shipping_address_id: to_shipping_address_id,
        });
    };

    const fromShippingAddressId = useWatch({
        control: form.control,
        name: "from_shipping_address_id",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                <DatePicker name="order_date" label="Order Date" />

                <Card>
                    <CardHeader>
                        <CardTitle>Seller</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CompanyAddressSelect direction="from" />
                        </CardContent>
                </Card>
                  <Card>
                    <CardHeader>
                        <CardTitle>Buyer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CompanyAddressSelect direction="to" />
                    </CardContent>
                </Card>

                {fromShippingAddressId && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PriceItems showPrice={true} />
                            </CardContent>
                        </Card>
                        <LockCard title="Consumed Items">
                            <StockItems
                                name="consumed_items"
                                address_name="from_shipping_address_id"
                            />
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
