import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Input from "@/components/Input";
import { Form } from "@/components/ui/form";
import { useAddressMutation } from "../api/addressMutation";
import { Checkbox } from "@/components/ui/checkbox";

import { Address } from "../types";
import { useSelectCompanies } from "../../companies/api/selectCompanies";
import { useCompanyAddressMutation } from "../../companies/api/companyAddressMutation";
import Select from "@/components/Select";

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
	company_id: z.string().optional(),
});

export type addressFormT = z.infer<typeof addressFormSchema>;

interface Props {
	companyId?: number;
	address: Address["Row"] | null | {
		id: number;
		name: string | null;
		line_1?: string | null;
		line_2?: string | null;
		city?: string | null;
		region?: string | null;
		code?: string | null;
		country?: string | null;
		is_active?: boolean | null;
		holds_stock?: boolean | null;
	};
	operation: "insert" | "upsert";
}

export default function AddressForm({ address, operation, companyId }: Props) {
	const { data: companies = [] } = useSelectCompanies();
	const { mutate: upsertAddress } = useAddressMutation(operation);
	const { mutate: companyAddressMutation } = useCompanyAddressMutation(
		operation,
	);

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
			company_id: companyId?.toString() ?? "",
		},
	});

	const onSubmit = (data: addressFormT) => {
		if (data.company_id) {
			const companyId = parseInt(data.company_id);
			data.company_id = undefined;
			companyAddressMutation({
				address: data,
				companyId: companyId,
			});
		} else {
			upsertAddress(data);
		}
	};

	return (
		<Form {...form}>
			<form
				id="address-form"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 mt-4 p-1"
			>
				<Select
					name="company_id"
					label="Company"
					options={companies.map((company) => ({
						value: company.id.toString(),
						label: company.name,
					}))}
				/>

				<Input label="Care of" name="name" type="text" />
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
				<Button
					form="address-form"
					type="button"
					onClick={() => form.handleSubmit(onSubmit)()}
				>
					Save Changes
				</Button>
			</form>
		</Form>
	);
}
