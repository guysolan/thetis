import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getAllInventory } from "../_shared/amazon/inventory.ts";

const SHOPIFY_SHOP_URL = Deno.env.get("SHOPIFY_SHOP_URL");
const SHOPIFY_ACCESS_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN");

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // Get Amazon inventory
        const amazonStock = await getAllInventory();

        // Shopify GraphQL endpoint

        if (!SHOPIFY_SHOP_URL || !SHOPIFY_ACCESS_TOKEN) {
            throw new Error("Missing Shopify configuration");
        }

        // GraphQL mutation to update inventory
        const updateInventoryMutation = `
      mutation inventoryBulkAdjustQuantityAtLocation($inventoryItemAdjustments: [InventoryAdjustItemInput!]!) {
        inventoryBulkAdjustQuantityAtLocation(inventoryItemAdjustments: $inventoryItemAdjustments) {
          inventoryLevels {
            available
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

        // Make the GraphQL request to Shopify
        const response = await fetch(
            `${SHOPIFY_SHOP_URL}/admin/api/2024-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
                },
                body: JSON.stringify({
                    query: updateInventoryMutation,
                    variables: {
                        inventoryItemAdjustments: amazonStock.map((item) => ({
                            inventoryItemId: item.shopifyInventoryItemId,
                            availableDelta: item.quantity,
                        })),
                    },
                }),
            },
        );

        const result = await response.json();

        return new Response(
            JSON.stringify({
                message: "Inventory sync completed",
                amazonStock,
                shopifyResponse: result,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error syncing inventory:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to sync inventory",
                details: error.message,
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
