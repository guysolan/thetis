import { shipmentFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import ShipmentFormFields from "./ShipmentFormFields";
import DatePicker from "../../../../../../components/DatePicker";

const ShipmentForm = () => {
    const { mutate: createOrder } = useCreateOrder();
    const defaultValues = {
        order_items: [{
            item_type: "product",
            item_id: "",
            quantity_change: 1,
            height: 0,
            width: 0,
            depth: 0,
            weight: 0,
        }],
        order_type: "shipment",
        to_items: [],
        from_items: [],
    };

    const handleSubmit = async (formData: any) => {
        const fromItems = formData.from_items.map((item: any) => ({
            ...item,
            item_price: null,
            item_tax: null,
            address_id: formData.from_shipping_address_id,
        }));
        const toItems = formData.to_items.map((item: any) => ({
            ...item,
            item_price: null,
            item_tax: null,
            address_id: formData.to_shipping_address_id,
        }));

        const orderData = {
            in_order_type: "shipment",
            in_order_date: formData.order_date.toISOString(),
            in_from_company_id: formData.from_company_id,
            in_to_company_id: formData.to_company_id,
            in_from_billing_address_id: formData.from_billing_address_id,
            in_from_shipping_address_id: formData.from_shipping_address_id,
            in_to_billing_address_id: formData.to_billing_address_id,
            in_to_shipping_address_id: formData.to_shipping_address_id,
            in_order_items: [...fromItems, ...toItems],
        };
        await createOrder(orderData);
    };

    return (
        <BaseOrderForm
            schema={shipmentFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <DatePicker name="order_date" label="Order Date" />
            <ShipmentFormFields />
        </BaseOrderForm>
    );
};

export default ShipmentForm;
