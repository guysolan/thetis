import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AuthOutlet from "../features/auth/AuthOutlet";
import SidebarContent from "../features/navigation/Sidebar";
import TopBar from "../features/navigation/TopBar";
import { Sheet, SheetContent } from "@thetis/ui/sheet";
import { selectAmazonInventoryQueryOptions } from "@/features/amazon/selectAmazonInventory";
import { selectStockpilesQueryOptions } from "@/features/stockpiles/api/selectStockpiles";
import { selectInventoryHistoryQueryOptions } from "@/features/stock-history/api/selectInventoryHistory";

export const Route = createFileRoute("/home")({
  component: RootComponent,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(selectAmazonInventoryQueryOptions());
    await Promise.all([
      context.queryClient.ensureQueryData(selectStockpilesQueryOptions()),
      context.queryClient.ensureQueryData(selectInventoryHistoryQueryOptions()),
    ]);
  },
});

function RootComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-raleway text-zinc-800 text-left">
      {/* Desktop sidebar */}
      <aside className="hidden top-0 sticky md:flex bg-sidebar border-border border-r w-56 h-screen text-sidebar-foreground shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar (sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="bg-sidebar p-0 w-64 text-sidebar-foreground"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <AuthOutlet />
      </div>
    </div>
  );
}
