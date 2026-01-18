import { shopify } from "npm:@shopify/shopify-api";

// Load environment variables
const shopName = process.env.SHOPIFY_SHOP_NAME;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shopName || !accessToken) {
    throw new Error("Missing required Shopify environment variables");
}

// Create session
const session = new shopify.Session.CustomSession(shopName, accessToken);

// Initialize GraphQL client
const client = new shopify.clients.Graphql({ session });

export default client;
