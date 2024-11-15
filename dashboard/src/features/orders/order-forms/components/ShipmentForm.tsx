import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import AddressSelect from "@/features/stockpiles/components/AddressSelect";
import PriceItems from "@/features/orders/order-forms/components/PriceItems";
import StockItems from "./StockItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OrderItemChange, shipmentFormSchema } from "../schema";
import { useCreateOrder } from "../../api/createOrder";
import { useShipmentForm } from "../hooks/useShipmentForm";
import LockCard from "../../components/LockCard";
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker';
import CompanyAddressSelect from '../../../companies/components/CompanyAddressSelect';

const ShipmentForm = () => {
    const form = useForm<z.infer<typeof shipmentFormSchema>>({
        resolver: zodResolver(shipmentFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            order_date: dayjs().toDate(),

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
    const handleSubmit = async (formData: z.infer<typeof shipmentFormSchema>) => {
        const {
            from_items,
            from_company_id,
            from_billing_address_id,
            from_shipping_address_id,
            to_company_id,
            to_billing_address_id,
            to_shipping_address_id,
            to_items,
            order_date
        } = formData;

        const from_item_changes_with_address = from_items.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: Number(ic.quantity_change) * -1, // Negative for outgoing items
            item_price: 0,
            item_tax: 0,
            address_id: from_shipping_address_id,
        }));

        const to_item_changes_with_address = to_items.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: Number(ic.quantity_change), // Positive for incoming items
            item_price: 0,
            item_tax: 0,
            address_id: to_shipping_address_id,
        }));

        const item_changes_with_address = [
            ...from_item_changes_with_address,
            ...to_item_changes_with_address,
        ];

        await createOrder({
            in_order_type: "shipment",
            in_from_company_id: from_company_id,
            in_to_company_id: to_company_id,
            in_from_billing_address_id: from_billing_address_id,
            in_from_shipping_address_id: from_shipping_address_id,
            in_to_billing_address_id: to_billing_address_id,
            in_to_shipping_address_id: to_shipping_address_id,
            in_order_date: order_date.toISOString(),
            in_order_items: item_changes_with_address,
        });
    };

    const fromShippingAddressId = useWatch({
        control: form.control,
        name: "from_shipping_address_id",
    });

    const toShippingAddressId = useWatch({
        control: form.control,
        name: "to_shipping_address_id",
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4 px-1 pt-2 pr-4"
            >
                <DatePicker name="order_date" label='Order Date' />

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
                                <PriceItems showPrice={false} />
                            </CardContent>
                        </Card>
                        <LockCard
                            title={<AddressSelect name="from_shipping_address_id" />}
                        >
                            <StockItems
                                address_name="from_shipping_address_id"
                                name="from_items"
                            />
                        </LockCard>
                        {toShippingAddressId && (
                            <LockCard
                                title={
                                    <AddressSelect name="to_shipping_address_id" />
                                }
                            >
                                <StockItems
                                    name="to_items"
                                    address_name="to_shipping_address_id"
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
