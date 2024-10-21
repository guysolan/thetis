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
				quantity_change: number;
				component_id: string;
				component_name: string;
			};
			type ConsumedComponents = Record<string, ConsumedComponent>;
			let consumedComponents: ConsumedComponents = {};

			// Step 1: Calculate total change for each component across all order items
			orderItems.forEach((orderItem: OrderItem) => {
				const product = items?.find((p) =>
					String(p.item_id) === String(orderItem.id)
				);

				if (product && product.components) {
					product.components.forEach((component) => {
						const componentId = String(component.component_item_id);
						const change = -(component.quantity * orderItem.quantity);
						
						if (componentId in consumedComponents) {
							consumedComponents[componentId].quantity_change += change;
						} else {
							consumedComponents[componentId] = {
								quantity_change: change,
								component_name: component.component_name,
								component_id: component.component_item_id,
							};
						}
					});
				}
			});

			const updatedPartsSummary = Object.values(consumedComponents).map((component) => {
				const warehouseItem = itemsInWarehouse.find((item) => item.item_id === component.component_id);
				const itemQuantity = warehouseItem?.item_quantity || 0;

				return {
					...component,
					quantity_before: itemQuantity,
					quantity_after: itemQuantity + component.quantity_change,
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
