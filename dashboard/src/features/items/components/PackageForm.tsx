import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useUpsertItemComponents } from "../api/upsertItemComponents";
import { useUpsertItem } from "../api/upsertItem";
import { ItemType, itemTypes, ItemView } from "../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSelectItemsView } from "../api/selectItemsView";

const formSchema = z.object({
    item: z.object({
        id: z.coerce.number().optional(),
        price: z.coerce.number().positive(),
        name: z.string().min(1, "Name required"),
        type: z.literal("package"),
        height: z.coerce.number().min(0, "Height must be positive"),
        width: z.coerce.number().min(0, "Width must be positive"),
        depth: z.coerce.number().min(0, "Depth must be positive"),
        weight: z.coerce.number().min(0, "Weight must be positive"),
    }),
    components: z.array(
        z.object({
            component_quantity: z.coerce.number().min(0),
            component_id: z.string().min(1, "Component item is required"),
        }),
    ),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
    item?: ItemView | null;
}

export function PackageForm({ item }: Props) {
    const { data: itemsView } = useSelectItemsView();
    const { mutate: upsertItem } = useUpsertItem();
    const { mutate: upsertComponents } = useUpsertItemComponents();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item: {
                id: item?.item_id,
                name: item?.item_name ?? "",
                price: item?.item_price ?? 0,
                type: "package",
                height: item?.item_height ?? 0,
                width: item?.item_width ?? 0,
                depth: item?.item_depth ?? 0,
                weight: item?.item_weight ?? 0,
            },
            components: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "components",
    });

    async function handleSubmit() {
        const values = form.getValues();

        // First create/update the item
        const itemResult = await upsertItem(values.item);

        // Then create/update its components
        if (itemResult?.item_id) {
            const componentsWithItemId = values.components.map((component) => ({
                ...component,
                item_id: String(itemResult.item_id),
            }));
            await upsertComponents(componentsWithItemId);
        }
    }

    return (
        <Form {...form}>
            <div className="space-y-8">
                <div className="space-y-4">
                    <h3 className="font-medium text-lg">Package Details</h3>
                    <Input label="Name" name="item.name" type="text" />
                    <Input label="Price" name="item.price" type="number" />

                    <div className="gap-4 grid grid-cols-2">
                        <Input
                            label="Height (cm)"
                            name="item.height"
                            type="number"
                        />
                        <Input
                            label="Width (cm)"
                            name="item.width"
                            type="number"
                        />
                        <Input
                            label="Depth (cm)"
                            name="item.depth"
                            type="number"
                        />
                        <Input
                            label="Weight (kg)"
                            name="item.weight"
                            type="number"
                        />
                    </div>
                </div>

                {/* Components Section */}
                <div className="space-y-4">
                    <h3 className="font-medium text-lg">Package Contents</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Component</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell>
                                        <Select
                                            name={`components.${index}.component_id`}
                                            options={itemsView
                                                ?.filter((ic) =>
                                                    ic.item_type ===
                                                        "product" ||
                                                    ic.item_type === "part"
                                                )
                                                .map((ic) => ({
                                                    label: ic.item_name,
                                                    value: String(ic.item_id),
                                                })) || []}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            name={`components.${index}.component_quantity`}
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                                remove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            append({
                                component_id: "",
                                component_quantity: 1,
                            })}
                    >
                        Add Component
                    </Button>
                </div>

                <Button
                    type="button"
                    disabled={form.formState.isSubmitting}
                    onClick={handleSubmit}
                >
                    {form.formState.isSubmitting ? "Saving..." : "Save Item"}
                </Button>
            </div>
        </Form>
    );
}
