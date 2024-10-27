import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { Form } from "@/components/ui/form";
import { useUpsertItem } from "../api/upsertItem";
import { useSelectItemById } from "../api/selectItemById";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ItemView } from "../types";
const itemFormSchema = z.object({
	id: z.number().optional(),
	price: z.number().positive(),
	name: z.string().min(1, "Name required"),
	type: z.enum(["product", "part"]),
});

export type ItemFormT = z.infer<typeof itemFormSchema>;

interface Props {
	item: ItemView | null;
}

export const ItemForm = ({ item }: Props) => {
	const { mutate: upsertItem } = useUpsertItem();

	const form = useForm<ItemFormT>({
		resolver: zodResolver(itemFormSchema),
		defaultValues: {
			id: item?.item_id ?? undefined,
			name: item?.item_name ?? "",
			price: item?.item_price ?? 0,
			type: item?.item_type ?? "product",
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
				<Input label="Name" name="name" type="text" />
				<Input label="Price" name="price" type="number" />
				<Select
					label="Type"
					name="type"
					options={[{ label: "Product", value: "product" }, {
						label: "Part",
						value: "part",
					},{
						label: "Service",
						value: "service",
					}]}
				/>

				<Button type="submit">Save Changes</Button>
			</form>
		</Form>
	);
};
