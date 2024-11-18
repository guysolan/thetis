import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";

import dayjs from "dayjs";
import DatePicker from "@/components/DatePicker";

import { OrderView } from "../types";
import Select from "@/components/Select";
import { useUpdateOrder } from "../api/updateOrder";
import { orderTypes } from "../types";

const editOrderSchema = z.object({
	order_type: z.enum(orderTypes),
	order_date: z.coerce.date(),
});

const EditOrderForm = ({ order }: { order: OrderView }) => {
	const form = useForm<z.infer<typeof editOrderSchema>>({
		resolver: zodResolver(editOrderSchema),
		defaultValues: {
			order_date: dayjs().toDate(),
			order_type: order.order_type,
		},
	});

	const { mutate: updateOrder } = useUpdateOrder();

	const handleSubmit = async (formData: z.infer<typeof editOrderSchema>) => {
		console.log(formData);
		await updateOrder({ ...formData, id: order.order_id });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-col space-y-4 px-1 pt-2 pr-4"
			>
				<Select
					options={[
						"sale",
						"shipment",
						"build",
						"purchase",
						"stocktake",
					].map((
						x,
					) => ({ label: x, value: x }))}
					name="order_type"
					label="Order Type"
				/>
				<DatePicker name="order_date" label="Order Date" />
				<Button
					onClick={() => {
						console.log(form.formState.errors);
						console.log(form.getValues());
					}}
					type="submit"
				>
					Update Order
				</Button>
			</form>
		</Form>
	);
};

export default EditOrderForm;
