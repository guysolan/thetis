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
import { ScrollArea } from "@/components/ui/scroll-area";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { PartsTable } from "./PartsTable";
import { calculatePartsSummary } from "../utils/partsSummaryCalculator";
const purchaseItemSchema = z.object({
	type: z.enum(["product", "part"]),
	id: z.string().min(1, "Please select an item"),
	quantity: z.number().min(1, "Quantity must be at least 1"),
});

const formSchema = z.object({
	purchaseItems: z.array(purchaseItemSchema).min(1, "Add at least one item"),
	partsSummary: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			partsBefore: z.number(),
			partsChange: z.number(),
			partsAfter: z.number(),
		}),
	),
});

interface PurchaseFormProps {
	products: {
		uuid: string;
		name: string;
		parts: { uuid: string; quantity: number }[];
	}[];
	parts: { uuid: string; name: string; quantity: number }[];
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
	products,
	parts,
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			purchaseItems: [{ type: "product", id: "", quantity: 1 }],
			partsSummary: parts.map((part) => ({
				id: part.uuid,
				name: part.name,
				partsBefore: part.quantity,
				partsChange: 0,
				partsAfter: part.quantity,
			})),
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "purchaseItems",
	});

	// Use useWatch instead of form.watch
	const purchaseItems = useWatch({
		control: form.control,
		name: "purchaseItems",
	});

	const partsSummary = useWatch({
		control: form.control,
		name: "partsSummary",
	});

	useEffect(() => {
		console.log("Effect running, purchaseItems:", purchaseItems);
		const newPartsSummary = calculatePartsSummary(
			purchaseItems,
			products,
			parts,
		);
		console.log("New parts summary:", newPartsSummary);
		form.setValue("partsSummary", newPartsSummary);
	}, [purchaseItems, products, parts]);

	const partIsNegative = partsSummary.some((part) => part.partsAfter < 0);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
					{fields.map((field, index) => (
						<div key={field.id} className="space-y-2 px-1">
							<FormField
								control={form.control}
								name={`purchaseItems.${index}.type`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="product">Product</SelectItem>
												<SelectItem value="part">Part</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`purchaseItems.${index}.id`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{form.watch(`purchaseItems.${index}.type`) === "product"
												? "Product"
												: "Part"}
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={`Select ${
															form.watch(`purchaseItems.${index}.type`) ===
															"product"
																? "product"
																: "part"
														}`}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{form.watch(`purchaseItems.${index}.type`) === "product"
													? products.map((product) => (
															<SelectItem
																key={product.uuid}
																value={product.uuid}
															>
																{product.name}
															</SelectItem>
														))
													: parts.map((part) => (
															<SelectItem key={part.uuid} value={part.uuid}>
																{part.name}
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
								name={`purchaseItems.${index}.quantity`}
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
									type="button"
									onClick={() => remove(index)}
									variant="destructive"
									size="sm"
								>
									Remove
								</Button>
							)}
						</div>
					))}

					<div className="flex gap-2">
						<Button
							type="button"
							variant="secondary"
							size="sm"
							onClick={() => append({ type: "product", id: "", quantity: 1 })}
						>
							Add Product
						</Button>
						<Button
							type="button"
							variant="secondary"
							size="sm"
							onClick={() => append({ type: "part", id: "", quantity: 1 })}
						>
							Add Part
						</Button>
					</div>

					<Button disabled={partIsNegative} type="submit">
						Create Purchase
					</Button>
				</form>
			</Form>
			<hr className="my-4" />
			<PartsTable partsSummary={partsSummary} />
		</>
	);
};
