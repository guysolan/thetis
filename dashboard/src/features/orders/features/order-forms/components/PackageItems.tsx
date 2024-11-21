import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import Select from "../../../../../components/Select";
import Input from "../../../../../components/Input";
import { Button } from "../../../../../components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";

interface PackageItemsProps {
    packageIndex: number;
}

const PackageItems = ({ packageIndex }: PackageItemsProps) => {
    const { data: items } = useSelectItemsView();
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `order_items.${packageIndex}.package_items`
    });

    return (
        <div className="border-gray-200 ml-8 pl-4 border-l-2">
            <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-row items-end gap-2">
                        <Select
                            name={`order_items.${packageIndex}.package_items.${index}.item_id`}
                            label="Item"
                            options={items?.map(item => ({
                                label: item.item_name,
                                value: item.item_id
                            })) ?? []}
                        />
                        <Input
                            name={`order_items.${packageIndex}.package_items.${index}.quantity`}
                            label="Quantity"
                            type="number"
                            step="1"
                            min="1"
                        />
                        <Input
                            name={`order_items.${packageIndex}.package_items.${index}.item_price`}
                            label="Price"
                            type="number"
                            step="0.01"
                        />
                        <Input
                            name={`order_items.${packageIndex}.package_items.${index}.item_tax`}
                            label="Tax"
                            type="number"
                            step="0.01"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => remove(index)}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="ghost"
                className="mt-2"
                onClick={() => append({
                    item_id: "",
                    item_type: "product",
                    quantity: 1,
                    item_price: 0,
                    item_tax: 0
                })}
            >
                <PlusIcon className="mr-2 w-5 h-5" />
                Add Item
            </Button>
        </div>
    );
};

export default PackageItems; 