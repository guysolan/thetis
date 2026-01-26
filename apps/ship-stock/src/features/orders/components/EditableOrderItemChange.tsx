import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import Input from "@/components/Input";
import { Combobox, ComboboxOption } from "@/components/Combobox";
import { OrderItemChangeWithDetails } from "../api/selectOrderById";
import { useUpdateOrderItemChange } from "../api/updateOrderItemChange";

// Input schema (what the form uses)
const orderItemChangeInputSchema = z.object({
    price: z.coerce.number().min(0).nullable().optional(),
    tax: z.coerce.number().min(0).nullable().optional(),
    lot_number: z.string().nullable().optional(),
    package_item_change_id: z.string().optional(),
});

// Output schema (what gets sent to API after transformation)
const orderItemChangeSchema = orderItemChangeInputSchema.extend({
    package_item_change_id: z.string().optional().transform((val) =>
        val === "" || val === null || val === undefined ? null : Number(val)
    ),
});

type OrderItemChangeFormData = z.infer<typeof orderItemChangeInputSchema>;

interface EditableOrderItemChangeProps {
    orderItemChange: OrderItemChangeWithDetails;
    orderId: string;
    itemOptions: ComboboxOption[];
}

export const EditableOrderItemChange = ({
    orderItemChange,
    orderId,
    itemOptions,
}: EditableOrderItemChangeProps) => {
    const updateOrderItemChange = useUpdateOrderItemChange(orderId);

    const form = useForm<OrderItemChangeFormData>({
        resolver: zodResolver(orderItemChangeInputSchema),
        defaultValues: {
            price: orderItemChange.price,
            tax: orderItemChange.tax,
            lot_number: orderItemChange.lot_number,
            package_item_change_id:
                orderItemChange.package_item_change_id !== null &&
                    orderItemChange.package_item_change_id !== undefined
                    ? orderItemChange.package_item_change_id.toString()
                    : "",
        },
    });

    const onSubmit = async (data: OrderItemChangeFormData) => {
        // Transform the package_item_change_id from string to number
        const transformedData = {
            ...data,
            package_item_change_id: data.package_item_change_id === "" ||
                    data.package_item_change_id === null ||
                    data.package_item_change_id === undefined
                ? null
                : Number(data.package_item_change_id),
        };

        await updateOrderItemChange.mutateAsync({
            order_id: orderItemChange.order_id,
            item_change_id: orderItemChange.item_change_id,
            ...transformedData,
        });
    };

    // Ensure form is ready before rendering
    if (!form) {
        return <div>Loading form...</div>;
    }

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="text-sm">
                    Order Item: {orderItemChange.item_changes.items.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="gap-4 grid grid-cols-2">
                            <Input
                                name="price"
                                label="Price"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                            <Input
                                name="tax"
                                label="Tax"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="gap-4 grid grid-cols-2">
                            <Input
                                name="lot_number"
                                label="Lot Number"
                                placeholder="Enter lot number"
                            />
                            <Combobox
                                name="package_item_change_id"
                                label="Package Item"
                                options={itemOptions}
                                placeholder="No package item selected"
                                searchPlaceholder="Search packages..."
                                emptyMessage="No packages found."
                            />
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={updateOrderItemChange.isPending}
                        >
                            {updateOrderItemChange.isPending
                                ? "Updating..."
                                : "Update"}
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};
