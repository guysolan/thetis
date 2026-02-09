import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelectItemsByAddress } from "../../stockpiles/api/selectItemsByAddress";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { ItemChange, OrderItem } from "../types";
import {
  calculateRequiredQuantity,
  findStockLevel,
} from "../utils/processOrderForm";
import calculateItemTotal from "../utils/calculateItemTotal";
import { ItemView } from "../../items/types";

/**
 * Custom hook to handle build form logic
 *
 * @description
 * Processes the form in the following steps:
 * 1. Processes each produced item:
 *    - Adds the item quantity to consumed items
 *    - For parts: adds quantity, price, and tax to order_items
 *    - For each component:
 *      - Services: adds to order_items
 *      - Parts: subtracts (component_qty × item_qty) from consumed items
 * 2. Determines stock level for each item at selected address
 * 3. Sets form values for consumed quantities (before/during/after) at address
 * 4. Sets form values for order items
 *
 * @returns void
 */
export const useBuyForm = () => {
  const { setValue, watch } = useFormContext();
  const { data: items } = useSelectItemsView();
  const { data: addressItems } = useSelectItemsByAddress();

  // Watch both the array and the individual fields within each item
  // Watch doesn't work for deep changes to the object by default
  const producedItems = watch("produced_items");
  // Watch all relevant fields of each produced item

  const selectedAddress = watch("from_shipping_address_id");

  const updateBuyForm = () => {
    console.log("updateBuyForm");
    if (!items || !addressItems) {
      return;
    }

    // If no produced items, clear derived fields
    if (!producedItems?.length) {
      setValue("consumed_items", []);
      setValue("order_items", []);
      setValue("stock_levels", []);
      return;
    }

    // 1. Process all produced items and their components
    const { consumedItems, orderItems } = processOrderItems(
      producedItems,
      items,
    );

    // 2. Find stock levels at selected address
    const addressStock = addressItems.filter(
      (item) => String(item.address_id) === String(selectedAddress),
    );

    // 3. Calculate before, during, and after quantities
    const stockLevels = consumedItems.map((item) => {
      const currentStock = findStockLevel(
        String(item.item_id),
        addressStock,
        producedItems,
        items,
      );

      return {
        item_id: String(item.item_id),
        before_quantity: currentStock,
        during_quantity: item.quantity_change,
        after_quantity: currentStock + item.quantity_change,
      };
    });

    // 4. Set form values
    setValue("stock_levels", stockLevels);
    setValue("consumed_items", consumedItems);
    setValue("order_items", orderItems);
  };
  useEffect(() => {
    updateBuyForm();
  }, [producedItems, items, addressItems, selectedAddress, setValue]);
  return { updateBuyForm };
};

const consolidateConsumedItems = (items: ItemChange[]): ItemChange[] => {
  const totals = items.reduce(
    (acc, item) => {
      const key = item.item_id;
      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].quantity_change += item.quantity_change;
      }
      return acc;
    },
    {} as Record<string, ItemChange>,
  );

  return Object.values(totals);
};

const consolidateOrderItems = (items: OrderItem[]): OrderItem[] => {
  const totals = items.reduce(
    (acc, item) => {
      const key = item.item_id;
      if (!acc[key]) {
        acc[key] = { ...item };
      } else {
        acc[key].quantity_change += item.quantity_change;
        acc[key].item_total = calculateItemTotal(
          acc[key].item_price || 0,
          acc[key].item_tax || 0.2,
          acc[key].quantity_change,
        );
      }
      return acc;
    },
    {} as Record<string, OrderItem>,
  );

  return Object.values(totals);
};

function processOrderItems(producedItems: ItemChange[], items: ItemView[]) {
  const consumedItems: ItemChange[] = [];
  const orderItems: OrderItem[] = [];

  producedItems.forEach((producedItem) => {
    const itemInView = items.find(
      (p) => String(p.item_id) === String(producedItem.item_id),
    );
    if (!itemInView) return;

    // 1.a. Add the produced item to consumed items
    consumedItems.push({
      item_id: String(itemInView.item_id),
      item_name: itemInView.item_name,
      item_type: itemInView.item_type,
      quantity_change: producedItem.quantity_change,
      package_item_change_id: producedItem.package_item_change_id,
    });

    // 1.a.i. If it's a part, add to order_items
    if (itemInView.item_type === "part") {
      orderItems.push({
        item_id: String(itemInView.item_id),
        quantity_change: producedItem.quantity_change,
        item_price: itemInView?.item_price || 0,
        item_tax: 0.2,
        item_type: "part",
        item_total: calculateItemTotal(
          itemInView.item_price || 0,
          0.2,
          producedItem.quantity_change,
        ),
      });
    }

    // 1.b. Process each component
    (itemInView.components || []).forEach((component) => {
      const requiredQuantity = calculateRequiredQuantity(
        Number(component.component_quantity),
        producedItem.quantity_change,
      );
      if (!component) return;
      // 1.b.i. If component is a service, add to order_items
      if (component?.component_type === "service") {
        orderItems.push({
          item_id: String(component.component_id),
          item_name: component.component_name,
          quantity_change: requiredQuantity,
          item_price: component.component_price || 0,
          item_tax: component.component_tax || 0.2,
          item_type: "service",
          item_total: calculateItemTotal(
            component.component_price || 0,
            0.2,
            requiredQuantity,
          ),
        });
      } // 1.b.ii. If component is a part, subtract from consumed items
      else {
        consumedItems.push({
          item_id: String(component.component_id),
          item_name: component.component_name,
          item_type: "part",
          quantity_change: -requiredQuantity,
          package_item_change_id: producedItem.package_item_change_id,
        });
      }
    });
  });

  // Consolidate consumed items with same item_id
  const consolidatedConsumedItems = consolidateConsumedItems(consumedItems);
  // Consolidate order items (services) with same item_id
  const consolidatedOrderItems = consolidateOrderItems(orderItems);

  return { consumedItems: consolidatedConsumedItems, orderItems: consolidatedOrderItems };
}
