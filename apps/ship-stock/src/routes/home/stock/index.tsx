import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Sheet from "@/components/Sheet";
import { selectStockpilesQueryOptions } from "@/features/stockpiles/api/selectStockpiles";
import { Button } from "@thetis/ui/button";
import AmazonStock from "@/features/stockpiles/components/AmazonWarehouses";
import { Tabs, TabsContent, TabsTrigger } from "@thetis/ui/tabs";
import Stockpiles from "@/features/stockpiles/components/Stockpiles";
import StocktakeForm from "@/features/orders/features/stocktake-form/StocktakeForm";
import TabsHeader from "@/components/TabsHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { useSelectStockpiles } from "@/features/stockpiles/api/selectStockpiles";
import { StockpileView } from "@/features/stockpiles/types";
import { useSelectInventoryHistory } from "@/features/stock-history/api/selectInventoryHistory";
import { getCurrentQuantity } from "@/features/stock-history/utils";
import StockCheckDialog from "@/components/StockCheckDialog";

interface StockpileItem {
  item_id: number;
  item_name: string;
  item_type: string;
  item_quantity: number;
  item_value: number;
}

const ItemsPage = () => {
  const { data: stockpiles } = useSelectStockpiles();
  const { data: inventoryHistory } = useSelectInventoryHistory();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="stockpiles">
        <TabsHeader
          tabsList={
            <>
              <TabsTrigger value="stockpiles">Stockpiles</TabsTrigger>
              <TabsTrigger value="amazon">Amazon</TabsTrigger>
            </>
          }
        />
        <TabsContent value="stockpiles">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
            {stockpiles?.map((stockpile: StockpileView) => {
              const items = (stockpile.items as unknown as StockpileItem[]) ||
                [];
              return (
                <Card key={stockpile.stockpile_id}>
                  <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                    <CardTitle className="font-bold text-xl">
                      {stockpile.stockpile_name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <StockCheckDialog
                        addressId={stockpile.stockpile_id?.toString() || ""}
                        stockpileName={stockpile.stockpile_name || ""}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate({
                            to: "/home/stock/history/$addressId",
                            params: {
                              addressId: stockpile.stockpile_id?.toString() ||
                                "",
                            },
                          })}
                      >
                        View History
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-gray-500 text-sm">
                        {stockpile.stockpile_address}
                      </div>
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        {items
                          .filter((item) => {
                            const currentQuantity = getCurrentQuantity(
                              item.item_id,
                              inventoryHistory || [],
                              stockpile.stockpile_id,
                            );
                            return currentQuantity > 0;
                          })
                          .map((item) => {
                            const currentQuantity = getCurrentQuantity(
                              item.item_id,
                              inventoryHistory || [],
                              stockpile.stockpile_id,
                            );
                            return (
                              <div
                                key={item.item_id}
                                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                              >
                                <div>
                                  <div className="font-medium">
                                    {item.item_name}
                                  </div>
                                  <div className="text-gray-500 text-sm">
                                    {item.item_type}
                                  </div>
                                </div>
                                <div className="font-semibold text-lg">
                                  {currentQuantity}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="amazon">
          <AmazonStock />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const Route = createFileRoute("/home/stock/")({
  component: ItemsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(selectStockpilesQueryOptions());
  },
});
