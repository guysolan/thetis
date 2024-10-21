import { callSellingPartnerAPI } from "./config.ts";

export async function getOrders(
    region: "NA" | "EUR",
    marketplaceIds: string[],
) {
    console.log(`Getting orders for region: ${region}`);
    console.log(`Marketplace IDs:`, marketplaceIds);

    const endpoint = "/orders/v0/orders";
    const params = {
        MarketplaceIds: marketplaceIds.join(","),
        CreatedAfter: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
    };

    return await callSellingPartnerAPI(region, endpoint, "GET", params);
}
