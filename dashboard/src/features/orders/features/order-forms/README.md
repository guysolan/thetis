# Order Management System

A streamlined system for managing different types of orders in a warehouse/inventory context. Built with React and TypeScript.

## Order Types

How things are recorded:
`{
    order_id: 4,
    order_type: "sale",
    order_date: "2024-01-01",
    order_items: [
        item_changes[
            { item_id: 1, quantity: 10, cost: 100 },
            { item_id: 2, quantity: -10, cost: 0 }
        ],
    ]
}`

### 🛍️ Sales & Shipments

- Only packages should be needed for the order (which contain products or parts).
- The components of the package (products or parts) are recorded as a negative quantity in the `item_changes` table for the `from_address_id`.
- The components of the packages are recorded as a positive quantity in the `item_changes` table for the `to_address_id`.

### 📦 Purchases

- Parts or products are `requested_items`.
- Consumed items are `order_items` are recorded twice:
  - Once with a positive quantity and a cost (for the purchase order costings).
  - Once with a negative quantity and a cost of 0 (to reset the stock level for the stock take).
  - `consumed_items` are made up of the components of the `requested_items`.
*The negative quantity lives in `order_items` not `consumed_items` as if it were a service etc, it'd be weird to appear in consumed_items*

- Only packages should be needed for the order (which contain products or parts).
- The components of the package (products or parts) are recorded as a negative quantity in the `item_changes` table.

### 🛒 Purchases

- Buy products from suppliers
- Record costs and quantities
- Track produced and consumed items
- Manage supplier information

### 📊 Stock Takes

- Audit current inventory levels
- Record quantity adjustments
- Track changes over time
- Compare expected vs actual stock

## Key Features

- **Real-time Stock Validation:** Prevents negative stock levels and validates quantities
- **Smart Composition:** Forms share common elements while maintaining type safety
- **Address Management:** Track multiple shipping and billing locations
- **Price Tracking:** Monitor costs, taxes, and currency conversions
- **Package Handling:** Group items together for efficient shipping

## Form Structure

Each form inherits from a base structure while adding specialized fields for its specific purpose. The system automatically calculates stock changes and validates business rules in real-time.

For technical details, see the [schema documentation](#) and [component reference](#).
