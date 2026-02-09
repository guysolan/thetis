import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useSelectAddresses } from "@/features/stockpiles/api/selectAddresses";
import { useStockQuantities } from "../hooks/useStockQuantities";
import { roundIfRequired } from "../utils/roundIfRequired";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { MapPin, ShoppingCart } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { defaultCurrency } from "../../../constants/currencies";

interface LocationImpact {
  /** Label for this location group (e.g. "Consumed from", "Added to") */
  label: string;
  /** Form field name for items (e.g. "consumed_items", "order_items") */
  fieldName: string;
  /** Form field name for the address (e.g. "from_shipping_address_id") */
  addressName: string;
  /** Only show items where quantity_change matches this sign: "negative", "positive", or "all" */
  filter?: "negative" | "positive" | "all";
  /** When true, show Qty / Price / Total columns instead of Before / Change / After (for services) */
  showCost?: boolean;
  /** When true, don't append the address name to the label */
  hideAddress?: boolean;
}

interface InventoryImpactProps {
  /** One or more location impact groups to display */
  locations: LocationImpact[];
  title?: string;
}

function LocationSection({ location }: { location: LocationImpact }) {
  const { data: items } = useSelectItemsView();
  const { data: addresses } = useSelectAddresses();
  const form = useFormContext();
  const orderDate = form.watch("order_date");
  const { fields } = useFieldArray({ name: location.fieldName });
  const { getItemQuantities } = useStockQuantities(
    location.fieldName,
    location.addressName,
    { orderDate: orderDate ?? undefined },
  );

  const currency = useWatch({
    control: form.control,
    name: "currency",
    defaultValue: defaultCurrency,
  });

  const currencyFormat = {
    style: "currency" as const,
    currency: currency ?? defaultCurrency,
  };

  const addressId = form.watch(location.addressName);
  const address = addresses?.find((a) => String(a.id) === String(addressId));
  const filter = location.filter ?? "all";
  const showCost = location.showCost ?? false;

  // Build visible rows applying the sign filter
  const visibleRows = fields
    .map((field, index) => {
      const quantityChange =
        form.watch(`${location.fieldName}.${index}.quantity_change`) || 0;

      if (filter === "negative" && quantityChange >= 0) return null;
      if (filter === "positive" && quantityChange <= 0) return null;

      const itemId = form.watch(`${location.fieldName}.${index}.item_id`);
      const itemName =
        form.watch(`${location.fieldName}.${index}.item_name`) ||
        items?.find((i) => String(i.item_id) === itemId)?.item_name ||
        "Unknown";
      const quantities = getItemQuantities(itemId);
      const itemPrice = form.watch(`${location.fieldName}.${index}.item_price`) || 0;
      const itemTax = form.watch(`${location.fieldName}.${index}.item_tax`) || 0;
      const itemTotal = form.watch(`${location.fieldName}.${index}.item_total`) ||
        (quantityChange * itemPrice * (1 + itemTax));

      return { field, itemId, itemName, quantityChange, quantities, itemPrice, itemTotal };
    })
    .filter(Boolean);

  if (visibleRows.length === 0) return null;

  const IconComponent = showCost ? ShoppingCart : MapPin;
  const grandTotal = showCost
    ? visibleRows.reduce((sum, row) => sum + (row.itemTotal ?? 0), 0)
    : 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <IconComponent size={14} className="text-muted-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground">
          {location.label}
          {!location.hideAddress && address?.name ? ` — ${address.name}` : ""}
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Item</TableHead>
            {showCost ? (
              <>
                <TableHead className="text-xs text-center">Qty</TableHead>
                <TableHead className="text-xs text-right">Unit Price</TableHead>
                <TableHead className="text-xs text-right">Total</TableHead>
              </>
            ) : (
              <>
                <TableHead className="text-xs text-center">Before</TableHead>
                <TableHead className="text-xs text-center">Change</TableHead>
                <TableHead className="text-xs text-center">After</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.field.id}>
              <TableCell className="text-sm font-medium py-2">
                {row.itemName}
              </TableCell>
              {showCost ? (
                <>
                  <TableCell className="text-sm text-center py-2">
                    {roundIfRequired(row.quantityChange)}
                  </TableCell>
                  <TableCell className="text-sm text-right py-2 text-muted-foreground">
                    <NumberFlow
                      value={row.itemPrice ?? 0}
                      format={currencyFormat}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-right py-2 font-medium">
                    <NumberFlow
                      value={row.itemTotal ?? 0}
                      format={currencyFormat}
                    />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="text-sm text-center py-2 text-muted-foreground">
                    {roundIfRequired(row.quantities?.before || 0)}
                  </TableCell>
                  <TableCell className="text-sm text-center py-2">
                    <span
                      className={
                        row.quantityChange < 0
                          ? "text-destructive"
                          : row.quantityChange > 0
                            ? "text-primary"
                            : "text-muted-foreground"
                      }
                    >
                      {row.quantityChange > 0 ? "+" : ""}
                      {roundIfRequired(row.quantityChange)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-center py-2 font-medium">
                    {roundIfRequired(row.quantities?.after || 0)}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
        {showCost && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-sm font-medium py-2 text-right">
                Total
              </TableCell>
              <TableCell className="text-sm text-right py-2 font-semibold">
                <NumberFlow
                  value={grandTotal}
                  format={currencyFormat}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

const InventoryImpact = ({
  locations,
  title = "Inventory Impact",
}: InventoryImpactProps) => {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {locations.map((location, index) => (
        <LocationSection key={`${location.fieldName}-${location.filter ?? index}`} location={location} />
      ))}
    </div>
  );
};

export default InventoryImpact;
