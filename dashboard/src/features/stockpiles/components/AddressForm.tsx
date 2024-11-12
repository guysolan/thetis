import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Input from "@/components/Input";
import { Form } from "@/components/ui/form";
import { useUpsertAddress } from "../api/upsertAddress";

import { Address } from "../types";

const addressFormSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().min(1, "Name required"),
});

export type addressFormT = z.infer<typeof addressFormSchema>;

interface Props {
	address: Address['Row'] | null;
}

export const AddressForm = ({ address }: Props) => {
	const { mutate: upsertAddress } = useUpsertAddress();

	const form = useForm<addressFormT>({
		resolver: zodResolver(addressFormSchema),
		defaultValues: {
			id: address?.id ?? undefined,
			name: address?.name ?? "",
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
				<Button type="submit">Save Changes</Button>
			</form>
		</Form>
	);
};
