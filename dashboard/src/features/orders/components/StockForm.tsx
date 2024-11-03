import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import OrderItems from "@/features/orders/components/OrderItems";
import { OrderItem, orderItemsSchema } from "@/features/orders/schema";
import { z } from "zod";
import StocktakeDiscrepancy from "./StockDiscrepency";
import useStocktake from "../../warehouses/api/stocktake";
import { useCreateOrder } from "../api/createOrder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Props {
	warehouseId: number;
	orderItems?: OrderItem[];
}

const changeQuantitySchema = z.array(
	z.object({ quantity_change: z.coerce.number(), item_id: z.coerce.number() }),
);

const stockTakeFormSchema = z.object({
	warehouse_id: z.coerce.number(),
	order_type: z.enum(["stocktake"]),
	...orderItemsSchema.shape,
	change_quantity: changeQuantitySchema,
});

export type StocktakeFormT = z.infer<typeof stockTakeFormSchema>;

const StocktakeForm = ({ warehouseId, orderItems }: Props) => {
	const form = useForm<StocktakeFormT>({
		resolver: zodResolver(stockTakeFormSchema),
		defaultValues: {
			warehouse_id: warehouseId,
			order_type: "stocktake",
			order_items: orderItems || [],
			change_quantity: [],
		},
	});

	console.log(form.getValues());

	const { mutate: order } = useCreateOrder();

	const onSubmit = async (formData: StocktakeFormT) => {
		const stocktakeChanges = formData.change_quantity.map((item) => ({
			item_id: Number(item.item_id),
			quantity_change: Number(item.quantity_change),
			warehouse_id: Number(formData.warehouse_id),
			item_price: 0,
			item_tax: 0,
		}));
		order({ in_order_type: "stocktake", in_order_items: stocktakeChanges });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 mt-4"
			>
				<Card>
					<CardHeader>
						<CardTitle>Stocktake</CardTitle>
					</CardHeader>
					<CardContent>
						<OrderItems />
					</CardContent>
				</Card>
				<Button type="submit">Save Changes</Button>
				<Card>
					<CardHeader>
						<CardTitle>Stock Discrepancy</CardTitle>
					</CardHeader>
					<CardContent>
						<StocktakeDiscrepancy />
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};

export default StocktakeForm;
