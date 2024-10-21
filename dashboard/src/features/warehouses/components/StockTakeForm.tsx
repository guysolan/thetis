import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import  OrderItems, { orderItemsSchema, OrderItem } from "@/components/OrderItems";
import { z } from "zod";
import StocktakeDiscrepancy from './StocktakeDiscrepency';
interface Props {
	orderItems?: OrderItem[];
	warehouseId: number;
}

const stockTakeFormSchema = z.object({
	order_items: orderItemsSchema,
	warehouse_id: z.number(),
});

export type StocktakeFormT = z.infer<typeof stockTakeFormSchema>;

 const StocktakeForm = ({ warehouseId, orderItems }: Props) => {
	const form = useForm<OrderItem>({
		resolver: zodResolver(orderItemsSchema),
		defaultValues: {
			warehouse_id: warehouseId,
			order_items: orderItems,
		},
	});

	const onSubmit = (data: OrderItem) => {
		console.log(data);
	}
	 
	 console.log(form.getValues());

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-4">
			 	<OrderItems />
				<Button type="submit">Save Changes</Button>
				<StocktakeDiscrepancy />
			</form>
		</Form>
	);
};

export default StocktakeForm;