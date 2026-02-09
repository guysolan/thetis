# Orders

All orders follow the same multi-step form: **Companies → Items → Review**.
The order type determines which form fields are active and how items map to inventory.

---

## Order Types

### Build

Produces finished goods, consumes raw parts, and purchases services.

**User inputs:** packages (or items directly) → populates `produced_items`.
**Everything else is computed** by `useBuyForm`:

| Computed field | Source | Description |
|---|---|---|
| `consumed_items` (negative) | Part components of produced items | Parts removed from `from_shipping_address_id` |
| `consumed_items` (positive) | The produced items themselves | Products added to `to_shipping_address_id` |
| `order_items` | Service components of produced items | Services with price/tax — the invoice line items |

**Example:** Build 2× Widget Package. Each Widget needs 3 Screws (part) + 1 Assembly (service).
- Produced: +2 Widgets at factory
- Consumed: -6 Screws from warehouse
- Services: 2× Assembly (with cost)

### Buy

Simple purchase: items received at a location. Nothing is consumed or produced.

**User inputs:** packages or items → populates `order_items` with positive quantities.
All items get `address_id = to_shipping_address_id` (delivery address) with positive `quantity_change`.
Opposite of Sell: stock in at one address, with price/tax.

### Sell

Sells items from a location.

**User inputs:** packages or items → populates `order_items` with quantities and prices.
Items leave `from_shipping_address_id` (negative) and arrive at `to_shipping_address_id` (positive).

### Ship

Moves items between two locations.

**User inputs:** packages or items → populates `to_items` (destination, positive qty).
`from_items` is auto-mirrored (source, negative qty).

| Field | Address | Qty |
|---|---|---|
| `to_items` | `to_shipping_address_id` | +N |
| `from_items` | `from_shipping_address_id` | -N |

### Count

Stock check: adjusts inventory to match a physical count.

**User inputs:** item quantities at a location. Form data is passed through directly — no processing function. The difference between current stock and counted stock becomes the `quantity_change`.

---

## Data Flow

```
User adds Package (or direct item)
  │
  ▼
PackageStockItems
  │  writes component items into the target field:
  │    Build:    produced_items
  │    Buy:      order_items (at to_shipping_address_id)
  │    Sell:     order_items
  │    Ship:     to_items + from_items
  ▼
Order-type hook (build only: useBuyForm)
  │  watches produced_items, computes:
  │    consumed_items (parts consumed + products produced)
  │    order_items    (services with costs)
  ▼
InventoryImpact (read-only UI, build only)
  shows before / change / after per location
```

---

## Database Tables

```
orders
  id, order_type, order_date, currency, carriage, ...

item_changes
  id, item_id, quantity_change, address_id

order_item_changes
  order_id, item_change_id, price, tax,
  package_item_id, package_item_change_id, lot_number
```

Every order item creates one `item_changes` row (the stock movement) linked to `order_item_changes` (the commercial detail: price, tax, package association).

---

## Persistence

`createOrder.ts` routes to the correct processor:

| Order type | Processor | What it does |
|---|---|---|
| Build | `processBuyFormData` | Maps consumed_items (negative→from, positive→to) + order_items (services→to) |
| Buy | `processSimpleBuyFormData` | Maps order_items with positive qty at to_shipping_address_id only |
| Sell | `processSellFormData` | Maps order_items: negative at from_address, positive at to_address |
| Ship | `processShipmentFormData` | Maps from_items (negative) + to_items (positive) |
| Count | passthrough | Form data used directly |

`saveOrderPage.ts` then:
1. Deletes existing item_changes for the order
2. Upserts package item_changes (qty=1 per package)
3. Upserts regular item_changes + order_item_changes with price/tax

---

## Key Files

| File | Role |
|---|---|
| `hooks/useBuyForm.tsx` | Reactive hook (build only): watches `produced_items`, computes `consumed_items` + `order_items` |
| `api/createOrder.ts` | Processors: `processBuyFormData` (build), `processSimpleBuyFormData` (buy), `processSellFormData`, `processShipmentFormData` |
| `api/saveOrderPage.ts` | Persists item_changes + order_item_changes to DB |
| `components/InventoryImpact.tsx` | Read-only stock impact display (before/change/after or cost view) |
| `components/PackageStockItems.tsx` | Package picker; writes components into target form fields |
| `components/StockItems.tsx` | Generic editable/read-only item list |
| `features/multi-order-form/pages/ItemsPageSimple.tsx` | Unified items page; renders order-type-specific UI (sell, buy, build, ship, count) |
