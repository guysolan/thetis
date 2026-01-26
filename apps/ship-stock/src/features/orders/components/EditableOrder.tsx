import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { OrderWithDetails } from "../api/selectOrderById";
import { useUpdateOrder } from "../api/updateOrder";
import DatePicker from "../../../components/DatePicker";
import DateRangePicker from "../../../components/DateRangePicker";
import { ReasonForExportSelect } from "./ReasonForExportSelect";
import { UnitOfMeasurementSelect } from "./UnitOfMeasurement";
import { ModeOfTransportSelect } from "./ModeOfTransportSelect";
import { PaymentStatusSelect } from "./PaymentStatusSelect";
import { DeliveryStatusSelect } from "./DeliveryStatusSelect";
import { IncotermsSelect } from "./IncotermsSelect";

const orderSchema = z.object({
    order_type: z.string().optional(),
    order_date: z.union([z.string(), z.date()]).optional(),
    carriage: z.coerce.number().min(0).optional(),
    currency: z.string().nullable().optional(),
    reason_for_export: z.string().nullable().optional(),
    mode_of_transport: z.string().nullable().optional(),
    incoterms: z.string().nullable().optional(),
    unit_of_measurement: z.string().nullable().optional(),
    shipment_number: z.string().nullable().optional(),
    airwaybill: z.string().nullable().optional(),
    payment_status: z.string().nullable().optional(),
    delivery_status: z.string().nullable().optional(),
    delivery_dates: z.array(z.string()).nullable().optional(),
    reference_number: z.string().nullable().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface EditableOrderProps {
    order: OrderWithDetails;
}

const orderTypeOptions = [
    { label: "Sale", value: "sale" },
    { label: "Purchase", value: "purchase" },
    { label: "Shipment", value: "shipment" },
    { label: "Build", value: "build" },
    { label: "Stocktake", value: "stocktake" },
];

const currencyOptions = [
    { label: "GBP", value: "GBP" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
];

export const EditableOrder = ({ order }: EditableOrderProps) => {
    const updateOrder = useUpdateOrder();

    const form = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            order_type: order.order_type,
            order_date: order.order_date
                ? order.order_date.split("T")[0]
                : undefined,
            carriage: order.carriage,
            currency: order.currency,
            reason_for_export: order.reason_for_export,
            mode_of_transport: order.mode_of_transport,
            incoterms: order.incoterms,
            unit_of_measurement: order.unit_of_measurement,
            shipment_number: order.shipment_number,
            airwaybill: order.airwaybill,
            payment_status: order.payment_status,
            delivery_status: order.delivery_status,
            delivery_dates: order.delivery_dates
                ? (() => {
                    try {
                        const parsed = JSON.parse(order.delivery_dates);
                        if (Array.isArray(parsed) && parsed.length === 2) {
                            return parsed;
                        }
                    } catch (error) {
                        console.warn("Failed to parse delivery_dates:", error);
                    }
                    return undefined;
                })()
                : undefined,
            reference_number: order.reference_number,
        },
    });

    const onSubmit = async (data: OrderFormData) => {
        const formattedData = {
            ...data,
            delivery_dates:
                data.delivery_dates && Array.isArray(data.delivery_dates)
                    ? JSON.stringify(data.delivery_dates)
                    : data.delivery_dates,
        };

        await updateOrder.mutateAsync({
            id: order.id,
            ...formattedData,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Basic Order Information */}
                        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                            <Select
                                name="order_type"
                                label="Order Type"
                                options={orderTypeOptions}
                            />
                            <Input
                                name="carriage"
                                label="Carriage"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                            <Select
                                name="currency"
                                label="Currency"
                                options={currencyOptions}
                            />
                        </div>

                        {/* Financial & Status Information */}
                        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                            <DatePicker
                                name="order_date"
                                label="Order Date"
                            />
                            <DateRangePicker
                                name="delivery_dates"
                                label="Delivery Dates"
                            />
                            <UnitOfMeasurementSelect />
                        </div>

                        {/* Shipping & Documentation */}
                        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                            <Input
                                name="shipment_number"
                                label="Shipment Number"
                                placeholder="Enter shipment number"
                            />
                            <Input
                                name="airwaybill"
                                label="Airwaybill"
                                placeholder="Enter airwaybill number"
                            />
                            <Input
                                name="reference_number"
                                label="Reference Number"
                                placeholder="Enter reference number"
                            />
                        </div>

                        {/* Trade & Export Information */}
                        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                            <ReasonForExportSelect />
                            <IncotermsSelect />
                            <ModeOfTransportSelect />
                        </div>

                        {/* Delivery Information */}
                        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                            {!["stocktake", "shipment"].includes(
                                order.order_type,
                            ) && (
                                <div className="space-y-2">
                                    <label className="font-medium text-sm">
                                        Payment Status
                                    </label>
                                    <PaymentStatusSelect
                                        orderId={order.id}
                                        currentStatus={order.payment_status ||
                                            "unpaid"}
                                    />
                                </div>
                            )}
                            {!["stocktake"].includes(order.order_type) && (
                                <div className="space-y-2">
                                    <label className="font-medium text-sm">
                                        Delivery Status
                                    </label>
                                    <DeliveryStatusSelect
                                        orderId={order.id}
                                        currentStatus={order.delivery_status ||
                                            "pending"}
                                    />
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={updateOrder.isPending}
                            className="w-full md:w-auto"
                        >
                            {updateOrder.isPending
                                ? "Updating..."
                                : "Update Order"}
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};
