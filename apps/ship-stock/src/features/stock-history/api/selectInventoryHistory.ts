import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { InventoryHistoryRecord } from "../StockHistoryTable";

const fetchInventoryHistory = async () => {
    const { data, error } = await supabase
        .from("inventory_history_by_address")
        .select("*")
        .order("transaction_date", { ascending: false });

    if (error) {
        throw new Error(`Error fetching inventory history: ${error.message}`);
    }

    return data.map((record) => ({
        ...record,
        order_type: record.order_type as
            | "build"
            | "buy"
            | "sell"
            | "ship"
            | "count",
        items: record.items.map((item) => ({
            ...item,
            address_id: item.address_id || record.address_id,
        })),
    })) as InventoryHistoryRecord[];
};

export const selectInventoryHistoryQueryOptions = () => ({
    queryKey: ["inventoryHistory"] as const,
    queryFn: fetchInventoryHistory,
});

export const useSelectInventoryHistory = () =>
    useSuspenseQuery(selectInventoryHistoryQueryOptions());
