import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@thetis/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

import { Form } from "@thetis/ui/form";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useUpsertItemComponents } from "../api/upsertItemComponents";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@thetis/ui/table";

import { useSelectItemsView } from "../api/selectItemsView";

const formSchema = z.object({
	item_components: z.array(
		z.object({
			component_quantity: z.coerce.number().min(0, {
				message: "Quantity must be 0 or greater",
			}),
			item_id: z.string().min(1, {
				message: "Parent item is required",
			}),
			component_id: z.string().min(1, {
				message: "Component item is required",
			}),
			component_type: z.string().min(1, {
				message: "Component type is required",
			}),
		}),
	),
});

export type ItemFormData = z.infer<typeof formSchema>;

function ItemComponentsForm({
	itemId,
	defaultValues,
	onSuccess,
}: {
	itemId: number;
	defaultValues?: ItemFormData;
	onSuccess: () => void;
}) {
	const allowedTypes = ["part", "product", "service"];
	const { data: itemsView } = useSelectItemsView();
	const { mutate: upsertItem } = useUpsertItemComponents();

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

	console.log(form.getValues());

	async function onSubmit(values: ItemFormData) {
		const upsertItems = values.item_components.map((item) => ({
			item_id: item.item_id,
			component_id: item.component_id,
			component_quantity: item.component_quantity,
		}));
		// @ts-ignore
		await upsertItem(upsertItems, {
			onSuccess: () => onSuccess(),
		});
	}

	const getFilteredItemOptions = (itemType: string) => {
		return itemsView
			?.filter((item) => item.item_type === itemType)
			.map((ic) => ({
				label: ic.item_name,
				value: String(ic.item_id),
			})) || [];
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 my-4"
			>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Type</TableHead>
							<TableHead>Component</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{fields.map((field, index) => (
							<TableRow key={field.id}>
								<TableCell>
									<Select
										name={`item_components.${index}.component_type`}
										options={allowedTypes.map((type) => ({
											label: type,
											value: type,
										}))}
										onChange={() => {
											form.setValue(
												`item_components.${index}.component_id`,
												"",
											);
										}}
									/>
								</TableCell>
								<TableCell>
									<Select
										name={`item_components.${index}.component_id`}
										options={getFilteredItemOptions(
											form.watch(
												`item_components.${index}.component_type`,
											),
										)}
									/>
								</TableCell>
								<TableCell>
									<Input
										name={`item_components.${index}.component_quantity`}
										type="number"
									/>
								</TableCell>
								<TableCell>
									<Button
										type="button"
										variant="destructive"
										onClick={() => remove(index)}
									>
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
					onClick={() =>
						append({
							component_id: "",
							component_quantity: 1,
							item_id: String(itemId),
							component_type: allowedTypes[0] || "",
						})}
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
