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

const itemChangeSchema = z.object({
    quantity_change: z.coerce.number().optional(),
    address_id: z.string().nullable().optional().transform((val) =>
        val === "" || val === null ? null : Number(val)
    ),
});

type ItemChangeFormData = z.infer<typeof itemChangeSchema>;

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
        resolver: zodResolver(itemChangeSchema),
        defaultValues: {
            quantity_change: itemChange.quantity_change,
            address_id: itemChange.address_id?.toString() || null,
        },
    });

    const onSubmit = async (data: ItemChangeFormData) => {
        await updateItemChange.mutateAsync({
            id: itemChange.id,
            ...data,
        });
    };

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
