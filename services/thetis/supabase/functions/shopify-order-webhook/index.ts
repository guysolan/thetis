import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { createHmac } from "node:crypto";

// Shopify product IDs -> product_slug. Keep splint in sync with SHOPIFY_SPLINT_PRODUCT_ID in apps/website/src/lib/shopify-course-price.ts
const PRODUCT_TO_SLUG: Record<string, string> = {
    "9846187786568": "achilles_rupture_course", // Achilles Rupture / Essentials Course
    "9846188081480": "achilles_rupture_professionals_course", // Achilles / Professionals Course
    "10048943227208": "plantar_fasciitis_course", // Plantar Fasciitis Course
    "8572432253256": "splint", // Achilles Rupture Splint (all sizes/sides)
};

// Fallback when product_id is missing or a test/reused product: REST variant_id (numeric)
const VARIANT_TO_SLUG: Record<string, string> = {
    "52265314353480": "achilles_rupture_course",
    "52265315828040": "achilles_rupture_professionals_course",
    "53062046056776": "plantar_fasciitis_course",
};

function productSlugForLineItem(item: ShopifyLineItem): string | undefined {
    const pid = item.product_id;
    if (pid != null && pid !== 0) {
        const fromProduct = PRODUCT_TO_SLUG[String(pid)];
        if (fromProduct) return fromProduct;
    }
    const vid = item.variant_id;
    if (vid != null && vid !== 0) {
        return VARIANT_TO_SLUG[String(vid)];
    }
    return undefined;
}

const COURSE_SLUGS = [
    "achilles_rupture_course",
    "achilles_rupture_professionals_course",
    "plantar_fasciitis_course",
];

interface CoursePostPurchaseContent {
    course_name: string;
    thank_you_summary: string;
    start_lessons: string;
    start_lesson_reason: string;
    path_summary: string;
    key_principle: string;
    affiliate_course_description: string;
    sms_summary: string;
    sms_start_lessons: string;
    sms_key_principle: string;
}

const ACHILLES_COURSE_CONTENT: CoursePostPurchaseContent = {
    course_name: "Achilles Rupture Recovery Course",
    thank_you_summary:
        "You now have the full week-by-week recovery guide — from emergency care and the first week through the boot phase, physio, and return to sport. Everything in one place, when you need it.",
    start_lessons: "Emergency care and Week 1 checklist",
    start_lesson_reason:
        "they set the foundation for your recovery: toes down 24/7, what's normal vs urgent, and your first follow-up",
    path_summary:
        "emergency care -> early treatment -> boot phase -> transition -> physio -> return to sport",
    key_principle:
        "Keep your foot pointed down (plantarflexion) unless your clinician says otherwise. That keeps the tendon ends together and supports healing.",
    affiliate_course_description: "Achilles recovery course",
    sms_summary: "You now have the full week-by-week recovery guide.",
    sms_start_lessons: "Emergency care and Week 1 checklist",
    sms_key_principle:
        "Keep your foot pointed down (plantarflexion) unless your clinician says otherwise.",
};

const COURSE_POST_PURCHASE_CONTENT: Record<string, CoursePostPurchaseContent> =
    {
        achilles_rupture_course: ACHILLES_COURSE_CONTENT,
        achilles_rupture_professionals_course: ACHILLES_COURSE_CONTENT,
        plantar_fasciitis_course: {
            course_name: "Plantar Fasciitis Course",
            thank_you_summary:
                "You now have the full step-by-step heel pain guide — from understanding plantar fasciitis through Level 1 foundation treatment, further options, and when specialist care is worth discussing.",
            start_lessons:
                "Why Does My Heel Hurt? and The Three-Level Treatment Approach",
            start_lesson_reason:
                "they explain what's happening at the heel, why quick fixes often disappoint, and how to work through the basics consistently",
            path_summary:
                "understanding your heel pain -> Level 1 foundation care -> further treatment options -> surgery decisions if symptoms persist",
            key_principle:
                "Think in months, not days. The basics done consistently usually matter more than chasing a miracle treatment.",
            affiliate_course_description: "plantar fasciitis course",
            sms_summary:
                "You now have the step-by-step heel pain guide, from the basics through further treatment options.",
            sms_start_lessons:
                "Why Does My Heel Hurt? and The Three-Level Treatment Approach",
            sms_key_principle:
                "Think in months, not days. Consistent basics beat chasing quick fixes.",
        },
    };

function contentForCourse(productSlug: string): CoursePostPurchaseContent {
    return COURSE_POST_PURCHASE_CONTENT[productSlug] ?? ACHILLES_COURSE_CONTENT;
}

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
    product_id: number | null;
    variant_id: number | null;
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
        .select("id, processed")
        .eq("event_id", webhookId)
        .maybeSingle();

    if (existingEvent?.processed) {
        console.log(`Webhook ${webhookId} already fully processed, skipping`);
        return new Response(JSON.stringify({ message: "Already processed" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Log the webhook event (first attempt only). Retries after a crash must not
    // bail out just because this row exists with processed = false.
    if (!existingEvent) {
        const { error: logError } = await supabase.from("webhook_events")
            .insert({
                event_id: webhookId,
                event_type: topic,
                source: "shopify",
                payload: order,
                processed: false,
            });

        if (logError) {
            console.error("Failed to log webhook event:", logError);
        }
    }

    // Find all tracked products in the order (courses, splint, future)
    const trackedItems = order.line_items.filter((item) =>
        productSlugForLineItem(item)
    );

    if (trackedItems.length === 0) {
        const productIdsInOrder = order.line_items.map(
            (i) =>
                `product_id=${i.product_id} variant_id=${i.variant_id} (${i.title})`,
        );
        console.log(
            `Order ${order.order_number} contains no tracked products. Line items: ${
                productIdsInOrder.join(", ")
            }. Tracked product_ids: ${
                Object.keys(PRODUCT_TO_SLUG).join(", ")
            }; PF variant fallback: ${
                Object.keys(VARIANT_TO_SLUG).join(", ")
            }.`,
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

    const rawEmail = order.customer?.email || order.email;
    const customerEmail = typeof rawEmail === "string"
        ? rawEmail.trim().toLowerCase()
        : "";
    if (!customerEmail) {
        const msg =
            "Order has no customer or order email; cannot record purchases";
        console.error(`${msg} (order ${order.order_number}, id ${order.id})`);
        await supabase
            .from("webhook_events")
            .update({
                processed: true,
                processed_at: new Date().toISOString(),
                error_message: msg,
            })
            .eq("event_id", webhookId);
        return new Response(JSON.stringify({ message: msg }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
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
        const productSlug = productSlugForLineItem(item)!;

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

    // Trigger Knock post-purchase workflows (course-specific content, plus splint)
    const KNOCK_API_KEY = Deno.env.get("KNOCK_API_KEY");
    if (KNOCK_API_KEY && productsOrdered.length > 0) {
        const courseSlugsOrdered = productsOrdered.filter((s) =>
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

        for (const courseSlug of courseSlugsOrdered) {
            const courseData = contentForCourse(courseSlug);
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
                                    id: `order-${order.id}-${courseSlug}`,
                                    email: customerEmail,
                                },
                            ],
                            cancellation_key: `order-${order.id}-${courseSlug}`,
                            data: {
                                ...triggerData,
                                course_slug: courseSlug,
                                ...courseData,
                            },
                        }),
                    },
                );
                if (!r.ok) {
                    console.error(
                        "Knock course trigger failed:",
                        await r.text(),
                    );
                } else {
                    console.log(
                        `Knock post-purchase-course triggered for ${courseSlug} - order #${order.order_number}`,
                    );
                }
            } catch (e) {
                console.error(
                    `Knock course trigger error for ${courseSlug}:`,
                    e,
                );
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
                if (!r.ok) {
                    console.error(
                        "Knock splint trigger failed:",
                        await r.text(),
                    );
                } else {console.log(
                        `Knock post-purchase-splint triggered for order #${order.order_number}`,
                    );}
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
