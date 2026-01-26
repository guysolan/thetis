import { OrderItem, stockTakeFormSchema } from "../../schema";
import { BaseOrderForm } from "../../components/BaseOrderForm";
import StocktakeFormFields from "./StocktakeFormFields";
import dayjs from "dayjs";
import { formatCreateOrderArguments } from "../../utils/formatCreateOrderArguments";
import StocktakeItems from "./StocktakeItems";
import { useCreateStocktakeOrder } from "../../api/createStocktakeOrder";

interface Props {
  addressId?: string;
  orderItems?: OrderItem[];
  isInline?: boolean;
  onSuccess?: () => void;
}
const StocktakeForm = ({
  addressId,
  orderItems,
  isInline,
  onSuccess,
}: Props) => {
  const { mutate: createOrder } = useCreateStocktakeOrder();
  const defaultValues = {
    order_id: null,
    order_items: orderItems || [
      {
        item_type: "product",
        item_id: "",
        quantity_before: 0,
        quantity_change: 0,
        quantity_after: 0,
      },
    ],
    order_date: dayjs().toDate(),
    order_type: "stocktake",
    to_shipping_address_id: addressId,
  };

  const handleSubmit = async (formData: any) => {
    console.log(formData);
    const item_changes = formData.order_items.map((item: any) => ({
      item_id: item.item_id,
      quantity_change: Number(item.quantity_change),
      item_price: 0,
      item_tax: 0,
      address_id: formData.to_shipping_address_id,
    }));

    const processedData = formatCreateOrderArguments(item_changes, formData);

    await createOrder(processedData, { onSuccess: onSuccess });
  };

  return (
    <BaseOrderForm
      schema={stockTakeFormSchema}
      // @ts-expect-error
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    >
      {isInline
        ? (
          <StocktakeItems
            address_name="address_id"
            defaultIsExpanded={true}
            allowedTypes={["part", "product"]}
            name="order_items"
            inCard={true}
          />
        )
        : <StocktakeFormFields />}
    </BaseOrderForm>
  );
};

export default StocktakeForm;
