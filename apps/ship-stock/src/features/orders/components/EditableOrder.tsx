import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import { OrderWithDetails } from "../api/selectOrderById";
import { useUpdateOrder } from "../api/updateOrder";
import DatePicker from "../../../components/DatePicker";
import { ReasonForExportSelect } from "./ReasonForExportSelect";
import { UnitOfMeasurementSelect } from "./UnitOfMeasurement";
import { ModeOfTransportSelect } from "./ModeOfTransportSelect";
const orderSchema = z.object({
    order_type: z.string().optional(),
    order_date: z.string().optional(),
    carriage: z.coerce.number().min(0).optional(),
    currency: z.string().nullable().optional(),
    reason_for_export: z.string().nullable().optional(),
    mode_of_transport: z.string().nullable().optional(),
    incoterms: z.string().nullable().optional(),
    unit_of_measurement: z.string().nullable().optional(),
    shipment_number: z.string().nullable().optional(),
    airwaybill: z.string().nullable().optional(),
    payment_status: z.string().nullable().optional(),
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

const paymentStatusOptions = [
    { label: "Unpaid", value: "unpaid" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
];

export const EditableOrder = ({ order }: EditableOrderProps) => {
    const updateOrder = useUpdateOrder();

    const form = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            order_type: order.order_type,
            order_date: order.order_date.split("T")[0], // Convert to date format
            carriage: order.carriage,
            currency: order.currency,
            reason_for_export: order.reason_for_export,
            mode_of_transport: order.mode_of_transport,
            incoterms: order.incoterms,
            unit_of_measurement: order.unit_of_measurement,
            shipment_number: order.shipment_number,
            airwaybill: order.airwaybill,
            payment_status: order.payment_status,
            reference_number: order.reference_number,
        },
    });

    const onSubmit = async (data: OrderFormData) => {
        await updateOrder.mutateAsync({
            id: order.id,
            ...data,
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
                        {/* Basic Order Info */}
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                            <Select
                                name="order_type"
                                label="Order Type"
                                options={orderTypeOptions}
                            />
                            <DatePicker
                                name="order_date"
                                label="Order Date"
                            />
                            <Input
                                name="carriage"
                                label="Carriage"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>

                        {/* Financial Info */}
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                            <Select
                                name="currency"
                                label="Currency"
                                options={currencyOptions}
                            />
                            <Select
                                name="payment_status"
                                label="Payment Status"
                                options={paymentStatusOptions}
                            />
                            <Input
                                name="reference_number"
                                label="Reference Number"
                                placeholder="Enter reference number"
                            />
                        </div>

                        {/* Shipping Info */}
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
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
                            <ReasonForExportSelect />
                        </div>

                        {/* Trade Info */}
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                            <Input
                                name="incoterms"
                                label="Incoterms"
                                placeholder="Enter incoterms"
                            />
                            <ModeOfTransportSelect />
                            <UnitOfMeasurementSelect />
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
