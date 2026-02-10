import { useQuery } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";
import { getItemQuantityAtTime } from "@/features/stock-history/utils";
import { selectInventoryHistoryQueryOptions } from "@/features/stock-history/api/selectInventoryHistory";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";
import dayjs from "dayjs";

export type UseStockQuantitiesOptions = {
    /** When set, "before" uses stock at this date (day before) so it matches stock history at order date */
    orderDate?: string | Date | null;
};

export const useStockQuantities = (
    name: string,
    address_name: string,
    options: UseStockQuantitiesOptions = {},
) => {
    const { orderDate } = options;
    const { control } = useFormContext();
    const { data: stockpileItems } = useSelectItemsByAddress();
    const { data: inventoryHistory } = useQuery(
        selectInventoryHistoryQueryOptions(),
    );

    const selectedAddress = useWatch({
        control,
        name: address_name,
    });

    const itemChanges = useWatch({
        control,
        name,
    });

    const getItemQuantities = (itemId: string) => {
        const quantityChange =
            itemChanges?.find((i) => String(i.item_id) === String(itemId))
                ?.quantity_change ?? 0;

        if (!selectedAddress) {
            return { before: 0, change: quantityChange, after: quantityChange };
        }

        const addressIdNum = Number(selectedAddress);
        let before: number;

        if (
            orderDate &&
            inventoryHistory &&
            inventoryHistory.length > 0
        ) {
            const dateBeforeOrder = dayjs(orderDate)
                .subtract(1, "day")
                .format("YYYY-MM-DD");
            before = getItemQuantityAtTime(
                Number(itemId),
                inventoryHistory,
                dateBeforeOrder,
                addressIdNum,
            );
        } else if (stockpileItems) {
            const stockpileItem = stockpileItems.find(
                (w) =>
                    String(w.address_id) === String(selectedAddress) &&
                    String(w.item_id) === String(itemId),
            );
            before = Number(stockpileItem?.item_quantity ?? 0);
        } else {
            before = 0;
        }

        return {
            before,
            change: Number(quantityChange),
            after: before + Number(quantityChange),
        };
    };

    return {
        getItemQuantities,
        selectedAddress,
        stockpileItems,
    };
};
