import { createFileRoute } from "@tanstack/react-router";

import {
  selectStockpilesQueryOptions,
} from "@/features/stockpiles/api/selectStockpiles";
import Companies from "@/features/companies/components/Companies";

const ItemsPage = () => {
  return <Companies />;
};

export const Route = createFileRoute("/_apps/stock/companies")({
  component: ItemsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(selectStockpilesQueryOptions());
  },
});
