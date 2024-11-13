"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Input from "@/components/Input";
import { Form } from "@/components/ui/form";
import { useAddressMutation } from "../api/addressMutation";
import { Checkbox } from "@/components/ui/checkbox";

import { Address } from "../types";

const addressFormSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().min(1, "Name required"),
	line_1: z.string().min(1, "Address line 1 required"),
	line_2: z.string().optional(),
	city: z.string().min(1, "City required"),
	region: z.string().min(1, "Region/State required"),
	code: z.string().min(1, "Postal code required"),
	country: z.string().min(1, "Country required"),
	is_active: z.boolean().default(true),
	holds_stock: z.boolean().default(false),
});

export type addressFormT = z.infer<typeof addressFormSchema>;

interface Props {
	address: Address["Row"] | null;
	operation: "insert" | "upsert";
}

export const AddressForm = ({ address, operation }: Props) => {
	const { mutate: upsertAddress } = useAddressMutation(operation);

	const form = useForm<addressFormT>({
		resolver: zodResolver(addressFormSchema),
		defaultValues: {
			id: address?.id ?? undefined,
			name: address?.name ?? "",
			line_1: address?.line_1 ?? "",
			line_2: address?.line_2 ?? "",
			city: address?.city ?? "",
			region: address?.region ?? "",
			code: address?.code ?? "",
			country: address?.country ?? "",
			is_active: address?.is_active ?? true,
			holds_stock: address?.holds_stock ?? false,
		},
	});

	const onSubmit = (data: addressFormT) => {
		upsertAddress(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 mt-4 p-1"
			>
				<Input label="Name" name="name" type="text" />
				<Input label="Address Line 1" name="line_1" type="text" />
				<Input
					label="Address Line 2 (Optional)"
					name="line_2"
					type="text"
				/>
				<Input label="City" name="city" type="text" />
				<Input label="Region/State" name="region" type="text" />
				<Input label="Postal Code" name="code" type="text" />
				<Input label="Country" name="country" type="text" />
				<div className="flex items-center space-x-2">
					<Checkbox
						id="holds_stock"
						checked={form.watch("holds_stock")}
						onCheckedChange={(checked) =>
							form.setValue("holds_stock", checked as boolean)}
					/>
					<label
						htmlFor="holds_stock"
						className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
					>
						Can the address hold stock?
					</label>
				</div>
				<Button type="submit">Save Changes</Button>
			</form>
		</Form>
	);
};
