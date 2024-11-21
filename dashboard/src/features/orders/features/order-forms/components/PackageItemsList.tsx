import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "../../../../items/api/selectItemsView";
import Select from "../../../../../components/Select";
import Input from "../../../../../components/Input";
import { Button } from "../../../../../components/ui/button";
import { PlusCircleIcon, TrashIcon } from "lucide-react";

interface PackageItemsListProps {
    packageIndex: number;
}

const PackageItemsList = ({ packageIndex }: PackageItemsListProps) => {
    const { data: items } = useSelectItemsView();
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name: `order_items.${packageIndex}.package_items`,
        control
    });

    return (
        <div className="border-gray-200 mt-2 ml-6 pl-4 border-l-2">
            <h4 className="mb-2 font-medium text-gray-500 text-sm">Package Contents</h4>
            <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex flex-row items-end gap-3 bg-gray-50 p-3 rounded-md"
                    >
                        <Select
                            name={`order_items.${packageIndex}.package_items.${index}.item_id`}
                            label="Item"
                            options={items?.map(item => ({
                                label: item.item_name,
                                value: String(item.item_id),
                                disabled: item.item_type === "package"
                            })) ?? []}
                        />
                        <Select
                            name={`order_items.${packageIndex}.package_items.${index}.item_type`}
                            label="Type"
                            options={[
                                { label: "Product", value: "product" },
                                { label: "Part", value: "part" }
                            ]}
                        />
                        <Input
                            name={`order_items.${packageIndex}.package_items.${index}.quantity`}
                            label="Quantity"
                            type="number"
                            min="1"
                            step="1"
                        />
                        <Input
                            name={`order_items.${packageIndex}.package_items.${index}.item_price`}
                            label="Price"
                            type="number"
                            min="0"
                            step="0.01"
                        />
                        <Input
                            name={`order_items.${packageIndex}.package_items.${index}.item_tax`}
                            label="Tax"
                            type="number"
                            min="0"
                            step="0.01"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                        >
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => append({
                    item_id: "",
                    item_type: "product",
                    quantity: 1,
                    item_price: 0,
                    item_tax: 0
                })}
            >
                <PlusCircleIcon className="mr-2 w-4 h-4" />
                Add Item to Package
            </Button>
        </div>
    );
};

export default PackageItemsList;