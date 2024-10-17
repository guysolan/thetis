import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";

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
import { useUpsertItem } from "../api/upsertItemComponents";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { useSelectItemsView } from '../../items/api/selectItemsView';

const formSchema = z.object({
	item_components: z.array(
		z.object({
			quantity: z.number().min(0, { message: "Quantity must be 0 or greater" }),
			parent_item_id: z.string().min(1, { message: "Parent item is required" }),
			component_item_id: z.string().min(1, { message: "Component item is required" }),
		}),
	),
});

export type ItemFormData = z.infer<typeof formSchema>;

function ItemComponentsForm({
	defaultValues,
}: { defaultValues?: ItemFormData }) {
	const { data: itemComponents } = useSelectItemsView();
	const upsertItem = useUpsertItem();

	const form = useForm<ItemFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			item_components: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "item_components",
	});

	async function onSubmit(values: ItemFormData) {
		try {
			await upsertItem.mutateAsync(values);
			toast.success("Item components updated successfully");
		} catch (error) {
			console.error(error);
			toast.error("Failed to update item components");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 my-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Component</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fields.map((field, index) => (
							<TableRow key={field.id}>
								<TableCell>
									<FormField
										control={form.control}
										name={`item_components.${index}.component_item_id`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{itemComponents?.find(ic => ic.component_item_id === field.value)?.component_name || 'Select component'}</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a component" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{itemComponents?.map((ic) => (
															<SelectItem key={ic.component_item_id} value={String(ic.component_item_id)}>
																{ic.component_name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</TableCell>
								<TableCell>
									<FormField
										control={form.control}
										name={`item_components.${index}.quantity`}
										render={({ field }) => (
											<FormItem>
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
								</TableCell>
								<TableCell>
									<Button type="button" variant="destructive" onClick={() => remove(index)}>
										Remove
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Button
					type="button"
					variant="secondary"
					onClick={() => append({ component_item_id: "", quantity: 1, parent_item_id: defaultValues?.item_components[0]?.parent_item_id || "" })}
				>
					Add Component
				</Button>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}


export default ItemComponentsForm;