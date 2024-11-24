import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ItemForm } from "@/features/items/components/ItemForm.tsx";
import LayoutPopover from '../../../components/LayoutPopover';
import ItemCards from '../../../features/items/components/ItemCards';
import { itemTypes } from '../../../features/items/types';
import Items from '../../../features/items/components/Item';
const ItemsPage = () => {
  return (
    <>
      <Tabs defaultValue="part">
        <div className="flex justify-between items-center mb-4">

          <TabsList>
            <TabsTrigger value="part">Parts</TabsTrigger>
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="service">Services</TabsTrigger>
            <TabsTrigger value="package">Packages</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <LayoutPopover />
            <Sheet
              trigger={<Button variant="default">New Item</Button>}
              title="Edit"
            >
              <ItemForm item={null} />
            </Sheet>
          </div>
        </div>
        {itemTypes.map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Items itemType={tabValue} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_apps/stock/items")({
  component: ItemsPage,
});
