import { PackageOrderItems, saleFormSchema } from "../../../schema";
import { BaseOrderForm } from "../../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../../api/createOrder";
import SellFormFields from "./SellFormFields";
import dayjs from "dayjs";
import { formatCreateOrderArguments, type FormatOrderItemChanges } from "../../../utils/formatCreateOrderArguments";
import { extractOrderItems, useOrderItems } from '../../../hooks/useOrderItems';
import { OrderItemChange } from '../../../schema';
import { defaultCurrency } from '../../../../../../../constants/currencies';
import { DevTool } from "@hookform/devtools";

const SellForm = () => {
    const { mutate: createOrder } = useCreateOrder("sale");
    const defaultValues = {
        mode: "package" as const,
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
        carriage: 0,
        currency: defaultCurrency,
    };

    const handleSubmit = async (formData: any) => {
        console.log(formData);
        const orderItems = extractOrderItems(formData.order_items, formData.mode, formData.order_type) as PackageOrderItems[];
        console.log(orderItems)
        const itemChanges: FormatOrderItemChanges[] = orderItems.map((i) => ({
            item_id: i.item_id,
            quantity_change: i.quantity_change,
            item_price: i.item_price ?? 0,
            item_tax: i.item_tax ?? 0,
            address_id: formData.from_shipping_address_id
        }));
        console.log(itemChanges)

        const processedData = formatCreateOrderArguments(
            itemChanges,
            formData,
        );

        createOrder(processedData);
    };

    return (
        <BaseOrderForm
            schema={saleFormSchema}
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
