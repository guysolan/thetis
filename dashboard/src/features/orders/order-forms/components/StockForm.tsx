import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PriceItems from "@/features/orders/order-forms/components/PriceItems";
import { OrderItem } from "@/features/orders/order-forms/schema";
import { z } from "zod";
import StocktakeDiscrepancy from "./StockDiscrepency";
import { useCreateOrder } from "../../api/createOrder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker";
interface Props {
	stockpileId: number;
	orderItems?: OrderItem[];
}

import { stockTakeFormSchema } from "../schema";

export type StocktakeFormT = z.infer<typeof stockTakeFormSchema>;

const StocktakeForm = ({ stockpileId, orderItems }: Props) => {
	const form = useForm<StocktakeFormT>({
		resolver: zodResolver(stockTakeFormSchema),
		defaultValues: {
			address_id: stockpileId,
			order_type: "stocktake",
			order_items: orderItems || [],
			change_quantity: [],
			order_date: dayjs().toDate(),
		},
	});

	console.log(form.getValues());

	const { mutate: createOrder } = useCreateOrder();

	const onSubmit = async (formData: StocktakeFormT) => {
		const item_changes = formData.change_quantity.map((item) => ({
			item_id: String(item.item_id),
			quantity_change: Number(item.quantity_change),
			item_price: 0,
			item_tax: 0,
			address_id: String(formData.address_id),
		}));

		await createOrder({
			in_order_type: formData.order_type,
			in_order_date: formData.order_date.toISOString(),
			in_order_items: item_changes,
			in_from_company_id: null,
			in_to_company_id: null,
			in_from_billing_address_id: null,
			in_from_shipping_address_id: null,
			in_to_billing_address_id: null,
			in_to_shipping_address_id: null,
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 mt-4"
			>
				<DatePicker name="order_date" label="Order Date" />

				<Card>
					<CardHeader>
						<CardTitle>Stocktake</CardTitle>
					</CardHeader>
					<CardContent>
						<PriceItems />
					</CardContent>
				</Card>
				<Button type="submit">Save Changes</Button>
				<Card>
					<CardHeader>
						<CardTitle>Stock Discrepancy</CardTitle>
					</CardHeader>
					<CardContent>
						<StocktakeDiscrepancy
							control={form.control}
							setValue={form.setValue}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};

export default StocktakeForm;
