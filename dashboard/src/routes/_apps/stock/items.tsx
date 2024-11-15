import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Sheet from "@/components/Sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ItemComponentsForm from "@/features/items/components/ItemComponentsForm.tsx";
import { useSelectItemsView } from "@/features/items/api/selectItemsView.ts";
import { ItemForm } from "@/features/items/components/ItemForm.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import PageTitle from "@/components/PageTitle.tsx";
import { ItemView } from "@/features/items/types.ts";
import { useDeleteItem } from "@/features/items/api/deleteItem.ts";
import { useDuplicateItem } from "../../../features/items/api/duplicateItem";
import ActionPopover from "@/components/ActionPopover";
import ComponentsTable from "../../../features/items/components/ComponentsTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ItemsPage = () => {
  const { data: itemsView } = useSelectItemsView();
  const { mutate: duplicateItem } = useDuplicateItem();
  const { mutate: deleteItem } = useDeleteItem();

  return (
    <>
      <PageTitle title="Items">
        <Sheet
          trigger={<Button variant="default">New Item</Button>}
          title="Edit"
        >
          <ItemForm item={null} />
        </Sheet>
      </PageTitle>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="my-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="product">Products</TabsTrigger>
          <TabsTrigger value="part">Parts</TabsTrigger>
          <TabsTrigger value="service">Services</TabsTrigger>
          <TabsTrigger value="package">Packages</TabsTrigger>
        </TabsList>

        {["all", "product", "part", "service", "package"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <section className="flex flex-col gap-4">
              {itemsView
                .filter((item) =>
                  tabValue === "all" ? true : item.item_type === tabValue
                )
                .map((item: ItemView) => (
                  <Card key={item.item_id} className="flex flex-col">
                    <CardHeader className="flex flex-row justify-between items-center space-y-0">
                      <div className="flex flex-col flex-wrap gap-4">
                        <CardTitle className="flex flex-row flex-wrap gap-4 font-semibold text-left text-lg text-wrap truncate">
                          {item.item_name}
                          <Badge>{item.item_type}</Badge>
                        </CardTitle>
                        <div className="font-medium text-foreground text-lg">
                          ${Number(item.item_price ?? 0).toFixed(2)}
                          <span className="ml-1 text-muted-foreground text-sm">
                            per unit
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row flex-shrink gap-2">
                        <ActionPopover
                          title={item.item_name}
                          editForm={<ItemForm item={item} />}
                          deleteFunction={() =>
                            deleteItem(item.item_id as number)}
                          onDuplicate={() =>
                            duplicateItem({
                              itemId: {
                                price: item.item_price as number,
                                name: item.item_name,
                                type: item.item_type!,
                              },
                              // @ts-ignore
                              components: item.components,
                            })}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value="specifications"
                          className="border-0"
                        >
                          <AccordionTrigger className="py-2 text-sm hover:no-underline">
                            Specifications
                          </AccordionTrigger>
                          <AccordionContent>
                            <table className="w-full text-sm">
                              <tbody className="divide-y">
                                {item.sku && (
                                  <tr>
                                    <td className="py-2 text-muted-foreground">
                                      SKU
                                    </td>
                                    <td className="py-2">{item.sku}</td>
                                  </tr>
                                )}
                                {(item.height || item.width || item.depth) && (
                                  <tr>
                                    <td className="py-2 text-muted-foreground">
                                      Dimensions
                                    </td>
                                    <td className="py-2">
                                      {item.height}H × {item.width}W ×{" "}
                                      {item.depth}D
                                    </td>
                                  </tr>
                                )}
                                {item.weight > 0 && (
                                  <tr>
                                    <td className="py-2 text-muted-foreground">
                                      Weight
                                    </td>
                                    <td className="py-2">{item.weight} kg</td>
                                  </tr>
                                )}
                                {item.country_of_origin && (
                                  <tr>
                                    <td className="py-2 text-muted-foreground">
                                      Origin
                                    </td>
                                    <td className="py-2">
                                      {item.country_of_origin}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {["product", "package"].includes(item?.item_type ?? "") &&
                        (
                          <>
                            <ComponentsTable components={item.components} />
                            <Sheet
                              trigger={
                                <Button
                                  size="lg"
                                  className="gap-x-2 mt-4 w-full"
                                  variant="secondary"
                                >
                                  <Pencil size={16} />
                                  Edit Components
                                </Button>
                              }
                              title={item.item_name}
                              description={`Make changes to the ${item.item_name} details here. Click save when you're done.`}
                            >
                              <ItemComponentsForm
                                itemId={item.item_id}
                                defaultValues={{
                                  item_components: item.components.map((
                                    ic,
                                  ) => ({
                                    component_quantity: (ic.component_quantity),
                                    item_id: String(item.item_id),
                                    component_id: String(ic.component_id),
                                  })),
                                }}
                              />
                            </Sheet>
                          </>
                        )}
                    </CardContent>
                  </Card>
                ))}
            </section>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_apps/stock/items")({
  component: ItemsPage,
});
