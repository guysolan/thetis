import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase"; // Adjust the import path as needed

interface stockpileData {
    name: string;
    asin?: string;
    sellerSku?: string;
    total?: number;
    available: number;
    inbound: number;
    fcTransfer?: number;
}

/** API returns keys "Amazon US", "Amazon CA", "Amazon DE", "Amazon UK" */
export interface AmazonInventory {
    "Amazon US"?: stockpileData[];
    "Amazon CA"?: stockpileData[];
    "Amazon DE"?: stockpileData[];
    "Amazon UK"?: stockpileData[];
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

/** Suspense version - will throw on error and block rendering */
export const useAmazonInventory = () =>
    useSuspenseQuery(selectAmazonInventoryQueryOptions());

/** Non-suspense version - returns undefined data on error, never blocks the page */
export const useAmazonInventoryOptional = () =>
    useQuery({
        ...selectAmazonInventoryQueryOptions(),
        retry: 1,
    });
