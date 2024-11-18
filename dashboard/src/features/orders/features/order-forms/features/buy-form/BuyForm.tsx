import { BuyFormData, buyFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import BuyFormFields from "./BuyFormFields";
import dayjs from "dayjs";
import { formatCreateOrderArguments } from "../../utils/formatCreateOrderArguments";

const BuyForm = () => {
    const { mutate: createOrder } = useCreateOrder("purchase");
    const defaultValues = {
        order_items: [{
            item_type: "product",
            item_id: "",
            quantity_change: 1,
        }],
        order_date: dayjs().toDate(),
        consumed_items: [],
        produced_items: [],
        order_type: "purchase",
        from_company_id: "",
        from_billing_address_id: "",
        from_shipping_address_id: "",
        currency: "GBP",
        carriage: 0,
    };

    const handleSubmit = async (formData: BuyFormData) => {
        const item_changes = [
            ...formData.consumed_items,
            // Positive order items to record the prices of items
            ...formData.order_items.map((item: any) => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change)),
            })),
            // Negative order items as the produced items need to be created
            ...formData.order_items.map((item: any) => ({
                ...item,
                quantity_change: -1 * Math.abs(Number(item.quantity_change)),
                item_price: 0,
                item_tax: 0,
            })),
            // Produced Items added
            ...formData.produced_items.map((item: any) => ({
                ...item,
                quantity_change: Math.abs(Number(item.quantity_change)),
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

        const processedData = formatCreateOrderArguments(
            orderItems,
            formData,
        );

        createOrder(processedData);
    };

    return (
        <BaseOrderForm
            config={{
                itemsFieldName: "consumed_items",
                addressFieldName: "from_shipping_address_id",
            }}
            schema={buyFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <BuyFormFields />
        </BaseOrderForm>
    );
};

export default BuyForm;
