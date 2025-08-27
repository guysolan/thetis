import { UseFormReturn } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import Select from "@/components/Select";
import ItemTypeSelect from "@/components/ItemTypeSelect";
import { useEffect } from "react";
import NumberFlowCell from "../../components/NumberFlowCell";
import { FormProvider } from "react-hook-form";
import NumberFlow from "@number-flow/react";

interface StocktakeItemsFormFieldsProps {
  name: string;
  fields: any[];
  items: Array<{ item_id: string; item_name: string; item_type: string }>;
  form: UseFormReturn<any>;
}

const StocktakeItemsFormFields = ({
  name,
  fields,
  items,
  form,
}: StocktakeItemsFormFieldsProps) => {
  const allowedTypes = ["part", "product"];

  // Watch all quantity_before and quantity_after values
  const allFieldValues = form.watch(name);

  // Update quantity_change whenever quantity_before or quantity_after changes
  useEffect(() => {
    if (!allFieldValues) return;

    allFieldValues.forEach((item, index) => {
      if (
        item.quantity_before !== undefined &&
        item.quantity_after !== undefined
      ) {
        const quantityBefore = Number(item.quantity_before) || 0;
        const quantityAfter = Number(item.quantity_after) || 0;
        const change = quantityAfter - quantityBefore;

        // Only update if the change value is different to avoid infinite loops
        if (item.quantity_change !== change) {
          form.setValue(`${name}.${index}.quantity_change`, change);
        }
      }
    });
  }, [allFieldValues, form, name]);

  return (
    <FormProvider {...form}>
      <Table>
        <TableHeader>
          <TableRow>
            {allowedTypes.length > 0 && <TableHead>Type</TableHead>}
            <TableHead className="min-w-32">Item</TableHead>
            <TableHead className="min-w-24">Old Quantity</TableHead>
            <TableHead className="min-w-24">Change</TableHead>
            <TableHead className="min-w-24">New Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {allowedTypes.length > 1 && (
                <TableCell>
                  <ItemTypeSelect name={`${name}.${index}.item_type`} />
                </TableCell>
              )}
              <TableCell>
                <Select
                  name={`${name}.${index}.item_id`}
                  options={items
                    ?.filter(
                      (item) =>
                        item.item_type ===
                          form.watch(`${name}.${index}.item_type`),
                    )
                    .map((item) => ({
                      label: item.item_name,
                      value: String(item.item_id),
                    })) || []}
                />
              </TableCell>
              <TableCell className="text-center">
                <NumberFlow
                  value={Number(
                    form.watch(`${name}.${index}.quantity_before`),
                  ) || 0}
                  format={{ style: "decimal", maximumFractionDigits: 0 }}
                />
              </TableCell>
              <TableCell className="text-center">
                <NumberFlow
                  value={Number(
                    form.watch(`${name}.${index}.quantity_change`),
                  ) || 0}
                  format={{ style: "decimal", maximumFractionDigits: 0 }}
                />
              </TableCell>

              {/* New Quantity - Editable */}
              <NumberFlowCell
                name={`${name}.${index}.quantity_after`}
                format={{ style: "decimal", maximumFractionDigits: 0 }}
                editable={true}
                step={1}
                onChange={(value) => {
                  // Calculate and update the change
                  const quantityBefore =
                    Number(form.watch(`${name}.${index}.quantity_before`)) || 0;
                  const quantityAfter = Number(value) || 0;
                  const change = quantityAfter - quantityBefore;

                  form.setValue(`${name}.${index}.quantity_change`, change);
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FormProvider>
  );
};

export default StocktakeItemsFormFields;
