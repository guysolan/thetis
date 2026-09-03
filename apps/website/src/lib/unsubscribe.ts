/**
 * Server-side client for the `unsubscribe` Supabase edge function.
 *
 * The edge function holds the service role key and the Knock API key, so the
 * website only forwards the signed link (or a typed email) and renders the
 * outcome. Shared by the /unsubscribe page and the /api/unsubscribe endpoint
 * used for one-click List-Unsubscribe requests.
 */
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export type UnsubscribeAction = "unsubscribe" | "resubscribe";

export interface UnsubscribeInput {
    userId?: string | null;
    token?: string | null;
    email?: string | null;
    action?: UnsubscribeAction;
}

export interface UnsubscribeResult {
    ok: boolean;
    action: UnsubscribeAction;
    email: string | null;
    alreadyUnsubscribed: boolean;
    error?: string;
}

const GENERIC_ERROR =
    "We could not process that just now. Please email info@thetismedical.com and we will remove you manually.";

export function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function requestUnsubscribe(
    input: UnsubscribeInput,
): Promise<UnsubscribeResult> {
    const action = input.action ?? "unsubscribe";
    const failure = (error: string): UnsubscribeResult => ({
        ok: false,
        action,
        email: input.email ?? null,
        alreadyUnsubscribed: false,
        error,
    });

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error(
            "Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY; cannot process unsubscribe",
        );
        return failure(GENERIC_ERROR);
    }

    const hasSignedLink = Boolean(input.userId && input.token);
    if (!hasSignedLink && !input.email) {
        return failure("Please enter the email address you want removed.");
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/unsubscribe`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    action,
                    user_id: hasSignedLink ? input.userId : undefined,
                    token: hasSignedLink ? input.token : undefined,
                    email: hasSignedLink
                        ? undefined
                        : input.email?.trim().toLowerCase(),
                }),
            },
        );

        const body = await response.json().catch(() => null);

        if (!response.ok || !body?.success) {
            console.error(
                "Unsubscribe function returned an error:",
                response.status,
                body,
            );
            const message = response.status === 403
                ? "That unsubscribe link is no longer valid. Enter your email below instead."
                : GENERIC_ERROR;
            return failure(message);
        }

        return {
            ok: true,
            action: body.action ?? action,
            email: body.email ?? input.email ?? null,
            alreadyUnsubscribed: Boolean(body.already_unsubscribed),
        };
    } catch (error) {
        console.error("Unsubscribe request failed:", error);
        return failure(GENERIC_ERROR);
    }
}
