import { FormProvider, useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { multiOrderFormSchema as schema } from "../schema";
import StockItems from "../../../components/StockItems";
import PackageStockItems from "../../../components/PackageStockItems";
import InventoryImpact from "../../../components/InventoryImpact";
import { Badge } from "@thetis/ui/badge";
import { useBuyForm } from "../../../hooks/useBuyForm";

type ItemsPageSimpleProps = {
  form: any; // TanStack Form
};

export function ItemsPageSimple({ form }: ItemsPageSimpleProps) {
  const [orderType, setOrderType] = React.useState<string | undefined>(
    undefined,
  );

  // Subscribe to form state
  React.useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      const values = form.state.values;
      setOrderType(values.order_type);
    });
    return unsubscribe;
  }, [form]);

  // Create react-hook-form instance for child components
  const rhfForm = useReactHookForm({
    defaultValues: form.state.values,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Sync TanStack Form to react-hook-form
  const syncingFromTanstack = React.useRef(false);
  const syncingFromRHF = React.useRef(false);

  React.useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      if (syncingFromRHF.current) return;
      syncingFromTanstack.current = true;
      rhfForm.reset(form.state.values as any, {
        keepDirty: true,
        keepDirtyValues: true,
        keepErrors: true,
        keepTouched: true,
        keepIsSubmitted: true,
        keepSubmitCount: true,
        keepDefaultValues: true,
      });
      // Defer clearing so any async watch() from reset() still sees the flag and skips pushing to TanStack
      queueMicrotask(() => {
        syncingFromTanstack.current = false;
      });
    });
    return unsubscribe;
  }, [form, rhfForm]);

  // Skip pushing to TanStack when value is unchanged to avoid subscribe→reset→watch→setFieldValue loop
  const valuesAreEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a === "object" && typeof b === "object") {
      try {
        return JSON.stringify(a) === JSON.stringify(b);
      } catch {
        return false;
      }
    }
    return false;
  };

  React.useEffect(() => {
    const subscription = rhfForm.watch((_, info) => {
      const name = info?.name;
      if (!name || syncingFromTanstack.current) return;
      const nextValue = rhfForm.getValues(name as any);
      const currentValue = (form.state.values as Record<string, unknown>)[name];
      if (valuesAreEqual(currentValue, nextValue)) return;
      syncingFromRHF.current = true;
      form.setFieldValue(name as any, nextValue as never, {
        dontValidate: true,
      });
      syncingFromRHF.current = false;
    });
    return () => {
      subscription.unsubscribe?.();
    };
  }, [form, rhfForm]);

  const isShipment = orderType === "ship";
  const isBuild = orderType === "build";

  // Sync to_items to from_items for shipments
  React.useEffect(() => {
    if (!isShipment) return;

    const unsubscribe = rhfForm.watch((value, { name: fieldName }) => {
      if (fieldName?.startsWith("to_items")) {
        const toItems = rhfForm.getValues("to_items") || [];
        const fromItems = toItems.map((item) => ({
          ...item,
          quantity_change: -Number(item.quantity_change || 0),
        }));
        rhfForm.setValue("from_items", fromItems, {
          shouldDirty: false,
          shouldValidate: false,
        });
        form.setFieldValue("from_items", fromItems, {
          dontValidate: true,
        });
      }
    });

    return () => unsubscribe.unsubscribe();
  }, [isShipment, rhfForm, form]);

  // Determine which items array and address to use based on order type
  type ItemsToUpdate =
    | "order_items"
    | "produced_items"
    | "from_items"
    | "to_items";

  const getItemsConfig = (): {
    itemsName: string;
    addressName: string;
    fromItemsName?: string;
    fromAddressName?: string;
    packageItemsToUpdate: ItemsToUpdate[];
  } => {
    if (isShipment) {
      return {
        itemsName: "to_items",
        addressName: "to_shipping_address_id",
        fromItemsName: "from_items",
        fromAddressName: "from_shipping_address_id",
        packageItemsToUpdate: ["from_items", "to_items"],
      };
    } else if (isBuild) {
      return {
        itemsName: "produced_items",
        addressName: "from_shipping_address_id",
        packageItemsToUpdate: ["produced_items"],
      };
    } else if (orderType === "buy") {
      return {
        itemsName: "order_items",
        addressName: "to_shipping_address_id",
        packageItemsToUpdate: ["order_items"],
      };
    } else {
      return {
        itemsName: "order_items",
        addressName: "from_shipping_address_id",
        packageItemsToUpdate: ["order_items"],
      };
    }
  };

  const itemsConfig = getItemsConfig();

  const getOrderTypeLabel = () => {
    switch (orderType) {
      case "sell":
        return "Sell";
      case "build":
        return "Build";
      case "buy":
        return "Buy";
      case "ship":
        return "Ship";
      case "count":
        return "Count";
      default:
        return "Order";
    }
  };

  const getInstructions = () => {
    switch (orderType) {
      case "sell":
        return "Add items you're selling. Use packages for pre-configured bundles, or add individual items below.";
      case "build":
        return "Add packages or items to produce. Components and services will be calculated automatically.";
      case "buy":
        return "Add items you're buying. Stock will be added to the delivery address.";
      case "ship":
        return "Add items you're shipping between locations.";
      case "count":
        return "Count stock at a location.";
      default:
        return "Add items to this order.";
    }
  };

  // Set mode to package by default
  React.useEffect(() => {
    form.setFieldValue("mode", "package", { dontValidate: true });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-semibold text-lg">Items</h2>
          <Badge variant="outline" className="text-xs">
            {getOrderTypeLabel()}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{getInstructions()}</p>
      </div>

      <FormProvider {...rhfForm}>
        {/* Packages section */}
        <PackageStockItems
          itemsToUpdate={itemsConfig.packageItemsToUpdate}
        />

        {isBuild ? (
          <>
            {/* Produced items: the only editable section -- what is being produced */}
            <StockItems
              name="produced_items"
              address_name="from_shipping_address_id"
              showPrice={false}
              showTax={false}
              title="Produced Items"
              packageMode={true}
            />

            {/* Everything below is computed by useBuyForm and read-only */}
            <BuildInventoryImpact />
          </>
        ) : (
          <>
            {/* Sale / default: single items table */}
            <StockItems
              name={itemsConfig.itemsName}
              address_name={itemsConfig.addressName}
              showPrice={true}
              showTax={true}
              title="Order Items"
              packageMode={true}
            />

            {/* Shipment: read-only mirror of from_items */}
            {isShipment && itemsConfig.fromItemsName && (
              <StockItems
                name={itemsConfig.fromItemsName}
                address_name={itemsConfig.fromAddressName}
                readOnly={true}
                showPrice={false}
                showTax={false}
                title="Source Location Impact"
              />
            )}
          </>
        )}
      </FormProvider>
    </div>
  );
}

/** Wrapper that activates useBuyForm inside FormProvider context (build orders only) */
function BuildInventoryImpact() {
  // useBuyForm watches produced_items and computes consumed_items + order_items
  useBuyForm();

  return (
    <InventoryImpact
      title="Inventory Impact"
      locations={[
        {
          label: "Services to purchase",
          fieldName: "order_items",
          addressName: "to_shipping_address_id",
          filter: "all",
          showCost: true,
          hideAddress: true,
        },
        {
          label: "Parts consumed from",
          fieldName: "consumed_items",
          addressName: "from_shipping_address_id",
          filter: "negative",
        },
        {
          label: "Produced at",
          fieldName: "consumed_items",
          addressName: "to_shipping_address_id",
          filter: "positive",
        },
      ]}
    />
  );
}
