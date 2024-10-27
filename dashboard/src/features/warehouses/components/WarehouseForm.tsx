import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { Form } from "@/components/ui/form";
import { useUpsertWarehouse } from "../api/upsertWarehouse";

import { WarehouseView } from "../types";

const warehouseFormSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, "Name required"),
});

export type WarehouseFormT = z.infer<typeof warehouseFormSchema>;

interface Props {
	warehouse: WarehouseView | null;
}

export const WarehouseForm = ({ warehouse }: Props) => {
	const { mutate: upsertWarehouse } = useUpsertWarehouse();

	const form = useForm<WarehouseFormT>({
		resolver: zodResolver(warehouseFormSchema),
		defaultValues: {
			id: warehouse?.warehouse_id ?? undefined,
			name: warehouse?.warehouse_name ?? "",
		},
	});

	const onSubmit = (data: WarehouseFormT) => {
		upsertWarehouse(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 mt-4 p-1"
			>
				<Input label="Name" name="name" type="text" />
				<Button type="submit">Save Changes</Button>
			</form>
		</Form>
	);
};
