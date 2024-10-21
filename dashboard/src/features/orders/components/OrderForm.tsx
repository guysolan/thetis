import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import SelectWarehouse from "../../warehouses/components/SelectWarehouse";
import OrderItems from "@/components/OrderItems";
import ComponentsTableForm from "./ConsumedComponentsForm";

import { orderItemSchema } from "@/components/OrderItems";

const formSchema = z.object({
	from_warehouse_id: z.string().min(1, "Please select a warehouse"),
	to_warehouse_id: z.string().min(1, "Please select a warehouse"),
	order_items: z.array(orderItemSchema).min(1, "Add at least one item"),
	consumed_components: z.array(
		z.object({
			component_id: z.string(),
			component_name: z.string(),
			quantity_before: z.number(),
			quantity_change: z.number(),
			quantity_after: z.number(),
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
			consumed_components: [],
		},
	});

	const componentsSummary = useWatch({
		control: form.control,
		name: "consumed_components",
	});

	const partIsNegative = componentsSummary.some((part) => part.quantity_after < 0);

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
						name="from_warehouse_id"
						label="Use Components from:"
					/>
					<SelectWarehouse
						name="to_warehouse_id"
						label="Send Items to:"
					/>
					<OrderItems />
					<Button disabled={partIsNegative} type="submit">
						Create Order
					</Button>
				</form>
				<ComponentsTableForm />
			</Form>
			<hr className="my-4" />
		</>
	);
};
