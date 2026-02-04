---
name: ""
overview: ""
todos: []
isProject: false
---

# Knock post-purchase + purchases table strategy

## Summary

- **Knock:** One post-purchase workflow, triggered from the order webhook, branching by product (splint / course / both). Splint branch: tips over time, review at ~10 days.
- **Schema:** Replace `enrollments` with a single `**purchases**` table that records every product we care about (courses, splint, future products). Use it for course access, Knock branching, and future product logic. Minimal duplication of Shopify: only what we need for access and messaging.

---

## 1. Why store in Supabase (vs “it’s already in Shopify”)?

We’re not duplicating the full order:

- **Store only:** who (user/email), what (product slug), when (purchased_at), and enough to dedupe/support (shopify_order_id, shopify_line_item_id). No line-item details, prices, or full payload.
- **Use it for:** course access checks, Knock “what did they buy?” at trigger time, future features (e.g. “has this customer bought the splint?”), and fast reads without calling Shopify.
- **Benefits:** No Shopify API calls or rate limits for access/branching; one place for “what we’ve given this customer”; easy to add new products by adding a new `product_slug` and webhook mapping.

So we intentionally keep a **minimal** copy of “purchased products we care about” in Supabase; the source of truth for the full order remains Shopify.

---

## 2. Single `purchases` table (product-agnostic, extensible)

**Recommendation:** One table, one row per purchased product we track. Replace `enrollments` conceptually and in code; migrate existing data.

### 2.1 Table: `purchases`

- **Purpose:** Record every product we sell that we need to act on (course access, Knock flows, future products).
- **Name:** `purchases` (clear and product-agnostic). Alternatives: `customer_purchases`, `order_line_items`; `purchases` is short and clear.

Suggested columns:

| Column                                         | Type                    | Purpose                                                                         |
| ---------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `id`                                           | uuid PK                 | —                                                                               |
| `user_id`                                      | uuid FK users, nullable | Set when we know the user (signup/link); nullable for “purchased before signup” |
| `product_slug`                                 | text NOT NULL           | Extensible: `standard_course`, `premium_course`, `splint`, future products      |
| `shopify_order_id`                             | text                    | Idempotency + support                                                           |
| `shopify_order_number`                         | text                    | Display (“Order #1234”)                                                         |
| `shopify_customer_email`                       | text NOT NULL           | Lookup before/without user_id                                                   |
| `shopify_line_item_id`                         | text                    | Unique per line item                                                            |
| `status`                                       | text                    | e.g. `active`, `cancelled`, `refunded`, `expired`                               |
| `purchased_at`                                 | timestamptz             | When they bought                                                                |
| `created_at` / `updated_at`                    | timestamptz             | —                                                                               |
| UNIQUE(shopify_order_id, shopify_line_item_id) | —                       | One row per line item                                                           |

- **product_slug** is the single extensible key: add new products by adding new slugs and webhook mapping (e.g. `PRODUCT_SLUG_BY_SHOPIFY_PRODUCT_ID`). No new tables or columns for new products.
- **Course app:** “Has access to standard” = row in `purchases` with `product_slug = 'standard_course'` and `status = 'active'`. Same for premium/essentials/professionals.
- **Knock:** At trigger time we already have the order payload; we can pass `products_ordered` from the webhook (derived from line items). Optionally later: “what has this customer ever bought?” from `purchases` (e.g. for cross-sell logic).

### 2.2 Migration from `enrollments`

- Add `purchases` table (new migration).
- **Data migration:** Insert into `purchases` from `enrollments`: map `course_type` → `product_slug` (e.g. `standard` → `standard_course`, `premium` → `premium_course`, etc.), copy user_id, Shopify fields, status, purchased_at.
- **Code:** Webhook writes to `purchases` for **all** tracked products (courses + splint); remove writes to `enrollments`. Course app and claim page read from `purchases` (filter by `product_slug` in course set, `status = 'active'`). Update `useEnrollment` (or rename to e.g. `usePurchases` / keep name but query `purchases`); `hasAccess('standard')` → “exists purchase with product_slug = 'standard_course'”.
- **Backward compatibility:** Either drop `enrollments` after migration and code switch, or keep `enrollments` as a view over `purchases` where `product_slug` in course slugs for a transition period. Prefer direct cutover to `purchases` and drop `enrollments` once everything uses it.
- **Trigger:** Update `link_enrollments_to_user` to `link_purchases_to_user` (same idea: when user is created, set `user_id` on their purchases by email).

### 2.3 Webhook: one place for all products

- **Product mapping:** One map (e.g. in [shopify-order-webhook/index.ts](services/thetis/supabase/functions/shopify-order-webhook/index.ts)): Shopify `product_id` → `product_slug` (e.g. `9846187786568` → `standard_course`, `9846188081480` → `premium_course`, splint product id → `splint`). Adding a product = one new entry in the map.
- **Logic:** For each line item, if `product_id` is in the map, ensure one row in `purchases` (by shopify_order_id + shopify_line_item_id). Then:
  - If any product is a course: send Resend “course access” email (unchanged).
  - If any product is tracked (course or splint): trigger Knock post-purchase with `products_ordered` = list of slugs for this order.
- **Future products:** Add Shopify product id → slug; webhook and Knock branches can treat new slug as needed (e.g. new branch or step in Knock).

---

## 3. Knock post-purchase (unchanged intent, fed from same data)

- **Trigger:** From order webhook after writing `purchases`; payload includes `products_ordered` (e.g. `['splint']`, `['standard_course']`, or `['splint','standard_course']`).
- **Workflow:** Single `post-purchase` workflow with branch step: splint_only, course_only, both. Splint branch: thank you, setup tips (crutches, straps, toes down), reinforcement, review at ~10 days. Course/both branches as previously planned.
- **Data source:** We still pass `products_ordered` from the webhook (from the order we just processed). No need to query `purchases` in the webhook for the trigger; the table is the durable record for the app and future features.

---

## 4. Implementation order (revised)

1. **Schema:** Add `purchases` table; migrate `enrollments` → `purchases`; add `link_purchases_to_user` trigger; switch webhook to write `purchases` for courses (and splint once ID is added); switch course app + claim to read `purchases`; remove `enrollments` usage and drop table (or view) when safe.
2. **Webhook:** Add splint product ID and any future IDs to the product_slug map; trigger Knock post-purchase with `products_ordered` when order has any tracked product.
3. **Knock:** Implement `post-purchase` workflow with branches and splint/course/both content as in the original plan.
4. **Docs:** Update TESTING_GUIDE / POST_PURCHASE_SETUP with `purchases` and Knock trigger.

This keeps one product-agnostic source of “what was purchased” in Supabase, minimal duplication of Shopify, and a clear path for future products.

---

## Running the migration (local and prod)

**Locally (recommended first):**

```bash
cd services/thetis
supabase db reset
```

This applies both migrations (creates `purchases`, migrates data from `enrollments`, adds `link_purchases_to_user`, then drops `enrollments`) and runs `seed.sql` into `purchases`. Your course app will read from `purchases`; the webhook (when you run it locally or deploy it) writes to `purchases`.

**Production (after local check):**

```bash
cd services/thetis
supabase db push
```

Or link the project and push: `supabase link --project-ref <ref>` then `supabase db push`. Run this against the same DB that currently has `enrollments` so the first migration can copy existing rows into `purchases` before the second migration drops `enrollments`.

**Alignment:** Webhook writes to `purchases` and triggers Knock with `products_ordered`. Course app (useEnrollment, claim) reads from `purchases` and maps `product_slug` to course type. Seed populates `purchases`. All aligned.

**Scalability (e.g. 100 products):** The schema scales: one row per line item, `product_slug` is a single column (no new columns per product). Add new products by adding one entry to the webhook’s product_id → slug map (or a config table later). Index on `(product_slug, status)` keeps “has this user bought X?” fast. Knock can branch on categories (e.g. course / splint / other) rather than one branch per product.
