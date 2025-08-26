import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import { Input } from "@/components/Input";
import { Combobox, ComboboxOption } from "@/components/Combobox";
import { OrderItemChangeWithDetails } from "../api/selectOrderById";
import { useUpdateOrderItemChange } from "../api/updateOrderItemChange";

const orderItemChangeSchema = z.object({
  price: z.coerce.number().min(0).nullable().optional(),
  tax: z.coerce.number().min(0).nullable().optional(),
  lot_number: z.string().nullable().optional(),
  package_item_change_id: z.coerce.number().nullable().optional(),
});

type OrderItemChangeFormData = z.infer<typeof orderItemChangeSchema>;

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
    resolver: zodResolver(orderItemChangeSchema),
    defaultValues: {
      price: orderItemChange.price,
      tax: orderItemChange.tax,
      lot_number: orderItemChange.lot_number,
      package_item_change_id: orderItemChange.package_item_change_id,
    },
  });

  const onSubmit = async (data: OrderItemChangeFormData) => {
    await updateOrderItemChange.mutateAsync({
      order_id: orderItemChange.order_id,
      item_change_id: orderItemChange.item_change_id,
      ...data,
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">
          Order Item: {orderItemChange.item_changes.items.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="lot_number"
                label="Lot Number"
                placeholder="Enter lot number"
              />
              <Combobox
                name="package_item_change_id"
                label="Package Item"
                options={itemOptions}
                placeholder="Select package item..."
                searchPlaceholder="Search packages..."
                emptyMessage="No packages found."
              />
            </div>
            <Button
              type="submit"
              size="sm"
              disabled={updateOrderItemChange.isPending}
            >
              {updateOrderItemChange.isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};