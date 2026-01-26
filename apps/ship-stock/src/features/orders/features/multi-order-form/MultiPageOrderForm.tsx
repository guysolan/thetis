import { useForm as useTanStackForm } from "@tanstack/react-form";
import type { z } from "zod";
import * as React from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

import { multiOrderFormSchema as schema } from "./schema";
import { OrderFormStepper, type Step } from "../../../../components/OrderFormStepper";
import { defaultCurrency } from "../../../../constants/currencies";
import useMyCompanyId from "../../../companies/hooks/useMyCompanyId";
import {
	saveOrderDetails,
	saveOrderCompanies,
	saveOrderItems,
	saveOrderPricing,
} from "../../api/saveOrderPage";
import { openDefaultDocument } from "../order-documents/utils/openDefaultDocument";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";
import { CompaniesAddressesPage } from "./pages/CompaniesAddressesPage";
import { ItemsPage } from "./pages/ItemsPage";
import { PricingSummaryPage } from "./pages/PricingSummaryPage";
import {
	orderDetailsSchema,
	companiesAddressesSchema,
	itemsSchema,
	pricingSummarySchema,
} from "./pages/validationSchemas";
import { Button } from "@thetis/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@thetis/ui/alert";
import { AlertCircle } from "lucide-react";

type Schema = z.infer<typeof schema>;

interface MultiPageOrderFormProps {
	orderId?: string;
	defaultOrderType: Schema["order_type"];
	defaultOrderFormValues?: Partial<Schema>;
}

const STEPS: Step[] = [
	{ number: 1, label: "Order Details", key: "details" },
	{ number: 2, label: "Companies & Addresses", key: "companies" },
	{ number: 3, label: "Items", key: "items" },
	{ number: 4, label: "Pricing & Summary", key: "pricing" },
];

export function MultiPageOrderForm({
	orderId,
	defaultOrderType,
	defaultOrderFormValues,
}: MultiPageOrderFormProps) {
	const companyId = useMyCompanyId();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = React.useState(1);
	const [savingOrderId, setSavingOrderId] = React.useState<number | undefined>(
		orderId ? Number.parseInt(orderId) : undefined,
	);
	const [isSaving, setIsSaving] = React.useState(false);
	const [validationErrors, setValidationErrors] = React.useState<
		Array<{ field: string; message: string }>
	>([]);

	// Create stable date references
	const stableOrderDate = React.useMemo(() => new Date(), []);
	const stableDeliveryDates = React.useMemo<[Date, Date]>(() => [
		new Date(),
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	], []);

	const defaultValues = React.useMemo<Schema>(() => {
		const base: Schema = {
			order_form_values: {},
			order_id: null,
			from_company_id: companyId ?? "",
			from_billing_address_id: "",
			from_shipping_address_id: "",
			to_contact_id: "",
			to_company_id: companyId ?? "",
			to_billing_address_id: "",
			to_shipping_address_id: "",
			from_contact_id: "",
			company_id: companyId ?? "",
			item_type: undefined,
			order_date: stableOrderDate,
			order_type: defaultOrderType ?? "sale",
			mode: "package",
			currency: defaultCurrency,
			carriage: 0,
			reference_number: null,
			delivery_dates: stableDeliveryDates,
			reason_for_export: null,
			shipment_number: null,
			airwaybill: null,
			mode_of_transport: null,
			incoterms: null,
			unit_of_measurement: "metric",
			order_items: [],
			consumed_items: [],
			produced_items: [],
			from_items: [],
			to_items: [],
			package_items: [],
		};

		if (!defaultOrderFormValues) {
			return base;
		}

		return {
			...base,
			...defaultOrderFormValues,
			order_type: defaultOrderFormValues.order_type ??
				(defaultOrderType ?? "sale"),
			to_company_id: defaultOrderFormValues.to_company_id ?? base.to_company_id,
			from_company_id: defaultOrderFormValues.from_company_id ??
				base.from_company_id,
			company_id: defaultOrderFormValues.company_id ?? base.company_id,
			delivery_dates: defaultOrderFormValues.delivery_dates ??
				base.delivery_dates,
		};
	}, [
		companyId,
		stableOrderDate,
		stableDeliveryDates,
		JSON.stringify(defaultOrderFormValues),
		defaultOrderType,
	]);

	const form = useTanStackForm({
		defaultValues,
	});

	// Reset form when defaultOrderFormValues changes
	React.useEffect(() => {
		if (
			defaultOrderFormValues &&
			Object.keys(defaultOrderFormValues).length > 0
		) {
			const mergedValues = {
				...defaultValues,
				...defaultOrderFormValues,
			};

			Object.entries(mergedValues).forEach(([key, value]) => {
				form.setFieldValue(key as any, value as never, {
					dontValidate: true,
				});
			});
		}
	}, [JSON.stringify(defaultOrderFormValues), defaultValues, form]);

	// Clear items when order_type changes (only on page 1)
	const previousOrderTypeRef = React.useRef<Schema["order_type"] | null>(null);
	React.useEffect(() => {
		const currentOrderType = form.state.values.order_type;
		const previousOrderType = previousOrderTypeRef.current;

		// Only clear items if we're on page 1 and order_type actually changed
		if (currentPage === 1 && currentOrderType !== previousOrderType) {
			form.setFieldValue("from_items", []);
			form.setFieldValue("to_items", []);
			form.setFieldValue("order_items", []);
			form.setFieldValue("package_items", []);
			form.setFieldValue("consumed_items", []);
			form.setFieldValue("produced_items", []);
			previousOrderTypeRef.current = currentOrderType;
		}
	}, [form.state.values.order_type, currentPage, form]);

	// Handle page navigation
	const handleNext = async () => {
		if (isSaving) return;

		// Validate current page using Zod schemas
		const values = form.state.values;
		let validationResult: { success: boolean; error?: z.ZodError } = {
			success: true,
		};

		try {
			if (currentPage === 1) {
				validationResult = orderDetailsSchema.safeParse(values);
			} else if (currentPage === 2) {
				validationResult = companiesAddressesSchema.safeParse(values);
			} else if (currentPage === 3) {
				validationResult = itemsSchema.safeParse(values);
			} else if (currentPage === 4) {
				validationResult = pricingSummarySchema.safeParse(values);
			}

			if (!validationResult.success && validationResult.error) {
				console.log("Validation failed:", validationResult.error);
				console.log("Form values:", values);
				console.log("Errors:", validationResult.error.errors);
				
				// Set errors on form fields so they display visually
				const formattedErrors: Array<{ field: string; message: string }> = [];
				validationResult.error.errors.forEach((error) => {
					// Get field name from error path - handle both array paths and string paths
					const fieldName = error.path.length > 0 
						? (error.path[0] as string)
						: "unknown";
					
					console.log("Setting error for field:", fieldName, "Path:", error.path, "Message:", error.message);
					
					// Try setting the error directly on the field
					try {
						// TanStack Form stores errors as strings, FieldError handles both strings and objects
						form.setFieldMeta(fieldName as any, (prev: any) => {
							console.log("Previous meta for", fieldName, ":", prev);
							const newMeta = {
								...prev,
								errors: [error.message],
							};
							console.log("New meta for", fieldName, ":", newMeta);
							return newMeta;
						});
						
						// Also try to validate the field to trigger error display
						form.validateField(fieldName as any, "change");
					} catch (err) {
						console.error("Error setting field meta:", err);
					}

					// Format field name for display
					const displayField = error.path
						.map((part) =>
							String(part)
								.replace(/_/g, " ")
								.replace(/([A-Z])/g, " $1")
								.replace(/^\w/, (c) => c.toUpperCase())
								.replace(/\b\w/g, (c) => c.toUpperCase())
								.trim(),
						)
						.join(" › ");

					formattedErrors.push({
						field: displayField,
						message: error.message,
					});
				});

				setValidationErrors(formattedErrors);
				console.log("Set validation errors:", formattedErrors);
				console.log("validationErrors state should now have", formattedErrors.length, "errors");

				const errorMessages = validationResult.error.errors
					.map((e) => e.message)
					.join(", ");
				toast.error(
					`Please fix validation errors: ${errorMessages || "Invalid data"}`,
				);
				return;
			}

			// Clear validation errors on successful validation
			setValidationErrors([]);
		} catch (error) {
			console.error("Validation error:", error);
			toast.error("Please fix validation errors before continuing");
			return;
		}

		setIsSaving(true);

		try {
			const values = form.state.values;

			// Save current page data
			if (currentPage === 1) {
				// Page 1: Save order details
				const orderId = await saveOrderDetails({
					order_type: values.order_type,
					order_date: values.order_date,
					currency: values.currency,
					delivery_dates: values.delivery_dates,
					unit_of_measurement: values.unit_of_measurement,
					orderId: savingOrderId,
				});
				setSavingOrderId(orderId);
				toast.success("Order details saved");
				setCurrentPage(2);
			} else if (currentPage === 2) {
				// Page 2: Save companies & addresses
				if (!savingOrderId) {
					throw new Error("Order ID is required");
				}
				await saveOrderCompanies(savingOrderId, {
					from_company_id: values.from_company_id,
					to_company_id: values.to_company_id,
					from_billing_address_id: values.from_billing_address_id,
					from_shipping_address_id: values.from_shipping_address_id,
					to_billing_address_id: values.to_billing_address_id,
					to_shipping_address_id: values.to_shipping_address_id,
					from_contact_id: values.from_contact_id,
					to_contact_id: values.to_contact_id,
					company_id: values.company_id,
				});
				toast.success("Companies & addresses saved");
				setCurrentPage(3);
			} else if (currentPage === 3) {
				// Page 3: Save items
				if (!savingOrderId) {
					throw new Error("Order ID is required");
				}
				await saveOrderItems(savingOrderId, values);
				toast.success("Items saved");
				setCurrentPage(4);
			} else if (currentPage === 4) {
				// Page 4: Save pricing & complete
				if (!savingOrderId) {
					throw new Error("Order ID is required");
				}
				await saveOrderPricing(savingOrderId, {
					carriage: values.carriage,
					shipment_number: values.shipment_number,
					airwaybill: values.airwaybill,
					mode_of_transport: values.mode_of_transport,
					incoterms: values.incoterms,
					reason_for_export: values.reason_for_export,
					reference_number: values.reference_number,
				});
				toast.success("Order completed successfully");
				// Navigate to orders list or open document
				if (savingOrderId) {
					openDefaultDocument(savingOrderId, values.order_type);
				}
				navigate({ to: "/home/orders" });
			}
		} catch (error) {
			console.error("Error saving page:", error);
			toast.error(`Failed to save: ${error instanceof Error ? error.message : "Unknown error"}`);
		} finally {
			setIsSaving(false);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 1 && !isSaving) {
			setValidationErrors([]);
			setCurrentPage(currentPage - 1);
		}
	};

	const handleStepClick = (stepNumber: number) => {
		if (isSaving) return;
		// Only allow navigating to completed steps (steps before current)
		if (stepNumber < currentPage) {
			setValidationErrors([]);
			setCurrentPage(stepNumber);
		}
	};

	// Get current page component
	const renderCurrentPage = () => {
		switch (currentPage) {
			case 1:
				return <OrderDetailsPage form={form} />;
			case 2:
				return <CompaniesAddressesPage form={form} />;
			case 3:
				return <ItemsPage form={form} />;
			case 4:
				return <PricingSummaryPage form={form} />;
			default:
				return <div>Invalid page</div>;
		}
	};

	return (
		<div className="flex flex-col gap-y-6 w-full">
			<OrderFormStepper
				steps={STEPS}
				currentStep={currentPage}
				onStepClick={handleStepClick}
			/>

			{validationErrors.length > 0 && (
				<Alert variant="destructive">
					<AlertCircle className="w-4 h-4" />
					<AlertTitle>Validation Errors</AlertTitle>
					<AlertDescription>
						<ul className="space-y-1 mt-2 pl-4 list-disc">
							{validationErrors.map((error, index) => (
								<li key={index}>
									<span className="font-medium">{error.field}:</span>{" "}
									{error.message}
								</li>
							))}
						</ul>
					</AlertDescription>
				</Alert>
			)}

			<div className="flex flex-col gap-y-4">
				{renderCurrentPage()}

				<div className="flex justify-between items-center gap-4 pt-4 border-t">
					<Button
						type="button"
						variant="outline"
						onClick={handlePrevious}
						disabled={currentPage === 1 || isSaving}
					>
						Previous
					</Button>
					<Button
						type="button"
						onClick={handleNext}
						disabled={isSaving}
					>
						{isSaving
							? "Saving..."
							: currentPage === 4
								? "Complete Order"
								: "Next"}
					</Button>
				</div>
			</div>
		</div>
	);
}

