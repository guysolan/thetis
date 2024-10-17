import { useEffect } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { PartsTable } from "./ItemsTable";
import { useSelectWarehouseItems } from "../../inventory/api/selectWarehouseItems";
import { useSelectParts } from '../../parts/api/selectParts';
import { useSelectItemsView } from '../../items/api/selectItemsView';
import  {type OrderItem} from '@/components/OrderItems'
import { Database } from '../../../database.types';





const PartsTableForm = () => {
	const { data: products } = useSelectItemsView();
	const { data: parts } = useSelectParts();
	const { data: warehouseItems } = useSelectWarehouseItems();
	const { control ,setValue} = useFormContext();
	// Use useWatch instead of form.watch
	const orderItems = useWatch({
		control: control,
		name: "order_items",
	});

	const partsSummary = useWatch({
		control: control,
		name: "parts_summary",
	});

	const selectedFromWarehouse = useWatch({
		control: control,
		name: "parts_from_warehouse_id",
	});

	console.log("partsSummary", partsSummary);


	useEffect(() => {
		if (!selectedFromWarehouse || !warehouseItems || !orderItems) return;

		const updatedPartsSummary = parts.map((part) => {
			const warehousePart = warehouseItems.find(
				(wp) => wp.part_id === part.id,
			);
			const partsBefore = warehousePart ? warehousePart.part_quantity : 0;

			let partsChange = 0;
			orderItems.forEach((item: OrderItem) => {
				if (item.type === "product") {
					const product = products?.find(
						(p) => String(p.id) === String(item.id),
					);
					const partInProduct = product?.product_parts?.find(
						(pp: Database['public']['Tables']['product_parts']['Row'] & {part: Database['public']['Tables']['parts']['Row']}) => String(pp.part.id) === String(part.id),
					);
					if (partInProduct) {
						partsChange -= partInProduct.quantity * item.quantity;
					}
				} else if (
					item.type === "part" &&
					String(item.id) === String(part.id)
				) {
					partsChange += item.quantity;
				}
			});

			console.log("partsChange", partsChange);

			return {
				id: part.id,
				name: part.name,
				parts_before: partsBefore,
				parts_change: partsChange,
				parts_after: partsBefore + partsChange,
			};
		});

		setValue("parts_summary", updatedPartsSummary);
	}, [
		selectedFromWarehouse,
		warehouseItems,
		orderItems,
		products,
		parts,
		
	]);


	return (
	
			<PartsTable partsSummary={partsSummary} />

	);
};

export default PartsTableForm;
