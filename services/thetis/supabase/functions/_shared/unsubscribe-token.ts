/**
 * One-click unsubscribe links.
 *
 * A link is `<website>/unsubscribe?u=<user_id>&t=<token>` where the token is an
 * HMAC-SHA256 of the user id keyed by UNSUBSCRIBE_SECRET. Nothing is persisted:
 * public.users is readable by the anon role, so a stored token column would let
 * anyone mint a link for any address.
 *
 * Rotating UNSUBSCRIBE_SECRET invalidates links in emails already sent, so
 * treat it as long-lived. Recipients holding a dead link can still opt out by
 * entering their email on the unsubscribe page.
 */
const DEFAULT_WEBSITE_URL = "https://thetismedical.com";

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(
        /=+$/,
        "",
    );
}

function base64UrlDecode(value: string): Uint8Array<ArrayBuffer> | null {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
        normalized.length + ((4 - (normalized.length % 4)) % 4),
        "=",
    );
    try {
        const binary = atob(padded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    } catch {
        return null;
    }
}

async function importKey(secret: string): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"],
    );
}

export async function signUnsubscribeToken(
    userId: string,
    secret: string,
): Promise<string> {
    const key = await importKey(secret);
    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(userId),
    );
    return base64UrlEncode(new Uint8Array(signature));
}

/** Constant-time via crypto.subtle.verify. */
export async function verifyUnsubscribeToken(
    userId: string,
    token: string,
    secret: string,
): Promise<boolean> {
    const signature = base64UrlDecode(token);
    if (!signature) return false;
    const key = await importKey(secret);
    return await crypto.subtle.verify(
        "HMAC",
        key,
        signature,
        encoder.encode(userId),
    );
}

/**
 * Builds the link handed to Knock as `unsubscribe_url` trigger data.
 * Returns null when UNSUBSCRIBE_SECRET is unset so callers can omit the field
 * and let the email layout fall back to the plain unsubscribe page.
 */
export async function buildUnsubscribeUrl(
    userId: string,
): Promise<string | null> {
    const secret = Deno.env.get("UNSUBSCRIBE_SECRET");
    if (!secret) {
        console.warn(
            "UNSUBSCRIBE_SECRET not set; sending emails without a one-click unsubscribe link",
        );
        return null;
    }
    const baseUrl = (Deno.env.get("WEBSITE_URL") || DEFAULT_WEBSITE_URL)
        .replace(/\/$/, "");
    const token = await signUnsubscribeToken(userId, secret);
    return `${baseUrl}/unsubscribe?u=${encodeURIComponent(userId)}&t=${
        encodeURIComponent(token)
    }`;
}
