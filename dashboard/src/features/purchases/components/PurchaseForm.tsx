import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { PartsTable } from "./PartsTable.js";
import { calculatePartsSummary } from "../utils/partsSummaryCalculator.js";
import { useProcessPurchase } from "../api/processPurchase.js";
import SelectWarehouse from '../../inventory/components/SelectWarehouse.js';
import { useSelectWarehouseParts } from '../../inventory/api/selectWarehouseParts.js';
import { useSelectWarehouseProducts } from '../../inventory/api/selectWarehouseProducts.js';
const purchaseItemSchema = z.object({
	type: z.enum(["product", "part"]),
	id: z.string().min(1, "Please select an item"),
	quantity: z.number().min(1, "Quantity must be at least 1"),
});

const formSchema = z.object({
	parts_from_warehouse_id: z.string().min(1, "Please select a warehouse"),
	products_to_warehouse_id: z.string().min(1, "Please select a warehouse"),
	purchase_items: z.array(purchaseItemSchema).min(1, "Add at least one item"),
	parts_summary: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			partsBefore: z.number(),
			partsChange: z.number(),
			partsAfter: z.number(),
		}),
	),
});

export type PurchaseFormData = z.infer<typeof formSchema>;

interface PurchaseFormProps {
	products: {
		id: string;
		name: string;
		parts: { id: string; quantity: number }[];
	}[];
	parts: { id: string; name: string; quantity: number }[];
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
	products,
	parts,
}) => {
	const { mutate: processPurchase } = useProcessPurchase();
	const { data: warehouseParts } = useSelectWarehouseParts();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			purchase_items: [{ type: "product", id: "", quantity: 1 }],
			parts_summary: parts.map((part) => ({
				id: part.id,
				name: part.name,
				partsBefore: part.quantity,
				partsChange: 0,
				partsAfter: part.quantity,
			})),
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "purchase_items",
	});

	// Use useWatch instead of form.watch
	const purchaseItems = useWatch({
		control: form.control,
		name: "purchase_items",
	});

	const partsSummary = useWatch({
		control: form.control,
		name: "parts_summary",
	});

	const selectedFromWarehouse = useWatch({
		control: form.control,
		name: "parts_from_warehouse_id",
	});

	useEffect(() => {
		const newPartsSummary = calculatePartsSummary(
			purchaseItems,
			products,
			parts,
		);
		console.log("New parts summary:", newPartsSummary);
		form.setValue("parts_summary", newPartsSummary);
	}, [purchaseItems, products, parts]);

	useEffect(() => {
		console.log("New Calculation");
		console.log(selectedFromWarehouse, "selectedFromWarehouse");
		const selectedWarehouse = warehouseParts.filter((w) => w.id === Number(selectedFromWarehouse));

		console.log("Selected warehouse:", selectedWarehouse);

		const parts = (selectedWarehouse).map((sw,acc) => {
			acc[sw.part_id] = {
				name: sw.part_name,
				part_id: sw.part_id,
				initial_quantity: sw.quantity,
				consumed_quantity: 0,
				remaining_quantity: undefined,
			};
			return acc;
		}, {} as Record<string, {
			name: string;
			part_id: string;
			initial_quantity: number;
			consumed_quantity: number;
		}>);

		console.log("Parts before:", parts);

		for (const item of purchaseItems) {
			if (item.type === "product") {
				const product = products.find((p) => p.id === item.id);
				console.log("product", product);
				if (product) {
					for (const productPart of product.product_parts) {
						const partId = productPart.part_id.toString();
						if (parts[partId]) {
							parts[partId].consumed_quantity += productPart.quantity * item.quantity;
						} else {
							console.warn(`Part with id ${partId} not found in selected warehouse`);
						}
					}
				}
			}
		}

		console.log("Updated parts:", parts);
		// You might want to update the form state or do something else with the updated parts
	}, [purchaseItems, products,parts, warehouseQuantities, selectedFromWarehouse]);

	const partIsNegative = partsSummary.some((part) => part.partsAfter < 0);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		processPurchase(data);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1 pt-2">
					<SelectWarehouse name='parts_from_warehouse_id' label='Use Parts from:' />
					<SelectWarehouse name='products_to_warehouse_id' label='Send Products to:' />
					{fields.map((field, index) => (
						<div key={field.id} className="space-y-2">
							<FormField
								control={form.control}
								name={`purchase_items.${index}.type`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="product">Product</SelectItem>
												<SelectItem value="part">Part</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`purchase_items.${index}.id`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{form.watch(`purchase_items.${index}.type`) === "product"
												? "Product"
												: "Part"}
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={`Select ${
															form.watch(`purchase_items.${index}.type`) ===
															"product"
																? "product"
																: "part"
														}`}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{form.watch(`purchase_items.${index}.type`) ===
												"product"
													? products.map((product) => (
															<SelectItem
																key={product.id}
																value={String(product.id)}
															>
																{product.name}
															</SelectItem>
														))
													: parts.map((part) => (
															<SelectItem key={part.id} value={String(part.id)}>
																{part.name}
															</SelectItem>
														))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`purchase_items.${index}.quantity`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quantity</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{fields.length > 1 && (
								<Button
									type="button"
									onClick={() => remove(index)}
									variant="destructive"
									size="sm"
								>
									Remove
								</Button>
							)}
						</div>
					))}

					<div className="flex gap-2">
						<Button
							type="button"
							variant="secondary"
							size="sm"
							onClick={() => append({ type: "product", id: "", quantity: 1 })}
						>
							Add Product
						</Button>
						<Button
							type="button"
							variant="secondary"
							size="sm"
							onClick={() => append({ type: "part", id: "", quantity: 1 })}
						>
							Add Part
						</Button>
					</div>

					<Button disabled={partIsNegative} type="submit">
						Create Purchase
					</Button>
				</form>
			</Form>
			<hr className="my-4" />
			<PartsTable partsSummary={partsSummary} />
		</>
	);
};
