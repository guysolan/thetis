import { corsHeaders } from "../_shared/cors.ts";
import { getMonthlyFinancialReport } from "../_shared/amazon/finances.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const { year, month } = await req.json();
    const finances = await getMonthlyFinancialReport("NA", year, month);
    return new Response(
      JSON.stringify(finances.payload.transactions),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify(e),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
