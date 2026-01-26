/**
 * Script to render the RecoveryTipsEmail to HTML
 * Run with: bun packages/email/emails/recovery-tips/render.ts
 */

import { render } from "@react-email/components";
import RecoveryTipsEmail from "../recovery-tips";

async function main() {
  const html = await render(
    RecoveryTipsEmail({
      recipientName: "{{RECIPIENT_NAME}}",
      unsubscribeUrl: "{{UNSUBSCRIBE_URL}}",
    }),
  );

  console.log("=== RENDERED HTML TEMPLATE ===");
  console.log(html);
  console.log("\n=== END TEMPLATE ===");
  console.log("\nPlaceholders to replace:");
  console.log("- {{RECIPIENT_NAME}}");
  console.log("- {{UNSUBSCRIBE_URL}}");
}

main();
