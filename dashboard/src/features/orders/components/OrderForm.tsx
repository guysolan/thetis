import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import SelectWarehouse from "../../warehouses/components/SelectWarehouse";
import OrderItems from "@/features/orders/components/OrderItems";
import ItemsTable from "./ItemsTable";
import { ItemView } from "../../items/types";
import Select from "@/components/Select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { Switch } from "@/components/ui/switch";
import { formSchema } from "../schema";
interface OrderFormProps {
	items: ItemView[];
}

export const OrderForm: React.FC<OrderFormProps> = ({ items }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			order_items: [{ item_type: "product", item_id: "", quantity_change: 1 }],
			consumed_items: [],
			produced_items: [], // Add missing default value
			is_build: false,
			order_type: "purchase", // Add default order type
		},
	});

	usePurchaseForm(form.control, form.setValue);

	const itemsSummary = useWatch({
		control: form.control,
		name: "consumed_items",
	});

	// Memoize expensive calculations
	const partIsNegative = useMemo(() => 
		itemsSummary.some((part) => part.quantity_after && part.quantity_after < 0),
		[itemsSummary]
	);

	// Extract form submission logic
	const handleSubmit = useCallback(async (data: z.infer<typeof formSchema>) => {
		try {
			// Add error handling
			// await createOrder(data);
		} catch (error) {
			console.error('Failed to create order:', error);
		}
	}, []);

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex flex-col space-y-4 px-1 pt-2 pr-4"
				>
					<div className="flex justify-between items-center">
						<h2>Order</h2>
						<div className="flex items-center space-x-2">
							<label>Build Order</label>

							<Switch
								checked={form.watch("is_build")}
								onCheckedChange={(checked) =>
									form.setValue("is_build", checked)}
							/>
						</div>
					</div>
					<Select
						name="order_type"
						label="Order Type"
						options={[{ label: "Purchase", value: "purchase" }, {
							label: "Sale",
							value: "sale",
						}]}
					/>
					<SelectWarehouse
						name="warehouse_id"
						label="Warehouse"
					/>

					<Accordion
						type="multiple"
						defaultValue={["produced-items", "order-items"]}
					>
						{form.watch("is_build") && (
							<AccordionItem value="produced-items">
								<AccordionTrigger>
									Produced Items
								</AccordionTrigger>
								<AccordionContent>
									<ItemsTable name="produced_items" />
								</AccordionContent>
							</AccordionItem>
						)}
						<AccordionItem value="order-items">
							<AccordionTrigger>Order Items</AccordionTrigger>
							<AccordionContent>
								<OrderItems showPrice={true} />
							</AccordionContent>
						</AccordionItem>
						{form.watch("is_build") && (
							<AccordionItem value="consumed-items">
								<AccordionTrigger>
									Consumed Items
								</AccordionTrigger>
								<AccordionContent>
									<ItemsTable name="consumed_items" />
									{/* <ItemQuantities items={itemsSummary} /> */}
								</AccordionContent>
							</AccordionItem>
						)}
					</Accordion>

					<Button disabled={partIsNegative} type="submit">
						Create Order
					</Button>
				</form>
			</Form>
			<hr className="my-4" />
		</>
	);
};
