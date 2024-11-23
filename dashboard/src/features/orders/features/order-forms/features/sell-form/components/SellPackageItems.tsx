import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { Database } from "@/database.types";
import Select from "@/components/Select";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { useEffect } from "react";
import ItemTypeSelect from "@/components/ItemTypeSelect";

interface SellPackageItemsComponentsProps {
    packageIndex: number;
}

const SellPackageItems = ({ packageIndex }: SellPackageItemsComponentsProps) => {
    const { control, setValue, watch, getValues } = useFormContext();
    const { data: items } = useSelectItemsView();

    const { fields, append, remove } = useFieldArray({
        control,
        name: `order_items.${packageIndex}.package_items`,
    });



    const getFilteredItemOptions = () => {
        const options = items?.filter((item) => item.item_type === "product")
            .map((item) => ({
                label: item.item_name || '',
                value: String(item.item_id),
            })) || [];

        console.log('Filtered options:', options);
        return options;
    };

    // Watch both the package items and their individual item_ids
    const currentPackage = watch(`order_items.${packageIndex}`);


    const { data: itemsView } = useSelectItemsView();
    // Watch for package selection changes
    useEffect(() => {
        const packageId = currentPackage.package_id;
        const selectedPackageView = itemsView?.find((iv) => String(iv.item_id) === packageId);

        if (selectedPackageView?.components) {
            // Clear existing package items
            setValue(`order_items.${packageIndex}.package_items`, []);

            // Add new package items
            const packageComponents = selectedPackageView.components;
            packageComponents.forEach((component) => {
                append({
                    item_id: String(component?.component_id),
                    item_type: component?.component_type ?? 'product',
                    item_quantity: component?.component_quantity || 1,
                    item_price: component?.component_price || 0
                });
            });
        }
    }, [currentPackage.item_id]); // Only depend on item_id changes


    return (
        <div className="space-y-4 mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-40">Type</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="w-32">Quantity</TableHead>
                        <TableHead className="w-32">Price</TableHead>
                        <TableHead className="w-16"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => {
                        return (
                            <TableRow key={field.id}>
                                <TableCell>
                                    <ItemTypeSelect
                                        name={`order_items.${packageIndex}.package_items.${index}.item_type`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        name={`order_items.${packageIndex}.package_items.${index}.item_id`}
                                        options={items
                                            ?.filter(
                                                (item) =>
                                                    item.item_type ===
                                                    watch(
                                                        `order_items.${packageIndex}.package_items.${index}.item_type`
                                                    )
                                            )
                                            .map((item) => ({
                                                label: item.item_name || '',
                                                value: String(item.item_id),
                                            })) || []}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        name={`order_items.${packageIndex}.package_items.${index}.quantity_change`}
                                        type="number"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        name={`order_items.${packageIndex}.package_items.${index}.item_price`}
                                        type="number"
                                        step="0.01"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            console.log('Removing item:', index);
                                            remove(index);
                                        }}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                    console.log('Appending new item');
                    append({
                        item_id: "",
                        item_type: "product" as Database['public']['Enums']['item_type'],
                        quantity: 1,
                        price: 0
                    });
                }}
            >
                <Plus className="mr-2 w-4 h-4" />
                Add Product
            </Button>
        </div>
    );
};

export default SellPackageItems;