import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import SelectWarehouse from "../../inventory/components/SelectWarehouse";
import OrderItems from "@/components/OrderItems";
import PartsTableForm from "./ItemsTableForm";

import { orderItemSchema } from "@/components/OrderItems";

const formSchema = z.object({
	from_warehouse_id: z.string().min(1, "Please select a warehouse"),
	to_warehouse_id: z.string().min(1, "Please select a warehouse"),
	order_items: z.array(orderItemSchema).min(1, "Add at least one item"),
	parts_summary: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			parts_before: z.number(),
			parts_change: z.number(),
			parts_after: z.number(),
		}),
	),
});

export type OrderFormData = z.infer<typeof formSchema>;

interface OrderFormProps {
	items: {
		item_id: string;
		item_name: string;
		item_price: number;
		item_type: string;
		components: {
			component_item_id: string;
			component_name: string;
			quantity: number;
		}[];
	}[];
}

export const OrderForm: React.FC<OrderFormProps> = ({ items }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			order_items: [{ type: "product", id: "", quantity: 1 }],
			parts_summary: items
				.filter((item) => item.item_type === "part")
				.map((part) => ({
					id: part.item_id,
					name: part.item_name,
					parts_before: undefined,
					parts_change: 0,
					parts_after: undefined,
				})),
		},
	});

	const partsSummary = useWatch({
		control: form.control,
		name: "parts_summary",
	});

	const partIsNegative = partsSummary.some((part) => part.parts_after < 0);

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// use database function
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-4 px-1 pt-2"
				>
					<SelectWarehouse
						name="parts_from_warehouse_id"
						label="Use Parts from:"
					/>
					<SelectWarehouse
						name="products_to_warehouse_id"
						label="Send Products to:"
					/>
					<OrderItems />
					<Button disabled={partIsNegative} type="submit">
						Create Order
					</Button>
				</form>
				<PartsTableForm />
			</Form>
			<hr className="my-4" />
		</>
	);
};
