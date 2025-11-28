import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";
import { useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import { CompaniesAddressesPage } from "@/features/orders/features/multi-order-form/pages/CompaniesAddressesPage";
import { useForm as useTanStackForm } from "@tanstack/react-form";
import { saveOrderCompanies } from "@/features/orders/api/saveOrderPage";
import { toast } from "sonner";
import { companiesAddressesSchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";

const STEPS: Step[] = [
    { number: 1, label: "Details", key: "details" },
    { number: 2, label: "Companies", key: "companies" },
    { number: 3, label: "Items", key: "items" },
    { number: 4, label: "Logistics", key: "logistics" },
];

export const Route = createFileRoute("/home/orders/$orderId/companies")({
    component: RouteComponent,
});

function RouteComponent() {
    const { orderId } = Route.useParams();
    const navigate = useNavigate();

    const { data: order } = useSuspenseQuery({
        queryKey: ["select-order", orderId],
        queryFn: () => selectOrderFormValuesById(orderId),
    });

    const defaultValues = useMemo(() => {
        if (!order?.order_form_values) return undefined;
        return {
            ...order.order_form_values,
            order_type: order.order_form_values.order_type || "sale",
        };
    }, [order?.order_form_values]);

    const form = useTanStackForm({
        defaultValues: defaultValues || {},
    });

    const handleNext = async () => {
        const values = form.state.values;

        // Validate
        const validationResult = companiesAddressesSchema.safeParse(values);
        if (!validationResult.success) {
            const errorMessages = validationResult.error?.errors
                .map((e) => e.message)
                .join(", ");
            toast.error(
                `Please fix validation errors: ${
                    errorMessages || "Invalid data"
                }`,
            );
            return;
        }

        try {
            await saveOrderCompanies(Number(orderId), {
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
            navigate({ to: `/home/orders/${orderId}/items` });
        } catch (error) {
            console.error("Error saving companies:", error);
            toast.error(
                `Failed to save: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`,
            );
        }
    };

    const handlePrevious = () => {
        navigate({ to: `/home/orders/${orderId}/details` });
    };

    const handleStepClick = (stepNumber: number) => {
        const routes = ["details", "companies", "items", "logistics"];
        const route = routes[stepNumber - 1];
        if (stepNumber < 2) {
            // Only allow going back
            navigate({ to: `/home/orders/${orderId}/${route}` });
        }
    };

    return (
        <div className="mx-auto">
            <h1 className="mb-6 font-bold text-2xl">Edit Order</h1>

            <div className="flex flex-col gap-y-6 w-full">
                <OrderFormStepper
                    steps={STEPS}
                    currentStep={2}
                    onStepClick={handleStepClick}
                />

                <div className="flex flex-col gap-y-4">
                    <CompaniesAddressesPage form={form} />
                    <OrderFormNavigation
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                </div>
            </div>
        </div>
    );
}
