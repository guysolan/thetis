import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { createHmac } from "node:crypto";

// Shopify product IDs -> product_slug. Keep splint in sync with SHOPIFY_SPLINT_PRODUCT_ID in apps/website/src/lib/shopify-course-price.ts
const PRODUCT_TO_SLUG: Record<string, string> = {
    "9846187786568": "standard_course", // Standard / Essentials Course
    "9846188081480": "premium_course", // Premium / Professionals Course
    "8572432253256": "splint", // Achilles Rupture Splint (all sizes/sides)
};

const COURSE_SLUGS = ["standard_course", "premium_course"];

// Verify Shopify webhook signature
function verifyShopifyWebhook(
    payload: string,
    signature: string,
    secret: string,
): boolean {
    const hmac = createHmac("sha256", secret);
    hmac.update(payload, "utf8");
    const digest = hmac.digest("base64");

    // Trim whitespace from signature (Shopify might include it)
    const trimmedSignature = signature.trim();
    const trimmedDigest = digest.trim();

    // Compare signatures using constant-time comparison
    // In Deno Edge Runtime, we use simple string comparison
    // This is safe for webhook signatures as the secret is not exposed
    if (trimmedSignature.length !== trimmedDigest.length) {
        return false;
    }

    // Constant-time string comparison
    let result = 0;
    for (let i = 0; i < trimmedSignature.length; i++) {
        result |= trimmedSignature.charCodeAt(i) ^ trimmedDigest.charCodeAt(i);
    }
    return result === 0;
}

interface ShopifyLineItem {
    id: number;
    product_id: number;
    variant_id: number;
    title: string;
    quantity: number;
    price: string;
}

interface ShopifyOrder {
    id: number;
    order_number: number;
    email: string;
    customer?: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
    };
    line_items: ShopifyLineItem[];
    financial_status: string;
    created_at: string;
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers":
                    "Content-Type, x-shopify-hmac-sha256, x-shopify-webhook-id, x-shopify-topic, Authorization",
                "Access-Control-Max-Age": "86400",
            },
        });
    }

    // Only accept POST requests
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    const SHOPIFY_WEBHOOK_SECRET = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (
        !SHOPIFY_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY
    ) {
        console.error("Missing required environment variables");
        return new Response("Server configuration error", { status: 500 });
    }

    // Get raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-shopify-hmac-sha256");

    if (!signature) {
        console.error("Missing Shopify signature header");
        return new Response("Unauthorized", { status: 401 });
    }

    // Debug logging
    console.log("Webhook received");
    console.log("Signature header:", signature);
    console.log("Payload preview:", rawBody.substring(0, 100));
    console.log("Payload length:", rawBody.length);
    console.log("Secret available:", !!SHOPIFY_WEBHOOK_SECRET);

    // Verify webhook signature
    const isValid = verifyShopifyWebhook(
        rawBody,
        signature,
        SHOPIFY_WEBHOOK_SECRET,
    );
    console.log("Signature valid:", isValid);

    if (!isValid) {
        // Calculate expected signature for debugging
        const hmac = createHmac("sha256", SHOPIFY_WEBHOOK_SECRET);
        hmac.update(rawBody, "utf8");
        const expectedDigest = hmac.digest("base64");
        console.error("Invalid Shopify webhook signature");
        console.error("Received signature:", signature);
        console.error("Expected signature:", expectedDigest);
        return new Response("Unauthorized", { status: 401 });
    }

    // Parse the order data
    let order: ShopifyOrder;
    try {
        order = JSON.parse(rawBody);
    } catch (e) {
        console.error("Failed to parse webhook payload:", e);
        return new Response("Invalid payload", { status: 400 });
    }

    // Create Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check for idempotency - have we already processed this webhook?
    const webhookId = req.headers.get("x-shopify-webhook-id") ||
        `order-${order.id}`;
    const topic = req.headers.get("x-shopify-topic") || "orders/paid";

    const { data: existingEvent } = await supabase
        .from("webhook_events")
        .select("id")
        .eq("event_id", webhookId)
        .single();

    if (existingEvent) {
        console.log(`Webhook ${webhookId} already processed, skipping`);
        return new Response(JSON.stringify({ message: "Already processed" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Log the webhook event
    const { error: logError } = await supabase.from("webhook_events").insert({
        event_id: webhookId,
        event_type: topic,
        source: "shopify",
        payload: order,
        processed: false,
    });

    if (logError) {
        console.error("Failed to log webhook event:", logError);
    }

    // Find all tracked products in the order (courses, splint, future)
    const trackedItems = order.line_items.filter(
        (item) => PRODUCT_TO_SLUG[String(item.product_id)],
    );

    if (trackedItems.length === 0) {
        const productIdsInOrder = order.line_items.map(
            (i) => `${i.product_id} (${i.title})`,
        );
        console.log(
            `Order ${order.order_number} contains no tracked products. Line item product_ids: ${productIdsInOrder.join(", ")}. To track the splint, set SPLINT_PRODUCT_ID in Supabase secrets to the splint's Shopify product_id (e.g. from Admin → Products → splint → ID in URL).`,
        );
        await supabase
            .from("webhook_events")
            .update({ processed: true, processed_at: new Date().toISOString() })
            .eq("event_id", webhookId);
        return new Response(
            JSON.stringify({ message: "No tracked products in order" }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    }

    const customerEmail = (order.customer?.email || order.email).toLowerCase();
    const purchasesCreated: string[] = [];
    const errors: string[] = [];

    // Ensure user exists using database function (bypasses RLS)
    let userExists = false;
    let userCreated = false;

    const { data: userId, error: userError } = await supabase
        .rpc("ensure_user", {
            p_email: customerEmail,
            p_email_course_enabled: true,
        });

    if (userError) {
        console.error("Failed to ensure user:", userError);
        errors.push(`User creation: ${userError.message}`);
        // Continue anyway - enrollment can still be created
    } else if (userId) {
        // Check if user was just created or already existed
        const { data: userData } = await supabase
            .from("users")
            .select("created_at")
            .eq("id", userId)
            .single();

        // If created within last second, assume it was just created
        if (userData) {
            const createdAt = new Date(userData.created_at);
            const now = new Date();
            const diffSeconds = (now.getTime() - createdAt.getTime()) / 1000;
            userCreated = diffSeconds < 2; // Created within last 2 seconds
        }

        userExists = true;
        console.log(
            `${
                userCreated
                    ? "Created"
                    : "Found existing"
            } user record for ${customerEmail} (id: ${userId})`,
        );
    }

    // Create purchases for each tracked product (courses, splint, future)
    for (const item of trackedItems) {
        const productSlug = PRODUCT_TO_SLUG[String(item.product_id)];

        const { data: existingPurchase } = await supabase
            .from("purchases")
            .select("id")
            .eq("shopify_order_id", String(order.id))
            .eq("shopify_line_item_id", String(item.id))
            .maybeSingle();

        if (existingPurchase) {
            console.log(
                `Purchase already exists for order ${order.order_number}, item ${item.id}`,
            );
            purchasesCreated.push(productSlug);
            continue;
        }

        const purchaseData: Record<string, unknown> = {
            product_slug: productSlug,
            shopify_order_id: String(order.id),
            shopify_order_number: `#${order.order_number}`,
            shopify_customer_email: customerEmail,
            shopify_line_item_id: String(item.id),
            status: "active",
            purchased_at: order.created_at,
        };
        if (userExists && userId) purchaseData.user_id = userId;

        const { error: purchaseError } = await supabase
            .from("purchases")
            .insert(purchaseData);

        if (purchaseError) {
            if (purchaseError.message.includes("user_id") && userExists) {
                delete purchaseData.user_id;
                const { error: retryError } = await supabase
                    .from("purchases")
                    .insert(purchaseData);
                if (retryError) {
                    errors.push(`${productSlug}: ${retryError.message}`);
                } else {
                    purchasesCreated.push(productSlug);
                    console.log(
                        `Created purchase for ${productSlug} - Order #${order.order_number}, Email: ${customerEmail}`,
                    );
                }
            } else {
                errors.push(`${productSlug}: ${purchaseError.message}`);
            }
        } else {
            purchasesCreated.push(productSlug);
            console.log(
                `Created purchase for ${productSlug} - Order #${order.order_number}, Email: ${customerEmail}`,
            );
        }
    }

    // Unique product slugs for this order (for Knock branching)
    const productsOrdered = [...new Set(purchasesCreated)];

    // Mark webhook as processed
    await supabase
        .from("webhook_events")
        .update({
            processed: true,
            processed_at: new Date().toISOString(),
            error_message: errors.length > 0 ? errors.join("; ") : null,
        })
        .eq("event_id", webhookId);

    // Trigger Knock post-purchase workflows (one per product type: course, splint)
    const KNOCK_API_KEY = Deno.env.get("KNOCK_API_KEY");
    if (KNOCK_API_KEY && productsOrdered.length > 0) {
        const hasCourse = productsOrdered.some((s) =>
            COURSE_SLUGS.includes(s)
        );
        const hasSplint = productsOrdered.includes("splint");
        const COURSE_URL = Deno.env.get("COURSE_URL") ||
            "https://course.thetismedical.com";
        const REVIEW_URL = Deno.env.get("REVIEW_URL") ||
            "https://www.thetismedical.com/leave-review";
        const triggerData = {
            order_id: String(order.id),
            order_number: order.order_number,
            customer_email: customerEmail,
            purchased_at: order.created_at,
            course_url: COURSE_URL,
            review_url: REVIEW_URL,
        };

        if (hasCourse) {
            try {
                const r = await fetch(
                    "https://api.knock.app/v1/workflows/post-purchase-course/trigger",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${KNOCK_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            recipients: [
                                {
                                    id: `order-${order.id}-course`,
                                    email: customerEmail,
                                },
                            ],
                            cancellation_key: `order-${order.id}-course`,
                            data: triggerData,
                        }),
                    },
                );
                if (!r.ok) console.error("Knock course trigger failed:", await r.text());
                else console.log(`Knock post-purchase-course triggered for order #${order.order_number}`);
            } catch (e) {
                console.error("Knock course trigger error:", e);
            }
        }
        if (hasSplint) {
            try {
                const r = await fetch(
                    "https://api.knock.app/v1/workflows/post-purchase-splint/trigger",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${KNOCK_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            recipients: [
                                {
                                    id: `order-${order.id}-splint`,
                                    email: customerEmail,
                                },
                            ],
                            cancellation_key: `order-${order.id}-splint`,
                            data: triggerData,
                        }),
                    },
                );
                if (!r.ok) console.error("Knock splint trigger failed:", await r.text());
                else console.log(`Knock post-purchase-splint triggered for order #${order.order_number}`);
            } catch (e) {
                console.error("Knock splint trigger error:", e);
            }
        }
    } else if (productsOrdered.length > 0) {
        console.log("KNOCK_API_KEY not set, skipping post-purchase workflows");
    }

    return new Response(
        JSON.stringify({
            message: "Webhook processed",
            order_number: order.order_number,
            customer_email: customerEmail,
            user_created: userCreated,
            user_exists: userExists,
            purchases_created: purchasesCreated,
            products_ordered: productsOrdered,
            errors: errors.length > 0 ? errors : undefined,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
    );
});
