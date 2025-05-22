import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@thetis/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@thetis/ui/form";
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
} from "@thetis/ui/table";
import { useSelectItemsView } from "../api/selectItemsView";
import ItemTypeSelect from "../../../components/ItemTypeSelect";
import { Trash } from "lucide-react";
import { Checkbox } from "@thetis/ui/checkbox";

const formSchema = z.object({
  item: z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, "Name required"),
    type: z.literal("package"),
    height: z.coerce.number().min(0, "Height must be positive"),
    width: z.coerce.number().min(0, "Width must be positive"),
    depth: z.coerce.number().min(0, "Depth must be positive"),
    weight: z.coerce.number().min(0, "Weight must be positive"),
    price: z.coerce.number().min(0, "Price must be positive").optional(),
  }),
  components: z.array(
    z.object({
      component_quantity: z.coerce.number().min(0),
      component_id: z.string().min(1, "Component item is required"),
      item_type: z.enum(["product", "part"]).optional(),
    }),
  ),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  item?: ItemView | null;
  showComponents?: boolean;
  onSave?: (updatedPackage: { id: number; name: string }) => void;
}

export function PackageForm({ item, showComponents = true, onSave }: Props) {
  const { data: itemsView } = useSelectItemsView();
  const upsertItem = useUpsertItem();
  const { mutate: upsertComponents } = useUpsertItemComponents();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: {
        id: item?.item_id ? Number(item.item_id) : undefined,
        name: item?.item_name ?? "",
        type: "package",
        height: item?.height ?? 0,
        width: item?.width ?? 0,
        depth: item?.depth ?? 0,
        weight: item?.weight ?? 0,
        price: item?.price ?? 0,
      },
      components:
        item?.components?.map((comp) => ({
          component_id: String(comp.component_id),
          component_quantity: comp.component_quantity,
          item_type: comp.component_type as "product" | "part",
        })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "components",
  });

  async function onSubmit(values: FormData) {
    try {
      // First create/update the item
      const itemResult = await upsertItem.mutateAsync({
        ...values.item,
        price: values.item.price ?? 0,
      });

      // Then create/update its components
      const componentsWithItemId = values.components.map((component) => ({
        component_id: Number(component.component_id),
        component_quantity: component.component_quantity,
        item_id: Number(itemResult.id),
      }));

      await upsertComponents(componentsWithItemId);

      // Call onSave callback if provided
      if (onSave) {
        onSave({
          id: Number(itemResult.id),
          name: values.item.name,
        });
      }
    } catch (error) {
      console.error("Error saving package:", error);
    }
  }

  const itemId = form.watch("item.id");
  console.log(itemId);
  return (
    <Form {...form}>
      <form className="px-1">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Package Details</h3>
            <Input label="Name" name="item.name" type="text" />

            <div className="gap-4 grid grid-cols-2">
              <Input label="Height (cm)" name="item.height" type="number" />
              <Input label="Width (cm)" name="item.width" type="number" />
              <Input label="Depth (cm)" name="item.depth" type="number" />
              <Input label="Weight (kg)" name="item.weight" type="number" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Type</TableHead>
                <TableHead>Component</TableHead>
                <TableHead className="w-20">Quantity</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <Select
                      name={`components.${index}.item_type`}
                      options={[
                        { label: "Product", value: "product" },
                        { label: "Part", value: "part" },
                      ]}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      name={`components.${index}.component_id`}
                      options={
                        itemsView
                          ?.filter(
                            (ic) =>
                              ic.item_type ===
                              form.watch(`components.${index}.item_type`),
                          )
                          .map((ic) => ({
                            label: ic.item_name,
                            value: String(ic.item_id),
                          })) || []
                      }
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
                      variant="ghost"
                      size="icon"
                      className="py-1"
                      // variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <span className="sr-only">Remove</span>
                      <Trash size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm"
                    onClick={() =>
                      append({
                        component_id: "",
                        component_quantity: 1,
                        item_type: "product",
                      })
                    }
                  >
                    Add Component
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex gap-2">
            {!!itemId && (
              <Button
                type="button"
                disabled={form.formState.isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save Item"}
              </Button>
            )}
            <Button
              type="button"
              variant={itemId ? "secondary" : "default"}
              disabled={form.formState.isSubmitting}
              onClick={() => {
                form.setValue("item.id", undefined);
                form.handleSubmit(onSubmit)();
              }}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save As New"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
