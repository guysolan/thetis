import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { createHmac } from "node:crypto";

// Pre-rendered React Email template (built from packages/email/emails/course/course-access.tsx)
// Run `bun packages/email/emails/course/build-template.ts` to regenerate
import { renderCourseAccessEmail } from "./email-template.ts";

// Shopify product IDs mapped to course types
const PRODUCT_TO_COURSE: Record<string, string> = {
    "9846187786568": "standard", // Standard Course
    "9846188081480": "premium", // Premium Course
};

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

    // Find course products in the order
    const courseItems = order.line_items.filter(
        (item) => PRODUCT_TO_COURSE[String(item.product_id)],
    );

    if (courseItems.length === 0) {
        console.log(`Order ${order.order_number} contains no course products`);
        // Mark as processed even though no courses
        await supabase
            .from("webhook_events")
            .update({ processed: true, processed_at: new Date().toISOString() })
            .eq("event_id", webhookId);

        return new Response(
            JSON.stringify({ message: "No course products in order" }),
            { status: 200, headers: { "Content-Type": "application/json" } },
        );
    }

    const customerEmail = (order.customer?.email || order.email).toLowerCase();
    const enrollmentsCreated: string[] = [];
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

    // Create enrollments for each course product
    for (const item of courseItems) {
        const courseType = PRODUCT_TO_COURSE[String(item.product_id)];

        // Check if enrollment already exists for this order + line item
        const { data: existingEnrollment } = await supabase
            .from("enrollments")
            .select("id")
            .eq("shopify_order_id", String(order.id))
            .eq("shopify_line_item_id", String(item.id))
            .maybeSingle();

        if (existingEnrollment) {
            console.log(
                `Enrollment already exists for order ${order.order_number}, item ${item.id}`,
            );
            continue;
        }

        // Create enrollment and link to user
        const enrollmentData: Record<string, unknown> = {
            course_type: courseType,
            shopify_order_id: String(order.id),
            shopify_order_number: `#${order.order_number}`,
            shopify_customer_email: customerEmail,
            shopify_line_item_id: String(item.id),
            status: "active",
            purchased_at: order.created_at,
        };

        // Link to user if user exists (either created now or already existed)
        if (userExists && userId) {
            enrollmentData.user_id = userId;
            enrollmentData.user_email = customerEmail;
        }

        const { error: enrollError } = await supabase.from("enrollments")
            .insert(enrollmentData);

        if (enrollError) {
            // If error is about user_id or user_email column, try without them
            if (
                (enrollError.message.includes("user_id") ||
                    enrollError.message.includes("user_email")) && userExists
            ) {
                console.log(
                    "Retrying enrollment creation without user linking due to schema issue",
                );
                delete enrollmentData.user_id;
                delete enrollmentData.user_email;
                const { error: retryError } = await supabase.from("enrollments")
                    .insert(enrollmentData);

                if (retryError) {
                    errors.push(`${courseType}: ${retryError.message}`);
                } else {
                    enrollmentsCreated.push(courseType);
                    console.log(
                        `Created enrollment for ${courseType} (user exists but enrollment not linked due to schema issue)`,
                    );
                }
            } else {
                errors.push(`${courseType}: ${enrollError.message}`);
            }
        } else {
            enrollmentsCreated.push(courseType);
            const linkedStatus = (userExists && userId)
                ? ` (linked to user_id: ${userId})`
                : " (will be linked on signup)";
            console.log(
                `Created enrollment for ${courseType}${linkedStatus} - Order #${order.order_number}, Email: ${customerEmail}`,
            );
        }

        if (enrollError) {
            console.error(
                `Failed to create enrollment for ${courseType}:`,
                enrollError,
            );
            errors.push(`${courseType}: ${enrollError.message}`);
        } else {
            enrollmentsCreated.push(courseType);
            console.log(
                `Created enrollment for ${courseType} - Order #${order.order_number}, Email: ${customerEmail}`,
            );
        }
    }

    // Mark webhook as processed
    await supabase
        .from("webhook_events")
        .update({
            processed: true,
            processed_at: new Date().toISOString(),
            error_message: errors.length > 0 ? errors.join("; ") : null,
        })
        .eq("event_id", webhookId);

    // Send course access email if enrollments were created
    if (enrollmentsCreated.length > 0) {
        const COURSE_URL = Deno.env.get("COURSE_URL") ||
            "https://course.thetismedical.com";
        const claimUrl = `${COURSE_URL}/claim?email=${
            encodeURIComponent(customerEmail)
        }&order=${encodeURIComponent(`#${order.order_number}`)}`;

        // Queue email (will be sent by email job)
        // For now, we'll send it directly via Resend if available
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (RESEND_API_KEY) {
            try {
                // Use the React Email template
                const emailHtml = renderCourseAccessEmail({
                    customerEmail,
                    orderNumber: String(order.order_number),
                    courseType: enrollmentsCreated[0] || "standard",
                    claimUrl,
                });

                const emailResponse = await fetch(
                    "https://api.resend.com/emails",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${RESEND_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from: "Thetis Medical <info@thetismedical.com>",
                            to: [customerEmail],
                            subject:
                                "🎉 Your Achilles Recovery Course is Ready!",
                            html: emailHtml,
                        }),
                    },
                );

                if (!emailResponse.ok) {
                    const errorText = await emailResponse.text();
                    console.error("Failed to send email:", errorText);
                } else {
                    console.log(`Course access email sent to ${customerEmail}`);
                }
            } catch (emailError) {
                console.error("Error sending email:", emailError);
                // Don't fail the webhook if email fails
            }
        } else {
            console.log("RESEND_API_KEY not set, skipping email send");
        }
    }

    return new Response(
        JSON.stringify({
            message: "Webhook processed",
            order_number: order.order_number,
            customer_email: customerEmail,
            user_created: userCreated,
            user_exists: userExists,
            enrollments_created: enrollmentsCreated,
            errors: errors.length > 0 ? errors : undefined,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
    );
});
