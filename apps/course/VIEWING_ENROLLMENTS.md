# Viewing User Enrollments in Supabase

## Why Supabase (Not Shopify API)?

**✅ Use Supabase enrollments table** - This is the right approach because:

- **Faster**: Local database query vs external API call
- **More reliable**: Works offline, no rate limits
- **Already synced**: Shopify webhook automatically creates enrollment records
- **Instant access checks**: No network delay

## Viewing Enrollments in Supabase Studio

### Local Development

1. Start Supabase:

   ```bash
   cd ../../services/thetis
   supabase start
   ```

2. Open Supabase Studio:
   - URL: <http://127.0.0.1:54323>
   - Or click the Studio URL from the `supabase start` output

3. Navigate to Table Editor:
   - Click "Table Editor" in the left sidebar
   - Select `enrollments` table

4. View enrollments:
   - See all enrollments with columns:
     - `user_id` - Links to `users` table
     - `course_type` - 'standard', 'premium', 'essentials', or 'professionals'
     - `status` - 'active', 'cancelled', 'refunded', or 'expired'
     - `shopify_order_id` - Shopify order reference
     - `shopify_order_number` - Human-readable order number
     - `shopify_customer_email` - Email from Shopify order
     - `purchased_at` - When the course was purchased

### Querying Enrollments

#### In Supabase Studio SQL Editor:

```sql
-- View all active enrollments
SELECT 
  e.*,
  u.email as user_email,
  u.rupture_date
FROM enrollments e
LEFT JOIN users u ON e.user_id = u.id
WHERE e.status = 'active'
ORDER BY e.purchased_at DESC;

-- View enrollments for a specific user (by email)
SELECT 
  e.*,
  u.email as user_email
FROM enrollments e
LEFT JOIN users u ON e.user_id = u.id
WHERE u.email = 'user@example.com'
  AND e.status = 'active';

-- View enrollments for a specific course type
SELECT 
  e.*,
  u.email as user_email
FROM enrollments e
LEFT JOIN users u ON e.user_id = u.id
WHERE e.course_type = 'standard'
  AND e.status = 'active';
```

#### In Your Code:

```typescript
import { supabase } from "@/lib/supabase";
import { useEnrollment } from "@/hooks/use-enrollment";

// Using the hook (recommended)
function MyComponent() {
  const { enrollments, hasAccess } = useEnrollment();
  
  // Check if user has access to standard course
  if (hasAccess("standard")) {
    // User has access!
  }
  
  // View all enrollments
  console.log(enrollments);
}

// Direct query
const { data } = await supabase
  .from("enrollments")
  .select("*")
  .eq("user_id", userId)
  .eq("status", "active");
```

## How Enrollments Are Created

1. **User purchases course on Shopify** → Shopify sends webhook
2. **Webhook handler** (`services/thetis/supabase/functions/shopify-order-webhook/`) receives order
3. **Enrollment created** in `enrollments` table with:
   - `shopify_customer_email` - Email from order
   - `shopify_order_id` - Shopify order ID
   - `course_type` - Mapped from Shopify product ID
   - `status` - 'active'
   - `user_id` - NULL initially (linked when user signs up)

4. **User signs up** → Trigger automatically links enrollment to user account

## Production

In production Supabase dashboard:

1. Go to your project → Table Editor
2. Select `enrollments` table
3. View all enrollments with filters and search
