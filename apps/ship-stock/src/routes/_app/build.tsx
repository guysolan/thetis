import { createFileRoute } from "@tanstack/react-router";
import Sheet from "@/components/Sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@thetis/ui/tabs";
import { Button } from "@thetis/ui/button";
import { ItemForm } from "@/features/items/components/ItemForm.tsx";
import LayoutPopover from "../../components/LayoutPopover";
import { itemTypes } from "../../features/items/types";
import Items from "../../features/items/components/Item";
import TabsHeader from "@/components/TabsHeader";

const ItemsPage = () => {
  const tabsList = (
    <>
      <TabsTrigger value="part">Parts</TabsTrigger>
      <TabsTrigger value="product">Products</TabsTrigger>
      <TabsTrigger value="service">Services</TabsTrigger>
      <TabsTrigger value="package">Packages</TabsTrigger>
    </>
  );

  const actionButtons = (
    <Sheet trigger={<Button variant="default">New Item</Button>} title="Edit">
      <ItemForm item={null} />
    </Sheet>
  );

  const optionButtons = <LayoutPopover />;

  return (
    <>
      <Tabs defaultValue="part">
        <TabsHeader
          tabsList={tabsList}
          optionButtons={optionButtons}
          actionButtons={actionButtons}
        />
        {itemTypes.map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <Items itemType={tabValue} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export const Route = createFileRoute("/_app/build")({
  component: ItemsPage,
});
