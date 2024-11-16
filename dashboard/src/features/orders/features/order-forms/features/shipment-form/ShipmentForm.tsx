import { shipmentFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import ShipmentFormFields from "./ShipmentFormFields";
import DatePicker from "../../../../../../components/DatePicker";
import { formatCreateOrderArguments } from "../../utils/formatCreateOrderArguments";

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
        const orderItems = formData.order_items.map((item: any) => ({
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

        const processedData = formatCreateOrderArguments(
            [...fromItems, ...toItems, ...orderItems],
            formData,
        );

        createOrder(processedData);
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
