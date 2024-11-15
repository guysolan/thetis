import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import AddressSelect from "../../../../stockpiles/components/AddressSelect";
import PriceItems from "@/features/orders/order-forms/components/PriceItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { purchaseFormSchema } from "../schema";
import { useCreateOrder } from "../../../api/createOrder";
import dayjs from "dayjs";
import DatePicker from "../../../../../components/DatePicker";
import CompanyAddressSelect from "../../../../companies/components/CompanyAddressSelect";

const PurchaseForm = () => {
    const form = useForm<z.infer<typeof purchaseFormSchema>>({
        resolver: zodResolver(purchaseFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
                item_price: 0,
                item_tax: 0.2,
            }],
            order_date: dayjs().toDate(),
            order_type: "purchase",
            from_company_id: "",
            from_billing_address_id: "",
            from_shipping_address_id: "",
        },
    });

    const { mutate: createOrder } = useCreateOrder();

    const handleSubmit = async (
        formData: z.infer<typeof purchaseFormSchema>,
    ) => {
        const item_changes = formData.order_items.map((item) => ({
            item_id: item.item_id,
            quantity_change: item.quantity_change,
            item_price: item.item_price ?? 0,
            item_tax: item.item_tax ?? 0.2,
            address_id: formData.from_shipping_address_id,
        }));

        await createOrder({
            in_order_type: formData.order_type,
            in_order_date: formData.order_date.toISOString(),
            in_order_items: item_changes,
            in_from_company_id: formData.from_company_id,
            in_from_billing_address_id: formData.from_billing_address_id,
            in_from_shipping_address_id: formData.from_shipping_address_id,
            in_to_company_id: null,
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

                <Card>
                    <CardHeader>
                        <CardTitle>Buyer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CompanyAddressSelect direction="to" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PriceItems showPrice={true} />
                    </CardContent>
                </Card>

                <Button
                    onClick={() => {
                        console.log(form.formState.errors);
                        console.log(form.getValues());
                    }}
                    type="submit"
                >
                    Create Order
                </Button>
            </form>
        </Form>
    );
};

export default PurchaseForm;
