import { useForm as useTanStackForm } from "@tanstack/react-form";
import { FormProvider, useForm as useReactHookForm } from "react-hook-form";
import type { z } from "zod";
import { FieldGroup } from "@thetis/ui/field";

import { useCreateOrder } from "../../api/createOrder";
import { multiOrderFormSchema as schema } from "./schema";
import BuyerSeller from "../../../companies/components/BuyerSeller";
import OrderDetailsTanStack from "../../components/tanstack-form/OrderDetailsTanStack";
import { SelectField } from "../../../../components/tanstack-form/SelectField";
import SellFormFields from "./SellFormFields";
import { defaultCurrency } from "../../../../constants/currencies";
import BuyFormFields from "./BuyFormFields";
import PriceSummary from "../../components/PriceSummary";
import ShipmentFormFields from "./ShipmentFormFields";
import { Button } from "@thetis/ui/button";
import useMyCompanyId from "../../../companies/hooks/useMyCompanyId";
import OrderCarriage from "../../components/OrderCarriage";
import EditCard from "../../../../components/EditCard";
import SellPreview from "./SellPreview";
import BuyPreview from "./BuyPreview";
import ShipmentPreview from "./ShipmentPreview";
import { useEffect, useRef } from "react";
import * as React from "react";
import { FieldError } from "@thetis/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";

type Schema = z.infer<typeof schema>;

interface MultiOrderFormTanStackProps {
    orderId?: string;
    defaultOrderType: Schema["order_type"];
    defaultOrderFormValues?: Partial<Schema>;
}

export function MultiOrderFormTanStack({
    orderId,
    defaultOrderType,
    defaultOrderFormValues,
}: MultiOrderFormTanStackProps) {
    const companyId = useMyCompanyId();

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
            to_company_id: defaultOrderFormValues.to_company_id ??
                base.to_company_id,
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
        // Note: Schema validation may need adjustment for TanStack Form compatibility
        // validators: {
        //     onChange: schema,
        // },
    });

    const rhfForm = useReactHookForm<Schema>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    const syncingFromTanstack = React.useRef(false);
    const syncingFromRHF = React.useRef(false);

    // Reset both forms when defaultOrderFormValues changes (e.g., when editing an existing order)
    React.useEffect(() => {
        if (
            defaultOrderFormValues &&
            Object.keys(defaultOrderFormValues).length > 0
        ) {
            const mergedValues = {
                ...defaultValues,
                ...defaultOrderFormValues,
            };

            // Log to debug
            console.log("🔄 Resetting forms with values:", {
                order_items: mergedValues.order_items,
                package_items: mergedValues.package_items,
                mode: mergedValues.mode,
            });

            syncingFromTanstack.current = true;
            syncingFromRHF.current = true;

            // Reset both forms with the new values
            rhfForm.reset(mergedValues as Schema, {
                keepDefaultValues: false,
            });

            // Reset TanStack form by setting each field value
            Object.entries(mergedValues).forEach(([key, value]) => {
                form.setFieldValue(key as any, value as never, {
                    dontValidate: true,
                });
            });

            syncingFromTanstack.current = false;
            syncingFromRHF.current = false;
        }
    }, [JSON.stringify(defaultOrderFormValues), defaultValues, form, rhfForm]);

    React.useEffect(() => {
        const unsubscribe = form.store.subscribe(() => {
            if (syncingFromRHF.current) {
                return;
            }

            syncingFromTanstack.current = true;
            rhfForm.reset(form.state.values as Schema, {
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

            if (!name) {
                return;
            }

            if (syncingFromTanstack.current) {
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

    // Subscribe to form state
    const [orderType, setOrderType] = React.useState<Schema["order_type"]>(
        defaultOrderType ?? "sale",
    );
    const [mode, setMode] = React.useState<"package" | "direct">("package");
    const [orderItems, setOrderItems] = React.useState<any[]>([]);
    const [packageItems, setPackageItems] = React.useState<any[]>([]);
    const [consumedItems, setConsumedItems] = React.useState<any[]>([]);
    const [producedItems, setProducedItems] = React.useState<any[]>([]);
    const [fromItems, setFromItems] = React.useState<any[]>([]);
    const [toItems, setToItems] = React.useState<any[]>([]);

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

    const previousOrderTypeRef = useRef<Schema["order_type"] | null>(null);

    useEffect(() => {
        const previousOrderType = previousOrderTypeRef.current;
        if (orderType !== previousOrderType) {
            form.setFieldValue("from_items", []);
            form.setFieldValue("to_items", []);
            form.setFieldValue("order_items", []);
            form.setFieldValue("package_items", []);
            form.setFieldValue("consumed_items", []);
            form.setFieldValue("produced_items", []);
            previousOrderTypeRef.current = orderType;
        }
    }, [orderType, form]);

    const { mutate: createOrder } = useCreateOrder(orderType);

    const scrollToTop = () => {
        document.getElementById("order-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await form.handleSubmit();
            const values = rhfForm.getValues();

            console.log(
                "🚀 MultiOrderFormTanStack - handleSubmit - RAW data:",
                values,
            );
            await createOrder({
                ...values,
                id: orderId ? Number.parseInt(orderId) : undefined,
            });
        } catch (error) {
            console.error("Form submission failed:", error);
            scrollToTop();
        }
    };

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

    // Get form errors for display
    const formErrors = form.state.errors;

    return (
        <FormProvider {...rhfForm}>
            <form
                id="order-form"
                className="flex flex-col gap-y-4 px-1 w-full overflow-x-scroll"
                onSubmit={handleSubmit}
            >
                <OrderDetailsTanStack form={form} />
                <BuyerSeller isShipment={orderType === "shipment"} />

                <EditCard
                    title={`${
                        orderType?.charAt(0).toUpperCase() + orderType?.slice(1)
                    } Order`}
                    previewContent={getPreviewContent()}
                >
                    <FieldGroup className="space-y-4">
                        <div className="flex flex-row gap-x-4">
                            <SelectField
                                label="Order Type"
                                name="order_type"
                                form={form}
                                options={["purchase", "sale", "shipment"].map((
                                    type,
                                ) => ({
                                    label: type,
                                    value: type,
                                }))}
                            />
                            {orderType !== "sale" && (
                                <SelectField
                                    label="Item Type"
                                    name="item_type"
                                    form={form}
                                    options={["product", "part"].map((
                                        type,
                                    ) => ({
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
                <OrderCarriage />

                <PriceSummary />

                {formErrors.length > 0 && (
                    <div className="space-y-2">
                        {formErrors.map((error: any, index: number) => (
                            <FieldError
                                key={index}
                                errors={[{ message: String(error) }]}
                            />
                        ))}
                    </div>
                )}
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
}
