import { saleFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import SaleFormFields from "./SaleFormFields";
import dayjs from "dayjs";

const SaleForm = () => {
    const { mutate: createOrder } = useCreateOrder();
    const defaultValues = {
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
        display_items: [],
    };

    const handleSubmit = async (formData: any) => {
        const item_changes_with_address = formData.order_items.map((
            ic: any,
        ) => ({
            item_id: ic.item_id,
            quantity_change: -1 * Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            address_id: formData.from_shipping_address_id,
        }));

        await createOrder({
            in_order_type: formData.order_type,
            in_order_date: formData.order_date.toISOString(),
            in_order_items: item_changes_with_address,
            in_from_company_id: formData.from_company_id,
            in_to_company_id: formData.to_company_id,
            in_from_billing_address_id: formData.from_billing_address_id,
            in_from_shipping_address_id: formData.from_shipping_address_id,
            in_to_billing_address_id: formData.to_billing_address_id,
            in_to_shipping_address_id: formData.to_shipping_address_id,
        });
    };

    return (
        <BaseOrderForm
            schema={saleFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <SaleFormFields />
        </BaseOrderForm>
    );
};

export default SaleForm;
