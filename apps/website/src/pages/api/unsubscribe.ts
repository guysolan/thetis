import type { APIRoute } from "astro";
import { requestUnsubscribe } from "../../lib/unsubscribe";

export const prerender = false;

/**
 * One-click unsubscribe target for the RFC 8058 `List-Unsubscribe` header.
 *
 * Mail clients POST here directly with no user interaction, so it must never
 * require a rendered page. Human-facing opt-outs go through /unsubscribe.
 *
 * Knock adds these headers itself for workflows marked commercial; this route
 * covers emails sent outside Knock and lets us set the header explicitly.
 */
export const POST: APIRoute = async ({ request, url }) => {
    let userId = url.searchParams.get("u");
    let token = url.searchParams.get("t");

    const contentType = request.headers.get("content-type") ?? "";
    if (
        contentType.includes("application/x-www-form-urlencoded") ||
        contentType.includes("multipart/form-data")
    ) {
        const form = await request.formData().catch(() => null);
        if (form) {
            userId = (form.get("u") as string | null) || userId;
            token = (form.get("t") as string | null) || token;
        }
    } else if (contentType.includes("application/json")) {
        const body = await request.json().catch(() => null);
        if (body) {
            userId = body.u ?? body.user_id ?? userId;
            token = body.t ?? body.token ?? token;
        }
    }

    if (!userId || !token) {
        return new Response(
            JSON.stringify({ error: "Missing unsubscribe link parameters" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    const result = await requestUnsubscribe({ userId, token });

    return new Response(
        JSON.stringify(
            result.ok
                ? { success: true }
                : { error: result.error ?? "Unsubscribe failed" },
        ),
        {
            status: result.ok ? 200 : 400,
            headers: { "Content-Type": "application/json" },
        },
    );
};
