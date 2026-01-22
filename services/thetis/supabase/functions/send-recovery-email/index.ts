import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
// Pre-rendered React Email template (built from packages/email/emails/recovery-tips.tsx)
// Run `bun packages/email/emails/recovery-tips/build-template.ts` to regenerate
import { renderRecoveryTipsEmail } from "./email-template.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_EMAIL_DOMAIN = Deno.env.get("RESEND_EMAIL_DOMAIN") ||
  "thetismedical.com";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

if (!RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface SendEmailRequest {
  email?: string;
  recipientName?: string;
  sendToAll?: boolean;
  limit?: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body: SendEmailRequest = await req.json();
    const { email, recipientName, sendToAll = false, limit = 100 } = body;

    // If sending to a specific email
    if (email && !sendToAll) {
      const normalizedEmail = email.toLowerCase().trim();
      const unsubscribeUrl = `https://thetismedical.com/unsubscribe?email=${
        encodeURIComponent(normalizedEmail)
      }`;

      // Render the email template
      const emailHtml = renderRecoveryTipsEmail({
        recipientName: recipientName || "there",
        unsubscribeUrl,
      });

      // Send via Resend
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Thetis Medical <info@${RESEND_EMAIL_DOMAIN}>`,
          to: [normalizedEmail],
          subject: "Essential Recovery Tips for Your Achilles Rupture",
          html: emailHtml,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Failed to send email:", errorText);
        return new Response(
          JSON.stringify({ error: "Failed to send email", details: errorText }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }

      const emailData = await emailResponse.json();
      return new Response(
        JSON.stringify({
          success: true,
          message: "Email sent successfully",
          emailId: emailData.id,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    // If sending to all subscribers/purchasers
    if (sendToAll) {
      // Get all users from the users table (subscribers)
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("email")
        .eq("email_course_enabled", true)
        .limit(limit);

      if (usersError) {
        console.error("Error fetching users:", usersError);
        return new Response(
          JSON.stringify({
            error: "Failed to fetch users",
            details: usersError.message,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }

      // Get all unique customer emails from enrollments (purchasers)
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("shopify_customer_email")
        .eq("status", "active")
        .limit(limit);

      if (enrollmentsError) {
        console.error("Error fetching enrollments:", enrollmentsError);
        return new Response(
          JSON.stringify({
            error: "Failed to fetch enrollments",
            details: enrollmentsError.message,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }

      // Combine and deduplicate emails
      const allEmails = new Set<string>();
      if (users) {
        users.forEach((user) => {
          if (user.email) {
            allEmails.add(user.email.toLowerCase().trim());
          }
        });
      }
      if (enrollments) {
        enrollments.forEach((enrollment) => {
          if (enrollment.shopify_customer_email) {
            allEmails.add(
              enrollment.shopify_customer_email.toLowerCase().trim(),
            );
          }
        });
      }

      const emailList = Array.from(allEmails);
      console.log(
        `Sending recovery tips email to ${emailList.length} recipients`,
      );

      // Send individual emails to allow per-email unsubscribe URLs
      const results = [];
      const errors = [];

      // For batch sends, we'll send individual emails to allow per-email unsubscribe URLs
      // This is more efficient than rendering per email but still allows personalization
      const results = [];
      const errors = [];

      for (const recipientEmail of emailList) {
        const unsubscribeUrl = `https://thetismedical.com/unsubscribe?email=${
          encodeURIComponent(recipientEmail)
        }`;

        // Render email template with personalized unsubscribe URL
        const emailHtml = renderRecoveryTipsEmail({
          recipientName: "there",
          unsubscribeUrl,
        });

        // Send individual email via Resend
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `Thetis Medical <info@${RESEND_EMAIL_DOMAIN}>`,
            to: [recipientEmail],
            subject: "Essential Recovery Tips for Your Achilles Rupture",
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          console.error(
            `Failed to send email to ${recipientEmail}:`,
            errorText,
          );
          errors.push({ email: recipientEmail, error: errorText });
        } else {
          const emailData = await emailResponse.json();
          results.push({ email: recipientEmail, emailId: emailData.id });
        }

        // Rate limiting: wait 100ms between emails to avoid hitting rate limits
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `Processed ${emailList.length} recipients`,
          sent: results.length,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        error: "Either provide 'email' or set 'sendToAll' to true",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in send-recovery-email function:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
