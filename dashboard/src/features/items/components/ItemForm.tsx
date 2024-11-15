import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { Form } from "@/components/ui/form";
import { useUpsertItem } from "../api/upsertItem";
import { ItemType, ItemView } from "../types";
import { itemTypes } from "../types";
import { useFieldVisibilityStore } from "../stores/fieldVisibilityStore";
import { ItemFormFieldsVisibility } from "./ItemFormFieldsVisibility";

const itemFormSchema = z.object({
	id: z.coerce.number().optional(),
	price: z.coerce.number().positive(),
	name: z.string().min(1, "Name required"),
	type: z.enum(itemTypes),
	sku: z.string().optional(),
	country_of_origin: z.string().optional(),
	height: z.coerce.number().optional(),
	width: z.coerce.number().optional(),
	depth: z.coerce.number().optional(),
	weight: z.coerce.number().optional(),
});

export type ItemFormT = z.infer<typeof itemFormSchema>;

interface Props {
	item: ItemView | null;
	itemType?: ItemType;
}

export const ItemForm = ({ item, itemType }: Props) => {
	const { visibility } = useFieldVisibilityStore();
	const { mutate: upsertItem } = useUpsertItem();

	const form = useForm<ItemFormT>({
		resolver: zodResolver(itemFormSchema),
		defaultValues: {
			id: item?.item_id ?? undefined,
			name: item?.item_name ?? "",
			price: item?.item_price ?? 0,
			type: item?.item_type ?? itemType ?? "product",
			sku: item?.sku ?? "",
			country_of_origin: item?.country_of_origin ?? "",
			height: item?.height ?? 0,
			width: item?.width ?? 0,
			depth: item?.depth ?? 0,
			weight: item?.weight ?? 0,
		},
	});

	const onSubmit = (data: ItemFormT) => {
		upsertItem(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 mt-4 p-1"
			>
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-lg">Item Details</h2>
					<ItemFormFieldsVisibility />
				</div>

				<Select
					disabled={!!itemType}
					label="Type"
					name="type"
					options={itemTypes.map((type) => ({
						label: type,
						value: type,
					}))}
				/>
				<Input label="Name" name="name" type="text" />
				<Input label="Price" name="price" type="number" />

				{visibility.sku && <Input label="SKU" name="sku" type="text" />}

				{visibility.countryOfOrigin && (
					<Input
						label="Country of Origin"
						name="country_of_origin"
						type="text"
					/>
				)}

				{visibility.dimensions && (
					<div className="space-y-4">
						<h3 className="font-medium text-sm">
							Dimensions & Weight
						</h3>
						<div className="gap-4 grid grid-cols-2">
							<Input
								label="Height (cm)"
								name="height"
								type="number"
							/>
							<Input
								label="Width (cm)"
								name="width"
								type="number"
							/>
							<Input
								label="Depth (cm)"
								name="depth"
								type="number"
							/>
							<Input
								label="Weight (kg)"
								name="weight"
								type="number"
							/>
						</div>
					</div>
				)}

				<Button type="submit">Save Changes</Button>
			</form>
		</Form>
	);
};
