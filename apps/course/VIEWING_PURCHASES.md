# Viewing Purchases in Supabase

Course access is driven by the **`purchases`** table (not enrollments). The Shopify webhook writes course and splint purchases here; the course app reads from it for access checks.

## Viewing Purchases in Supabase Studio

### Local Development

1. Start Supabase:

   ```bash
   cd ../../services/thetis
   supabase start
   ```

2. Open Supabase Studio:
   - URL: <http://127.0.0.1:54323>

3. Navigate to Table Editor → **`purchases`** table.

4. Columns include:
   - `user_id` - Links to `users` (set when user signs up)
   - `product_slug` - e.g. `standard_course`, `premium_course`, `splint`
   - `status` - `active`, `cancelled`, `refunded`, `expired`
   - `shopify_order_id`, `shopify_order_number`, `shopify_customer_email`
   - `purchased_at`

### Querying Purchases

#### In Supabase Studio SQL Editor:

```sql
-- All active course purchases
SELECT p.*, u.email AS user_email
FROM purchases p
LEFT JOIN users u ON u.id = p.user_id
WHERE p.status = 'active'
  AND p.product_slug IN ('standard_course', 'premium_course')
ORDER BY p.purchased_at DESC;

-- Purchases for an email
SELECT * FROM purchases
WHERE shopify_customer_email = 'user@example.com'
  AND status = 'active';
```

#### In Code (use the hook; avoid querying enrollments):

```typescript
import { supabase } from "@/lib/supabase";
import { useEnrollment } from "@/hooks/use-enrollment";

// Recommended: use the hook (reads from purchases)
function MyComponent() {
  const { enrollments, hasAccess } = useEnrollment();
  if (hasAccess("standard")) { /* ... */ }
}

// Direct query: use purchases table only
const { data } = await supabase
  .from("purchases")
  .select("id, product_slug, status, shopify_order_number")
  .eq("shopify_customer_email", email)
  .eq("status", "active")
  .in("product_slug", ["standard_course", "premium_course"]);
```

## How Purchases Are Created

1. Customer buys on Shopify → order/paid webhook fires.
2. **shopify-order-webhook** writes rows to `purchases` (one per tracked product: courses, splint).
3. Knock post-purchase workflows are triggered by the same webhook.
4. When the user signs up, a trigger links `purchases` to their `user_id` by matching `shopify_customer_email`.

## Production

In the production Supabase dashboard: Table Editor → **`purchases`** table.
