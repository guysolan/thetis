import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sheet from "@/components/Sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Copy,
  DotSquare,
  Edit,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import ItemComponentsForm from "@/features/items/components/ItemComponentsForm.tsx";
import { useSelectItemsView } from "@/features/items/api/selectItemsView.ts";
import DeleteDialog from "@/components/DeleteDialog.tsx";
import { ItemForm } from "@/features/items/components/ItemForm.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import PageTitle from "@/components/PageTitle.tsx";
import { ItemView } from "@/features/items/types.ts";
import { SheetClose, SheetFooter } from "@/components/ui/sheet.tsx";
import { useDeleteItem } from "@/features/items/api/deleteItem.ts";
import { useDuplicateItem } from "../../../features/items/api/duplicateItem";
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
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="product">Products</TabsTrigger>
          <TabsTrigger value="part">Parts</TabsTrigger>
          <TabsTrigger value="service">Services</TabsTrigger>
        </TabsList>

        {["all", "product", "part", "service"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <section className="flex flex-col gap-4">
              {itemsView
                .filter((item) =>
                  tabValue === "all" ? true : item.item_type === tabValue
                )
                .map((item: ItemView) => (
                  <Card key={item.item_id} className="flex flex-col">
                    <CardHeader className="flex flex-row justify-between items-center space-y-0">
                      <CardTitle className="flex flex-wrap gap-4 font-semibold text-left text-lg text-wrap truncate">
                        {item.item_name}
                        <Badge>{item.item_type}</Badge>
                      </CardTitle>
                      <div className="flex flex-row flex-shrink gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={20} />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="end"
                            side="bottom"
                            className="flex flex-col gap-1 p-1"
                          >
                            <Button
                              className="justify-start gap-2 px-2"
                              variant="ghost"
                              onClick={() =>
                                duplicateItem({
                                  itemId: {
                                    price: item.item_price,
                                    name: item.item_name,
                                    type: item.item_type!,
                                  },
                                  components: item.components,
                                })}
                            >
                              <Copy size={20} />
                              Duplicate
                            </Button>
                            <Sheet
                              trigger={
                                <Button
                                  className="justify-start gap-2 px-2"
                                  variant="ghost"
                                >
                                  <Edit size={20} />Edit
                                </Button>
                              }
                              title="Edit"
                            >
                              <ItemForm item={item} />
                            </Sheet>
                            <DeleteDialog
                              trigger={
                                <Button
                                  variant="ghost"
                                  className="justify-start gap-2 px-2 text-red-500 hover:text-red-600"
                                >
                                  <Trash2 size={20} />Delete
                                </Button>
                              }
                              deleteFunction={() =>
                                deleteItem(item.item_id as number)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardHeader>
                    {item.item_type === "product" && (
                      <CardContent className="flex-grow">
                        <Table className="mt-4">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Component Name</TableHead>
                              <TableHead>Quantity per Item</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {item.components.map((c: any) => (
                              <TableRow key={String(c.component_id)}>
                                <TableCell>{c.component_name}</TableCell>
                                <TableCell>{c.component_quantity}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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
                              item_components: item.components.map((ic) => ({
                                component_quantity: (ic.component_quantity),
                                item_id: String(item.item_id),
                                component_id: String(ic.component_id),
                              })),
                            }}
                          />
                        </Sheet>
                      </CardContent>
                    )}
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
