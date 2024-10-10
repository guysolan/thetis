import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUpsertProduct } from "../api/upsertProduct";
import { useSelectParts } from "../../parts/api/selectParts";

const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	quantity: z.number().min(0, { message: "Quantity must be 0 or greater" }),
	price: z.number().min(0, { message: "Price must be 0 or greater" }),
	product_parts: z.array(
		z.object({
			part_id: z.string().min(1, { message: "Part is required" }),
			quantity: z.number().min(0, { message: "Quantity must be 1 or greater" }),
		}),
	),
	id: z.number().optional(),
});

export type ProductFormData = z.infer<typeof formSchema>;

export function ProductForm({
	defaultValues,
}: { defaultValues?: ProductFormData }) {
	console.log(defaultValues);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutate: upsertProduct } = useUpsertProduct();
	const { data: parts } = useSelectParts();

	const form = useForm<ProductFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			name: "",
			quantity: 0,
			price: 0,
			product_parts: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "product_parts",
	});

	async function onSubmit(values: ProductFormData) {
		upsertProduct(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter product name" {...field} />
							</FormControl>
							<FormDescription>Enter the name of the product.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter quantity"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormDescription>
								Enter the quantity of the product.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter price"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormDescription>Enter the price of the product.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{fields.map((field, index) => (
					<div key={field.id} className="space-y-4">
						<FormField
							control={form.control}
							name={`product_parts.${index}.part_id`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Part</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a part" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{parts?.map((part) => (
												<SelectItem key={part.id} value={part.id.toString()}>
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
							name={`product_parts.${index}.quantity`}
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
						<Button type="button" onClick={() => remove(index)}>
							Remove Part
						</Button>
					</div>
				))}
				<Button
					type="button"
					variant="secondary"
					onClick={() => append({ part_id: "", quantity: 1 })}
				>
					Add Part
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
