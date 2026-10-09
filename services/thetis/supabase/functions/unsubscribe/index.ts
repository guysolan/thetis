import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { verifyUnsubscribeToken } from "../_shared/unsubscribe-token.ts";

/**
 * Public endpoint (verify_jwt = false) behind the website's /unsubscribe page.
 *
 * Withdrawing consent has three parts, because stopping future triggers is not
 * enough on its own: a subscriber part-way through the 70-day sequence already
 * has queued Knock runs.
 *   1. users.email_course_enabled = false  (blocks future triggers)
 *   2. cancel queued Knock workflow runs   (stops the sequence in flight)
 *   3. commercial_subscribed = false in Knock (belt and braces if a workflow
 *      is later marked commercial or triggered from elsewhere)
 */
const KNOCK_API_KEY = Deno.env.get("KNOCK_API_KEY");
const UNSUBSCRIBE_SECRET = Deno.env.get("UNSUBSCRIBE_SECRET");
const SUBSCRIBE_WORKFLOW_KEY = "subscribe";
const POST_PURCHASE_WORKFLOWS = [
    "post-purchase-course",
    "post-purchase-splint",
];

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
};

interface UnsubscribeRequest {
    user_id?: string;
    token?: string;
    email?: string;
    action?: "unsubscribe" | "resubscribe";
}

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
}

async function knockFetch(
    path: string,
    method: string,
    body: unknown,
): Promise<boolean> {
    if (!KNOCK_API_KEY) return false;
    try {
        const response = await fetch(`https://api.knock.app${path}`, {
            method,
            headers: {
                Authorization: `Bearer ${KNOCK_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.error(
                `Knock ${method} ${path} failed:`,
                await response.text(),
            );
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Knock ${method} ${path} error:`, error);
        return false;
    }
}

/**
 * Cancels the subscribe sequence plus any post-purchase sequences. Those use
 * `order-<shopify_order_id>-<product_slug>` as their cancellation key, so the
 * keys have to be rebuilt from the user's purchases.
 */
async function cancelKnockWorkflows(
    supabase: ReturnType<typeof createClient>,
    userId: string,
    email: string,
): Promise<number> {
    if (!KNOCK_API_KEY) {
        console.log("KNOCK_API_KEY not set, skipping workflow cancellation");
        return 0;
    }

    let cancelled = 0;

    if (
        await knockFetch(
            `/v1/workflows/${SUBSCRIBE_WORKFLOW_KEY}/cancel`,
            "POST",
            { cancellation_key: userId },
        )
    ) {
        cancelled += 1;
    }

    const { data: purchases, error } = await supabase
        .from("purchases")
        .select("shopify_order_id, product_slug")
        .eq("shopify_customer_email", email);

    if (error) {
        console.error("Failed to load purchases for cancellation:", error);
        return cancelled;
    }

    for (const purchase of purchases ?? []) {
        const orderId = purchase.shopify_order_id as string | null;
        const productSlug = purchase.product_slug as string | null;
        if (!orderId || !productSlug) continue;
        const cancellationKey = `order-${orderId}-${productSlug}`;
        for (const workflowKey of POST_PURCHASE_WORKFLOWS) {
            if (
                await knockFetch(
                    `/v1/workflows/${workflowKey}/cancel`,
                    "POST",
                    {
                        cancellation_key: cancellationKey,
                    },
                )
            ) {
                cancelled += 1;
            }
        }
    }

    return cancelled;
}

async function setKnockCommercialPreference(
    userId: string,
    subscribed: boolean,
): Promise<void> {
    await knockFetch(`/v1/users/${userId}/preferences/default`, "PUT", {
        __persistence_strategy__: "merge",
        commercial_subscribed: subscribed,
    });
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (req.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
        console.error("Missing Supabase service role configuration");
        return json({ error: "Server not configured" }, 500);
    }

    let payload: UnsubscribeRequest;
    try {
        payload = await req.json();
    } catch {
        return json({ error: "Invalid JSON body" }, 400);
    }

    const { user_id: userId, token, email, action = "unsubscribe" } = payload;
    const hasSignedLink = Boolean(userId && token);

    if (!hasSignedLink && !email) {
        return json({ error: "A signed link or an email is required" }, 400);
    }

    if (hasSignedLink) {
        if (!UNSUBSCRIBE_SECRET) {
            console.error("UNSUBSCRIBE_SECRET not set; cannot verify link");
            return json({ error: "Server not configured" }, 500);
        }
        const valid = await verifyUnsubscribeToken(
            userId!,
            token!,
            UNSUBSCRIBE_SECRET,
        );
        if (!valid) {
            console.warn(`Rejected unsubscribe link for user ${userId}`);
            return json({ error: "This link is not valid" }, 403);
        }
    } else if (action === "resubscribe") {
        // Re-enabling by email alone would let anyone opt a stranger back in
        return json({ error: "A signed link is required to resubscribe" }, 400);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    try {
        if (action === "resubscribe") {
            const { data, error } = await supabase.rpc("resubscribe_user", {
                p_user_id: userId,
            });
            if (error) throw error;
            const row = data?.[0];
            if (!row) {
                return json({ error: "Recipient not found" }, 404);
            }
            await setKnockCommercialPreference(row.user_id, true);
            console.log(`Resubscribed ${row.user_email}`);
            return json({
                success: true,
                action: "resubscribe",
                email: row.user_email,
            });
        }

        const { data, error } = await supabase.rpc("unsubscribe_user", {
            p_user_id: hasSignedLink ? userId : null,
            p_email: hasSignedLink ? null : email,
        });
        if (error) throw error;

        const row = data?.[0];
        if (!row) {
            // Unknown address. Report success so the page cannot be used to
            // probe which emails are on file.
            console.log("Unsubscribe requested for unknown recipient");
            return json({
                success: true,
                action: "unsubscribe",
                email: email ?? null,
                already_unsubscribed: false,
            });
        }

        const cancelled = row.already_unsubscribed
            ? 0
            : await cancelKnockWorkflows(supabase, row.user_id, row.user_email);
        await setKnockCommercialPreference(row.user_id, false);

        console.log(
            `Unsubscribed ${row.user_email} (already opted out: ${row.already_unsubscribed}, cancelled ${cancelled} workflow runs)`,
        );

        return json({
            success: true,
            action: "unsubscribe",
            email: row.user_email,
            already_unsubscribed: row.already_unsubscribed,
            cancelled_workflow_runs: cancelled,
        });
    } catch (error) {
        console.error("Error in unsubscribe function:", error);
        return json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error),
        }, 500);
    }
});
