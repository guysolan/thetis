import { saleFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import SaleFormFields from "./SaleFormFields";
import dayjs from "dayjs";
import { formatCreateOrderArguments } from "../../utils/formatCreateOrderArguments";

const SaleForm = () => {
    const { mutate: createOrder } = useCreateOrder("sale");
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
        const itemChanges = formData.order_items.map((
            ic: any,
        ) => ({
            item_id: ic.item_id,
            quantity_change: -1 * Number(ic.quantity_change),
            item_price: ic?.item_price ?? 0,
            item_tax: ic?.item_tax ?? 0,
            address_id: formData.from_shipping_address_id,
        }));

        const processedData = formatCreateOrderArguments(
            itemChanges,
            formData,
        );

        createOrder(processedData);
    };

    return (
        <BaseOrderForm
            schema={saleFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            config={{
                itemsFieldName: "consumed_items",
                addressFieldName: "from_shipping_address_id",
            }}
        >
            <SaleFormFields />
        </BaseOrderForm>
    );
};

export default SaleForm;
