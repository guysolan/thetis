import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import  OrderItems, { orderItemsSchema } from "@/components/OrderItems";

const StockTakeFormSchema = z.object({
    ...orderItemsSchema.shape
});

export type StockTakeFormT = z.infer<typeof StockTakeFormSchema>;

interface Props {
	defaultValues?: StockTakeFormT;
}

export const StockTakeForm = ({ defaultValues }: Props) => {
	const form = useForm<StockTakeFormT>({
		resolver: zodResolver(StockTakeFormSchema),
		defaultValues,
	});

	const onSubmit = (data: StockTakeFormT) => {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-4">
			 	<OrderItems />
				<Button type="submit">Save Changes</Button>
			</form>
		</Form>
	);
};
