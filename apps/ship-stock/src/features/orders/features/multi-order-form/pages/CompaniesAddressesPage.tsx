import BuyerSeller from "../../../../companies/components/BuyerSeller";
import * as React from "react";
import { FormProvider, useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { multiOrderFormSchema as schema } from "../schema";

type CompaniesAddressesPageProps = {
	form: any; // TanStack Form
};

export function CompaniesAddressesPage({ form }: CompaniesAddressesPageProps) {
	const [orderType, setOrderType] = React.useState<string | undefined>(
		undefined,
	);

	React.useEffect(() => {
		const unsubscribe = form.store.subscribe(() => {
			const values = form.state.values;
			setOrderType(values.order_type);
		});
		return unsubscribe;
	}, [form]);

	// Create react-hook-form instance for child components
	const rhfForm = useReactHookForm({
		defaultValues: form.state.values,
		resolver: zodResolver(schema),
		mode: "onChange",
	});

	// Sync TanStack Form to react-hook-form
	const syncingFromTanstack = React.useRef(false);
	const syncingFromRHF = React.useRef(false);

	React.useEffect(() => {
		const unsubscribe = form.store.subscribe(() => {
			if (syncingFromRHF.current) {
				return;
			}
			syncingFromTanstack.current = true;
			rhfForm.reset(form.state.values as any, {
				keepDirty: true,
				keepDirtyValues: true,
				keepErrors: true,
				keepTouched: true,
				keepIsSubmitted: true,
				keepSubmitCount: true,
				keepDefaultValues: true,
			});
			syncingFromTanstack.current = false;
		});
		return unsubscribe;
	}, [form, rhfForm]);

	React.useEffect(() => {
		const subscription = rhfForm.watch((_, info) => {
			const name = info?.name;
			if (!name || syncingFromTanstack.current) {
				return;
			}
			syncingFromRHF.current = true;
			const nextValue = rhfForm.getValues(name as any);
			form.setFieldValue(name as any, nextValue as never, {
				dontValidate: true,
			});
			syncingFromRHF.current = false;
		});
		return () => {
			subscription.unsubscribe?.();
		};
	}, [form, rhfForm]);

	return (
		<FormProvider {...rhfForm}>
			<div className="space-y-6">
				<div>
					<h2 className="mb-2 font-semibold text-xl">
						Companies & Addresses
					</h2>
					<p className="text-gray-600 text-sm">
						Select the companies, addresses, and contacts for this
						order
					</p>
				</div>

				<BuyerSeller isShipment={orderType === "shipment"} />
			</div>
		</FormProvider>
	);
}
