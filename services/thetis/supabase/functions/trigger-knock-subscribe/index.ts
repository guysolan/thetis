import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const KNOCK_API_KEY = Deno.env.get("KNOCK_API_KEY");
const KNOCK_WORKFLOW_KEY = "subscribe"; // The workflow key in Knock

if (!KNOCK_API_KEY) {
  console.error("Missing KNOCK_API_KEY environment variable");
}

interface UserRecord {
  id: string;
  email: string;
  phone?: string;
  rupture_date?: string;
  email_course_enabled?: boolean;
  created_at?: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: UserRecord;
  old_record?: UserRecord;
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

  if (!KNOCK_API_KEY) {
    return new Response(
      JSON.stringify({ error: "KNOCK_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const payload: WebhookPayload = await req.json();
    const { type, record, old_record } = payload;

    // Only trigger for new user INSERTs
    if (type !== "INSERT") {
      console.log(`Ignoring ${type} event for users table`);
      return new Response(
        JSON.stringify({ message: `Ignoring ${type} event` }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // Skip if user has disabled email course
    if (record.email_course_enabled === false) {
      console.log(
        `User ${record.email} has email_course_enabled=false, skipping`,
      );
      return new Response(
        JSON.stringify({ message: "Email course disabled for user" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    console.log(`Triggering Knock workflow for new user: ${record.email}`);

    // Trigger the Knock workflow
    // Using Knock's REST API directly (simpler than SDK in Deno)
    const knockResponse = await fetch(
      `https://api.knock.app/v1/workflows/${KNOCK_WORKFLOW_KEY}/trigger`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KNOCK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Recipients - the user who will receive the emails
          recipients: [
            {
              id: record.id,
              email: record.email,
              phone_number: record.phone || undefined,
            },
          ],
          // Cancellation key - use user_id so we can cancel if needed
          cancellation_key: record.id,
          // Data passed to the workflow (available in templates)
          data: {
            user_id: record.id,
            email: record.email,
            rupture_date: record.rupture_date || null,
            signed_up_at: record.created_at || new Date().toISOString(),
          },
        }),
      },
    );

    if (!knockResponse.ok) {
      const errorText = await knockResponse.text();
      console.error("Knock API error:", errorText);
      return new Response(
        JSON.stringify({
          error: "Failed to trigger Knock workflow",
          details: errorText,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const knockData = await knockResponse.json();
    console.log(
      `Knock workflow triggered successfully for ${record.email}:`,
      knockData.workflow_run_id,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Knock workflow triggered",
        workflow_run_id: knockData.workflow_run_id,
        user_id: record.id,
        email: record.email,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("Error in trigger-knock-subscribe function:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
