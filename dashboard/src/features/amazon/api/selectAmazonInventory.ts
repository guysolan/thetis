import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase"; // Adjust the import path as needed

interface stockpileData {
    name: string;
    total: number;
    available: number;
    inbound: number;
}

interface AmazonInventory {
    UsInventory: stockpileData[];
    CaInventory: stockpileData[];
    DeInventory: stockpileData[];
    UkInventory: stockpileData[];
}

export const selectAmazonInventory = async (): Promise<
    AmazonInventory
> => {
    const { data, error } = await supabase.functions.invoke<AmazonInventory>(
        "amazon-inventory",
    );

    if (error) {
        throw new Error(
            `Error fetching seller central inventory: ${error.message}`,
        );
    }

    return data as AmazonInventory;
};

export const selectAmazonInventoryQueryOptions = () => {
    return queryOptions({
        queryKey: ["amazonInventory"] as const,
        queryFn: selectAmazonInventory,
    });
};

export const useAmazonInventory = () =>
    useSuspenseQuery(selectAmazonInventoryQueryOptions());
