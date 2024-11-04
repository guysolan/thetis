import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import SelectWarehouse from "../../../warehouses/components/SelectWarehouse";
import OrderItems from "@/features/orders/order-forms/components/OrderItems";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { purchaseFormSchema } from "../schema";
import { useCreateOrder } from "../../api/createOrder";
import dayjs from 'dayjs';
import DatePicker from '../../../../components/DatePicker';

const PurchaseForm = () => {
    const form = useForm<z.infer<typeof purchaseFormSchema>>({
        resolver: zodResolver(purchaseFormSchema),
        defaultValues: {
            order_items: [{
                item_type: "product",
                item_id: "",
                quantity_change: 1,
            }],
            order_date: dayjs().toDate(),

            order_type: "purchase", // Add default order type
        },
    });

    const { mutate: createOrder } = useCreateOrder();

    // Extract form submission logic
    const handleSubmit = async (
        formData: z.infer<typeof purchaseFormSchema>,
    ) => {
        const {
            order_items,
            order_type,
            order_date,
            warehouse_id,
        } = formData;

        const item_changes_with_warehouse = order_items.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: (ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            warehouse_id: warehouse_id,
        }));
        await createOrder({
            in_order_type: order_type,
            in_order_date: order_date.toISOString(),
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

                       <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                <OrderItems showPrice={true} />
                        
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
