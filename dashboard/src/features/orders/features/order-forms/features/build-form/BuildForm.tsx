import { buildFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import BuildFormFields from "./BuildFormFields";
import DatePicker from "@/components/DatePicker";
import dayjs from "dayjs";

const BuildForm = () => {
    const { mutate: createOrder } = useCreateOrder();
    const defaultValues = {
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
    };

    const handleSubmit = async (formData: any) => {
        const item_changes = [
            ...formData.consumed_items,
            ...formData.produced_items,
            ...formData.order_items.map((item: any) => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change)),
            })),
            ...formData.order_items.map((item: any) => ({
                ...item,
                quantity_change: -1 * Math.abs(Number(item.quantity_change)),
                item_price: 0,
                item_tax: 0,
            })),
        ];

        const orderItems = item_changes.map((ic) => ({
            item_id: ic.item_id,
            quantity_change: Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            address_id: formData.from_shipping_address_id,
            item_type: ic.item_type,
        }));

        await createOrder({
            in_order_type: formData.order_type,
            in_order_date: formData.order_date.toISOString(),
            in_order_items: orderItems,
            in_from_company_id: formData.from_company_id,
            in_from_billing_address_id: formData.from_billing_address_id,
            in_from_shipping_address_id: formData.from_shipping_address_id,
            in_to_company_id: formData.to_company_id,
            in_to_billing_address_id: formData.to_billing_address_id,
            in_to_shipping_address_id: formData.to_shipping_address_id,
        });
    };

    return (
        <BaseOrderForm
            schema={buildFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <BuildFormFields />
        </BaseOrderForm>
    );
};

export default BuildForm;
