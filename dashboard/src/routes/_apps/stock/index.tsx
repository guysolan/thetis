import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/_apps/stock/")({
  component: () => (
    <>
      <h1 className="mb-6 font-bold text-3xl">Stock Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            This section provides an overview of our stock management system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="items">
              <AccordionTrigger>1. Items (/stock/items)</AccordionTrigger>
              <AccordionContent>
                <p>The Items page should:</p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>
                    Display a list of all items (products and parts) from the
                    `items_view`
                  </li>
                  <li>
                    Show item details: name, price, type, and components (for
                    products)
                  </li>
                  <li>Allow adding new items and editing existing ones</li>
                  <li>For products, enable editing of component parts</li>
                  <li>
                    Use the `item_quantities` view to show current stock levels
                    across stockpiles
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="orders">
              <AccordionTrigger>2. Orders (/stock/orders)</AccordionTrigger>
              <AccordionContent>
                <p>The Orders page should:</p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>
                    List all orders from the `orders_view`, including purchases,
                    sales, and shipments
                  </li>
                  <li>
                    Display order details: type, date, total value, and items
                  </li>
                  <li>
                    Allow creation of new orders, which should:
                    <ul className="space-y-1 mt-2 pl-6 list-circle">
                      <li>Insert into the `orders` table</li>
                      <li>
                        Create corresponding `item_changes` for each item in the
                        order
                      </li>
                      <li>
                        Link orders and item changes in the `order_item_changes`
                        table
                      </li>
                    </ul>
                  </li>
                  <li>
                    Provide filtering and sorting options for better order
                    management
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="stockpiles">
              <AccordionTrigger>
                3. stockpiles (/stock/stockpiles)
              </AccordionTrigger>
              <AccordionContent>
                <p>The stockpiles page should:</p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>List all stockpiles from the `stockpiles`</li>
                  <li>
                    Show stockpile details: name, creation date, and current
                    inventory
                  </li>
                  <li>Allow adding new stockpiles and editing existing ones</li>
                  <li>
                    Provide a way to initiate stocktakes, which should:
                    <ul className="space-y-1 mt-2 pl-6 list-circle">
                      <li>
                        Use the `insert_stocktake_changes` function to record
                        stock levels
                      </li>
                      <li>
                        Update the `item_changes` table with the stocktake
                        results
                      </li>
                      <li>
                        Reflect changes in the `stockpile_items` and
                        `stockpile_inventory_value` views
                      </li>
                    </ul>
                  </li>
                  <li>
                    Display total inventory value for each stockpile using the
                    `stockpile_inventory_value` view
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <p>
        Remember to implement proper error handling, data validation, and user
        feedback throughout these components. Utilize the Supabase client for
        database operations and ensure real-time updates where appropriate.
      </p>
    </>
  ),
});
