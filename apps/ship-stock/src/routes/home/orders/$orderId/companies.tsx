import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { selectOrderFormValuesById } from "@/features/orders/features/order-history/api/selectOrderViewById";
import { MultiOrderFormData } from "@/features/orders/features/multi-order-form/schema";
import { useMemo } from "react";
import { OrderFormStepper, type Step } from "@/components/OrderFormStepper";
import { OrderFormNavigation } from "@/components/OrderFormNavigation";
import FormErrors from "@/components/FormErrors";
import { CompaniesAddressesPage } from "@/features/orders/features/multi-order-form/pages/CompaniesAddressesPage";
import { useForm, FormProvider } from "react-hook-form";
import { saveOrderCompanies } from "@/features/orders/api/saveOrderPage";
import { toast } from "sonner";
import { companiesAddressesSchema } from "@/features/orders/features/multi-order-form/pages/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useMyCompanyId from "@/features/companies/hooks/useMyCompanyId";

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
    const companyId = useMyCompanyId();

    const { data: order } = useSuspenseQuery({
        queryKey: ["select-order", orderId],
        queryFn: () => selectOrderFormValuesById(orderId),
    });

    const defaultValues = useMemo(() => {
        if (!order?.order_form_values) {
            return {
                company_id: companyId,
            };
        }
        return {
            ...order.order_form_values,
            order_type: order.order_form_values.order_type || "sell",
            company_id: order.order_form_values.company_id || companyId,
        };
    }, [order?.order_form_values, companyId]);

    const form = useForm({
        defaultValues,
        resolver: zodResolver(companiesAddressesSchema),
        mode: "onChange",
    });

    const onSubmit = async (values: MultiOrderFormData) => {
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

    const handleNext = () => {
        form.handleSubmit(onSubmit)();
    };

    const handlePrevious = () => {
        navigate({ to: `/home/orders/${orderId}/details` });
    };

    const handleStepClick = (stepNumber: number) => {
        const routes = ["details", "companies", "items", "logistics"];
        const route = routes[stepNumber - 1];
        if (stepNumber < 2) {
            navigate({ to: `/home/orders/${orderId}/${route}` });
        }
    };

    return (
        <FormProvider {...form}>
            <div className="space-y-6">
                <OrderFormStepper
                    steps={STEPS}
                    currentStep={2}
                    onStepClick={handleStepClick}
                />
                <FormErrors title="Please fix the following:" />
                <CompaniesAddressesPage />
                <OrderFormNavigation
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />
            </div>
        </FormProvider>
    );
}
