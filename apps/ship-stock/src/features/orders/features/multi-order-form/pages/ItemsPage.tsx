import { FormProvider, useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { multiOrderFormSchema as schema } from "../schema";
import SellFormFields from "../SellFormFields";
import BuyFormFields from "../BuyFormFields";
import ShipmentFormFields from "../ShipmentFormFields";
import { SelectField } from "../../../../../components/tanstack-form/SelectField";
import SellPreview from "../SellPreview";
import BuyPreview from "../BuyPreview";
import ShipmentPreview from "../ShipmentPreview";
import EditCard from "../../../../../components/EditCard";
import { FieldGroup } from "@thetis/ui/field";

type ItemsPageProps = {
	form: any; // TanStack Form
};

export function ItemsPage({ form }: ItemsPageProps) {
	const [orderType, setOrderType] = React.useState<string | undefined>(
		undefined,
	);
	const [mode, setMode] = React.useState<"package" | "direct">("package");
	const [orderItems, setOrderItems] = React.useState<any[]>([]);
	const [packageItems, setPackageItems] = React.useState<any[]>([]);
	const [consumedItems, setConsumedItems] = React.useState<any[]>([]);
	const [producedItems, setProducedItems] = React.useState<any[]>([]);
	const [fromItems, setFromItems] = React.useState<any[]>([]);
	const [toItems, setToItems] = React.useState<any[]>([]);

	// Subscribe to form state
	React.useEffect(() => {
		const unsubscribe = form.store.subscribe(() => {
			const values = form.state.values;
			setOrderType(values.order_type);
			setMode(values.mode ?? "package");
			setOrderItems(values.order_items || []);
			setPackageItems(values.package_items || []);
			setConsumedItems(values.consumed_items || []);
			setProducedItems(values.produced_items || []);
			setFromItems(values.from_items || []);
			setToItems(values.to_items || []);
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

	// Get the appropriate preview component based on order type
	const getPreviewContent = () => {
		const safeMode = mode || "direct";

		switch (orderType) {
			case "sale":
				return (
					<SellPreview
						orderItems={orderItems}
						packageItems={packageItems}
						mode={safeMode}
					/>
				);
			case "purchase":
				return (
					<BuyPreview
						orderItems={orderItems}
						producedItems={producedItems}
						consumedItems={consumedItems}
						packageItems={packageItems}
						mode={safeMode}
					/>
				);
			case "shipment":
				return (
					<ShipmentPreview
						fromItems={fromItems}
						toItems={toItems}
						packageItems={packageItems}
						mode={safeMode}
					/>
				);
			default:
				return <div className="text-gray-600 text-sm">Order items</div>;
		}
	};

	// Get the appropriate form fields based on order type
	const getFormFields = () => {
		switch (orderType) {
			case "purchase":
				return <BuyFormFields />;
			case "sale":
				return <SellFormFields />;
			case "shipment":
				return <ShipmentFormFields />;
			default:
				return null;
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-2 font-semibold text-xl">Items</h2>
				<p className="text-gray-600 text-sm">
					Add items to this {orderType || "order"}
				</p>
			</div>

			<FormProvider {...rhfForm}>
				<EditCard
					title={`${
						orderType?.charAt(0).toUpperCase() + orderType?.slice(1)
					} Order`}
					previewContent={getPreviewContent()}
				>
					<FieldGroup className="space-y-4">
						<div className="flex flex-row gap-x-4">
							{orderType !== "sale" && (
								<SelectField
									label="Item Type"
									name="item_type"
									form={form}
									options={["product", "part"].map((type) => ({
										label: type,
										value: type,
									}))}
								/>
							)}
							<SelectField
								label="Package Items?"
								name="mode"
								form={form}
								options={[
									{ label: "Package Mode", value: "package" },
									{ label: "Direct Items", value: "direct" },
								]}
							/>
						</div>

						{getFormFields()}
					</FieldGroup>
				</EditCard>
			</FormProvider>
		</div>
	);
}

