import { useCreateOrder } from "../../../../api/createOrder";
import { purchaseFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import PurchaseFormFields from "./PurchaseFormFields";
import dayjs from "dayjs";

const PurchaseForm = () => {
    const { mutate: createOrder } = useCreateOrder();

    const defaultValues = {
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
    };

    const handleSubmit = async (formData: any) => {
        const item_changes = formData.order_items.map((item: any) => ({
            item_id: item.item_id,
            quantity_change: item.quantity_change,
            item_price: item.item_price ?? 0,
            item_tax: item.item_tax ?? 0.2,
            address_id: formData.to_shipping_address_id,
        }));

        await createOrder({
            in_order_type: formData.order_type,
            in_order_date: formData.order_date.toISOString(),
            in_order_items: item_changes,
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
            schema={purchaseFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <PurchaseFormFields />
        </BaseOrderForm>
    );
};

export default PurchaseForm;
