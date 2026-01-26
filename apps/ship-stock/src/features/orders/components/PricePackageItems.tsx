import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "../../items/api/selectItemsView";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import { Button } from "@thetis/ui/button";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import PackageItemsList from "./PackageItemsList";

interface PricePackageItemsProps {
    title: string;
    showPrice?: boolean;
    defaultIsExpanded?: boolean;
    allowedTypes?: string[];
    showPackageItems?: boolean;
    packageItemTypes?: string[];
}

const PricePackageItems = ({
    title,
    showPrice = true,
    defaultIsExpanded = true,
    showPackageItems = true,
}: PricePackageItemsProps) => {
    const { control } = useFormContext();
    const { data: packages } = useSelectItemsView();
    const { fields, append, remove } = useFieldArray({
        name: "order_items",
        control,
    });

    const packageOptions =
        packages?.filter((item) => item.item_type === "package")
            .map((pkg) => ({
                label: pkg.item_name,
                value: String(pkg.item_id),
            })) ?? [];

    return (
        <div className="space-y-4">
            <h3 className="font-medium text-lg">{title}</h3>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="bg-white shadow-sm p-4 border rounded-sm"
                    >
                        <div className="flex flex-row items-end gap-1">
                            <Select
                                name={`order_items.${index}.item_id`}
                                label="Package"
                                options={packageOptions}
                            />

                            <Input
                                name={`order_items.${index}.length`}
                                label="Length"
                                type="number"
                                step="1"
                            />
                            <Input
                                name={`order_items.${index}.width`}
                                label="Width"
                                type="number"
                                step="1"
                            />
                            <Input
                                name={`order_items.${index}.depth`}
                                label="Depth"
                                type="number"
                                step="1"
                            />
                            <Input
                                name={`order_items.${index}.depth`}
                                label="Weight"
                                type="number"
                                step="1"
                            />
                            <Input
                                name={`order_items.${index}.quantity_change`}
                                label="Quantity"
                                type="number"
                                step="1"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="px-2"
                                onClick={() => remove(index)}
                            >
                                <TrashIcon size={20} />
                            </Button>
                        </div>

                        {showPackageItems && (
                            <PackageItemsList packageIndex={index} />
                        )}
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                onClick={() =>
                    append({
                        item_type: "package",
                        item_id: "",
                        quantity_change: 1,
                        package_items: [{
                            item_id: "",
                            item_type: "product",
                            quantity: 1,
                            item_price: 0,
                            item_tax: 0,
                        }],
                    })}
            >
                <PlusCircleIcon className="mr-2 w-4 h-4" />
                Add Package
            </Button>
        </div>
    );
};

export default PricePackageItems;
