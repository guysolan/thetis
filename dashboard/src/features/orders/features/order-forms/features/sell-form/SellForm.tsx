import { sellFormSchema } from "./sellFormSchema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import SellFormFields from "./SellFormFields";
import dayjs from "dayjs";
import { formatCreateOrderArguments } from "../../utils/formatCreateOrderArguments";

const SellForm = () => {
    const { mutate: createOrder } = useCreateOrder("sale");
    const defaultValues = {
        order_items: [{
            item_type: "package",
            item_id: "",
            quantity_change: 1,
            package_items: [{
                item_id: "",
                item_type: "product",
                quantity: 1,
                item_price: 0,
                item_tax: 0
            }]
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
        const itemChanges = formData.order_items.flatMap((orderItem: any) => {
            if (orderItem.item_type === "package") {
                return orderItem.package_items.map((packageItem: any) => ({
                    item_id: packageItem.item_id,
                    quantity_change: -1 * Number(orderItem.quantity_change * packageItem.quantity),
                    item_price: packageItem.item_price ?? 0,
                    item_tax: packageItem.item_tax ?? 0,
                    address_id: formData.from_shipping_address_id,
                    package_id: orderItem.item_id
                }));
            }
            return [];
        });

        const processedData = formatCreateOrderArguments(
            itemChanges,
            formData,
        );

        createOrder(processedData);
    };

    return (
        <BaseOrderForm
            schema={sellFormSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            config={{
                itemsFieldName: "consumed_items",
                addressFieldName: "from_shipping_address_id",
            }}
        >
            <SellFormFields />
        </BaseOrderForm>
    );
};

export default SellForm;
