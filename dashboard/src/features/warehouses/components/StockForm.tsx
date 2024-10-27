import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import OrderItems from "@/features/orders/components/OrderItems";
import  {
	OrderItem,
	orderItemsSchema,
} from "@/features/orders/schema";
import { z } from "zod";
import StocktakeDiscrepancy from "./StockDiscrepency";
import useStocktake from '../api/stocktake';

interface Props {
	warehouseId: number;
	orderItems?: OrderItem[];
}

const changeQuantitySchema = z.array(
	z.object({ quantity_change: z.number(), item_id: z.number() }),
);

const stockTakeFormSchema = z.object({
	warehouse_id: z.number(),
	...orderItemsSchema.shape,
	change_quantity: changeQuantitySchema,
});

export type StocktakeFormT = z.infer<typeof stockTakeFormSchema>;

const StocktakeForm = ({ warehouseId, orderItems }: Props) => {

	const {mutate:stocktake} = useStocktake();
	const form = useForm<StocktakeFormT>({
		resolver: zodResolver(stockTakeFormSchema),
		defaultValues: {
			warehouse_id: warehouseId,
			order_items: orderItems || [],
			change_quantity: [],
		},
	});

	console.log(form.getValues());

	const onSubmit = async (formData: StocktakeFormT) => {
		const stocktakeChanges = formData.change_quantity.map((item) => ({
			item_id: item.item_id,
			quantity_change: item.quantity_change,
			warehouse_id: formData.warehouse_id,
		}));
		stocktake(stocktakeChanges);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 mt-4"
			>
				<OrderItems />
				<Button type="submit">Save Changes</Button>
				<StocktakeDiscrepancy />
			</form>
		</Form>
	);
};

export default StocktakeForm;
