import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import Input from "@/components/Input";
import { Combobox, ComboboxOption } from "@/components/Combobox";
import { OrderItemChangeWithDetails } from "../api/selectOrderById";
import { useUpdateItemChange } from "../api/updateItemChange";

// Input schema (what the form uses)
const itemChangeInputSchema = z.object({
    quantity_change: z.coerce.number().optional(),
    address_id: z.string().optional(),
});

// Output schema (what gets sent to API after transformation)
const itemChangeSchema = itemChangeInputSchema.extend({
    address_id: z.string().optional().transform((val) =>
        val === "" || val === null || val === undefined ? null : Number(val)
    ),
});

type ItemChangeFormData = z.infer<typeof itemChangeInputSchema>;

interface EditableItemChangeProps {
    orderItemChange: OrderItemChangeWithDetails;
    orderId: string;
    addressOptions: ComboboxOption[];
}

export const EditableItemChange = ({
    orderItemChange,
    orderId,
    addressOptions,
}: EditableItemChangeProps) => {
    const updateItemChange = useUpdateItemChange(orderId);
    const itemChange = orderItemChange.item_changes;

    const form = useForm<ItemChangeFormData>({
        resolver: zodResolver(itemChangeInputSchema),
        defaultValues: {
            quantity_change: itemChange.quantity_change,
            address_id: itemChange.address_id?.toString() || "",
        },
    });

    const onSubmit = async (data: ItemChangeFormData) => {
        // Transform the address_id from string to number
        const transformedData = {
            ...data,
            address_id: data.address_id === "" || data.address_id === null ||
                    data.address_id === undefined
                ? null
                : Number(data.address_id),
        };

        await updateItemChange.mutateAsync({
            id: itemChange.id,
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
                    Item Change: {itemChange.items.name}
                </CardTitle>
                <p className="text-muted-foreground text-xs">
                    Current Location:{" "}
                    {itemChange.addresses?.name || "No address"}
                </p>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="gap-4 grid grid-cols-2">
                            <Input
                                name="quantity_change"
                                label="Quantity Change"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                            <Combobox
                                name="address_id"
                                label="Address"
                                options={addressOptions}
                                placeholder="Select address..."
                                searchPlaceholder="Search addresses..."
                                emptyMessage="No addresses found."
                            />
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={updateItemChange.isPending}
                        >
                            {updateItemChange.isPending
                                ? "Updating..."
                                : "Update"}
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};
