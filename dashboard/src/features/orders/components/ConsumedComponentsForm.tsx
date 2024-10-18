import { useEffect } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { ConsumedComponents } from "./ConsumedComponents";
import { useSelectWarehouseItems } from "../../warehouses/api/selectWarehouseItems";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import { type OrderItem } from "@/components/OrderItems";

const ConsumedComponentsForm = () => {
	const { data: items } = useSelectItemsView();
	const { data: warehouseItems } = useSelectWarehouseItems();
	const { control, setValue } = useFormContext();
	// Use useWatch instead of form.watch
	const orderItems = useWatch({
		control: control,
		name: "order_items",
	});

	const consumedComponents = useWatch({
		control: control,
		name: "consumed_components",
	});

	const selectedFromWarehouse = useWatch({
		control: control,
		name: "from_warehouse_id",
	});

	useEffect(() => {
		if (!selectedFromWarehouse || !warehouseItems || !orderItems) return;

		const itemsInWarehouse = warehouseItems.filter((w) =>
			String(w.warehouse_id) === String(selectedFromWarehouse)
		);

		const updatedPartsSummary = (() => {
			type ConsumedComponent = {
				components_change: number;
				component_id: string;
			};
			type ConsumedComponents = Record<string, ConsumedComponent>;
			let consumedComponents: ConsumedComponents = {};

			// Step 1: Calculate total change for each component

			// Iterate through each order item
			orderItems.forEach((orderItem: OrderItem) => {
				// Find the corresponding product for the order item
				const product = items?.find((p) =>
					String(p.item_id) === String(orderItem.id)
				);

				if (product && product.components) {
					// For each component of the product
					product.components.forEach((component) => {
						const componentId = String(component.component_item_id);
						// Calculate the change (negative because it's consumed)
						const change =
							-(component.quantity * orderItem.quantity);
						// Add the change to the existing value (or 0 if it's the first time)
						consumedComponents[componentId] = {
							components_change: change,
							component_name: component.component_name,
							component_id: component.component_item_id,
						};
					});
				}
			});

			const updatedPartsSummary = Object.values(consumedComponents).map((component) => {
				const warehouseItem = itemsInWarehouse.find((item) => item.item_id === component.component_id);
				const itemQuantity = warehouseItem?.item_quantity || 0;

				return {
					...component,
					components_before: itemQuantity,
					components_after: itemQuantity + component.components_change,
				};
			});

			console.log("updatedPartsSummary", updatedPartsSummary);
			return updatedPartsSummary;

		})();

		setValue("consumed_components", updatedPartsSummary);
	}, [
		selectedFromWarehouse,
		warehouseItems,
		orderItems,
		items,
	]);

	return <ConsumedComponents consumedComponents={consumedComponents} />;
};

export default ConsumedComponentsForm;
