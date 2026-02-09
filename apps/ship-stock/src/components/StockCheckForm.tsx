import React from "react";
import { BaseOrderForm } from "@/features/orders/components/BaseOrderForm";
import { stockTakeFormSchema } from "@/features/orders/schema";
import { useCreateOrder } from "@/features/orders/api/createOrder";
import StocktakeItems from "@/features/orders/features/stocktake-form/StocktakeItems";
import dayjs from "dayjs";

interface StockCheckFormProps {
    addressId: string;
    onSuccess?: () => void;
}

const StockCheckForm: React.FC<StockCheckFormProps> = ({
    addressId,
    onSuccess,
}) => {
    const { mutate: createOrder } = useCreateOrder("count");

    const defaultValues = {
        order_id: null,
        order_items: [
            {
                item_type: "product",
                item_id: "",
                quantity_before: 0,
                quantity_change: 0,
                quantity_after: 0,
            },
        ],
        order_date: dayjs().toDate(),
        order_type: "count",
        to_shipping_address_id: addressId,
        address_id: addressId, // Set this for the StocktakeItems component
    };

    const handleSubmit = async (formData: any) => {
        console.log("Stock check form data:", formData);

        try {
            await createOrder({
                ...formData,
                order_type: "count",
                to_shipping_address_id: addressId,
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error("Stock check submission failed:", error);
        }
    };

    return (
        <BaseOrderForm
            schema={stockTakeFormSchema}
            // @ts-expect-error
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
        >
            <StocktakeItems
                address_name="address_id"
                defaultIsExpanded={true}
                allowedTypes={["part", "product"]}
                name="order_items"
                inCard={true}
            />
        </BaseOrderForm>
    );
};

export default StockCheckForm;
