import { OrderItem, stockTakeFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import { useCreateOrder } from "../../../../api/createOrder";
import StocktakeFormFields from "./StocktakeFormFields";
import DatePicker from "@/components/DatePicker";
import dayjs from "dayjs";
import { formatCreateOrderArguments } from "../../utils/formatCreateOrderArguments";

interface Props {
    addressId: number;
    orderItems?: OrderItem[];
}
const StocktakeForm = ({ addressId, orderItems }: Props) => {
    const { mutate: createOrder } = useCreateOrder();
    const defaultValues = {
        order_items: orderItems || [{
            item_type: "product",
            item_id: "",
            quantity_change: 0,
        }],
        order_date: dayjs().toDate(),
        order_type: "stocktake",
        address_id: addressId,
        change_quantity: [],
    };

    const handleSubmit = async (formData: any) => {
        const item_changes = formData.change_quantity.map((item: any) => ({
            item_id: item.item_id,
            quantity_change: Number(item.quantity_change),
            item_price: 0,
            item_tax: 0,
            address_id: formData.address_id,
        }));

        const processedData = formatCreateOrderArguments(
            item_changes,
            formData,
        );

        await createOrder(processedData);
    };

    return (
        <BaseOrderForm
            schema={stockTakeFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <DatePicker name="order_date" label="Order Date" />
            <StocktakeFormFields />
        </BaseOrderForm>
    );
};

export default StocktakeForm;
