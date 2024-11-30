const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_EMAIL_DOMAIN = Deno.env.get("RESEND_EMAIL_DOMAIN");

interface ResendParams {
    prefix: string;
    to: string[];
    subject: string;
    html: string;
    attachments?: {
        filename: string;
        content: string;
        path: string;
    }[];
}
export const resend = async (
    { prefix, to, subject, html, attachments }: ResendParams,
) => {
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: `${prefix}@${RESEND_EMAIL_DOMAIN}`,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments ?? [],
        }),
    });

    const data = await res.json();
    return data;
};
