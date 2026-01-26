/**
 * Script to render the CourseAccessEmail to HTML template
 * Run with: bun packages/email/emails/course/render.ts
 * 
 * This generates an HTML template with placeholders that can be used
 * in the Supabase Edge Function.
 */

import { render } from "@react-email/components";
import CourseAccessEmail from "./course-access";

async function main() {
  // Render with placeholder values that we'll document for the Edge Function
  const html = await render(
    CourseAccessEmail({
      customerEmail: "{{CUSTOMER_EMAIL}}",
      orderNumber: "{{ORDER_NUMBER}}",
      courseType: "{{COURSE_TYPE}}",
      claimUrl: "{{CLAIM_URL}}",
    })
  );

  console.log("=== RENDERED HTML TEMPLATE ===");
  console.log(html);
  console.log("\n=== END TEMPLATE ===");
  console.log("\nPlaceholders to replace:");
  console.log("- {{CUSTOMER_EMAIL}}");
  console.log("- {{ORDER_NUMBER}}");
  console.log("- {{COURSE_TYPE}}");
  console.log("- {{CLAIM_URL}}");
}

main();
