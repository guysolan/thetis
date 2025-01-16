// Example usage
import { callSellingPartnerAPI } from "./config.ts";

import { type CountryCode, marketplaces } from "./marketplace-ids.ts";

export async function getFbaInventoryByCountryCode(countryCode: CountryCode) {
    const marketplace = marketplaces.find((m) => m.country === countryCode);

    if (!marketplace) {
        throw new Error(
            `Marketplace not found for country code: ${countryCode}`,
        );
    }

    const endpoint = "/fba/inventory/v1/summaries";
    const params: Record<string, string> = {
        details: "true",
        granularityType: "Marketplace",
        granularityId: marketplace.id,
        marketplaceIds: marketplace.id,
    };

    const inventory = await callSellingPartnerAPI(
        marketplace.region as "NA" | "EUR",
        endpoint,
        "GET",
        params,
    );

    return inventory;
}

const processInventory = (inventory: any) =>
    inventory?.payload?.inventorySummaries?.map((item: any) => {
        const {
            fulfillableQuantity,
            inboundWorkingQuantity,
            inboundShippedQuantity,
            inboundReceivingQuantity,
        } = item.inventoryDetails;

        return {
            name: item.productName,
            asin: item.asin,
            sellerSku: item.sellerSku,
            fnsku: item.fnsku,
            total: fulfillableQuantity + inboundReceivingQuantity +
                inboundShippedQuantity + inboundWorkingQuantity,
            available: fulfillableQuantity,
            inbound: inboundReceivingQuantity + inboundShippedQuantity +
                inboundWorkingQuantity,
        };
    });

export const getAllInventory = async () => {
    const US = await getFbaInventoryByCountryCode("US");
    const CA = await getFbaInventoryByCountryCode("CA");
    const DE = await getFbaInventoryByCountryCode("DE");
    const UK = await getFbaInventoryByCountryCode("UK");

    const UsInventory = processInventory(US);
    const CaInventory = processInventory(CA);
    const DeInventory = processInventory(DE);
    const UkInventory = processInventory(UK);

    return {
        "Amazon US": UsInventory,
        "Amazon CA": CaInventory,
        "Amazon DE": DeInventory,
        "Amazon UK": UkInventory,
    };
};
