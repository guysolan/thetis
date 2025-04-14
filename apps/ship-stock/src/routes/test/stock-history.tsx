import { createFileRoute } from "@tanstack/react-router";
import { realData } from "../../features/stock-history/realData";
import { StockHistoryTable } from "../../features/stock-history/StockHistoryTable";

export const Route = createFileRoute("/test/stock-history")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <StockHistoryTable inventoryHistory={realData} addressId={3} />
    </div>
  );
}
