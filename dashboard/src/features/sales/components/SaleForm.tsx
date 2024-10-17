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

import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import { OrderSummary } from "./OrderSummary";
import { useProcessOrder } from "../api/processOrder";

const orderItemSchema = z.object({
	id: z.string().min(1, "Product is required"),
	quantity: z.number().min(1, "Quantity must be at least 1"),
});

const formSchema = z.object({
	order_items: z.array(orderItemSchema).min(1, "Add at least one product"),
});

export type OrderFormData = z.infer<typeof formSchema>;

interface OrderFormProps {
	defaultValues: { id: string; name: string }[];
}

export const OrderForm: React.FC<OrderFormProps> = ({
	defaultValues,
}: OrderFormProps) => {
	const { mutate: createOrder } = useProcessOrder();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			order_items: [{ id: "", quantity: 1 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "order_items",
	});

	const orderItems = useWatch({
		control: form.control,
		name: "order_items",
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		createOrder(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="gap-4 grid py-4">
					{fields.map((field, index) => (
						<div key={field.id} className="gap-2 grid px-1">
							<FormField
								control={form.control}
								name={`order_items.${index}.id`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select product" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{defaultValues.map((product) => (
													<SelectItem
														key={product.id}
														value={product.id.toString()}
													>
														{product.name}
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
								name={`order_items.${index}.quantity`}
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
									onClick={() => remove(index)}
									variant="destructive"
									size="sm"
									type="button"
								>
									Remove
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						variant="secondary"
						size="sm"
						onClick={() => append({ id: "", quantity: 1 })}
					>
						Add Product
					</Button>
				</div>
				<OrderSummary orderItems={orderItems} products={defaultValues} />
				<Button type="submit">Create Order</Button>
			</form>
		</Form>
	);
};
