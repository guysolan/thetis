import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	selectStockpilesQueryOptions,
	useSelectStockpiles,
} from "@/features/stockpiles/api/selectStockpiles";
import {
	selectInventoryHistoryQueryOptions,
	useSelectInventoryHistory,
} from "@/features/stock-history/api/selectInventoryHistory";
import {
	selectAmazonInventoryQueryOptions,
	useAmazonInventoryOptional,
} from "@/features/amazon/selectAmazonInventory";
import { Button } from "@thetis/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@thetis/ui/tabs";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@thetis/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@thetis/ui/select";
import StockTable from "@/features/stockpiles/components/StockTable";
import { pivotStockData } from "@/features/stockpiles/utils/pivotStockData";
import StockCheckForm from "@/components/StockCheckForm";
import PageHeader from "@/components/PageHeader";
import TabsHeader from "@/components/TabsHeader";
import { features } from "@/features/navigation/content";
import { useMemo, useState } from "react";
import { Input } from "@thetis/ui/input";
import { Calendar, ClipboardCheck, Search } from "lucide-react";
import {
	computeReorderPlan,
	getDemandMultiplierForProduct,
	getMonthName,
	REORDER_PLAN_PRODUCT_NAMES,
} from "@/features/stock-history/reorderPlanUtils";
import type { StockRow } from "@/features/stockpiles/utils/pivotStockData";
import type { LocationColumn } from "@/features/stockpiles/utils/pivotStockData";

function computeReorderInfo(
	rows: StockRow[],
	columns: LocationColumn[],
	stockpiles: { stockpile_id: number | null; stockpile_name: string | null }[] | undefined,
): Map<number, { placeOrderBy: string; isDue: boolean; orderQty: number }> {
	const map = new Map<number, { placeOrderBy: string; isDue: boolean; orderQty: number }>();
	if (!stockpiles?.length) return map;

	const mpd = stockpiles.find((s) => s.stockpile_name === "MPD");
	const parkHouse = stockpiles.find((s) => s.stockpile_name === "Park House");
	if (!mpd?.stockpile_id || !parkHouse?.stockpile_id) return map;

	const mpdKey = columns.find((c) => c.addressId === mpd.stockpile_id)?.key;
	const parkHouseKey = columns.find((c) => c.addressId === parkHouse.stockpile_id)?.key;
	if (!mpdKey || !parkHouseKey) return map;

	const now = new Date();
	const startMonth = now.getMonth();
	const startYear = now.getFullYear();
	const productNameSet = new Set(REORDER_PLAN_PRODUCT_NAMES.map((n) => n.toLowerCase()));

	for (const row of rows) {
		if (!productNameSet.has(row.itemName.toLowerCase())) continue;

		const combinedStock =
			(row.locations[mpdKey] ?? 0) + (row.locations[parkHouseKey] ?? 0);
		const plan = computeReorderPlan(combinedStock, startMonth, startYear, {
			demandMultiplier: getDemandMultiplierForProduct(row.itemName),
		});
		const nextOrder = plan.orders.find((o) => o.isNextOrder);
		if (!nextOrder || nextOrder.quantity <= 0) continue;

		const { month, year } = nextOrder.placeOrderBy;
		const placeOrderByStr = `${getMonthName(month)} ${year}`;
		const isDue =
			year < startYear || (year === startYear && month <= startMonth);

		map.set(row.itemId, {
			placeOrderBy: placeOrderByStr,
			isDue,
			orderQty: nextOrder.quantity,
		});
	}
	return map;
}

const tabConfig = features.stock.tabs;
type StockTab = (typeof tabConfig)[number]["value"];

const StockPage = () => {
	const { tab } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [search, setSearch] = useState("");
	const { data: stockpiles } = useSelectStockpiles();
	const { data: inventoryHistory } = useSelectInventoryHistory();
	const { data: amazonInventory } = useAmazonInventoryOptional();
	const { rows, columns } = useMemo(
		() => pivotStockData(inventoryHistory, stockpiles, amazonInventory),
		[inventoryHistory, stockpiles, amazonInventory],
	);

	const reorderInfo = useMemo(
		() => computeReorderInfo(rows, columns, stockpiles),
		[rows, columns, stockpiles],
	);

	const handleTabChange = (value: string | null) => {
		if (value) {
			navigate({ search: { tab: value as StockTab }, replace: true });
		}
	};

	const tabsList = tabConfig.map(({ value, label, icon: Icon }) => (
		<TabsTrigger key={value} value={value}>
			<Icon size={16} className="shrink-0" />
			<span>{label}</span>
		</TabsTrigger>
	));

	const [stockCountOpen, setStockCountOpen] = useState(false);
	const [stockCountAddressId, setStockCountAddressId] = useState<string>("");

	// Get unique addresses that hold stock from stockpiles
	const stockAddresses = useMemo(() => {
		if (!stockpiles) return [];
		const seen = new Set<number>();
		return stockpiles
			.filter((s) => s.stockpile_id && !seen.has(s.stockpile_id) && seen.add(s.stockpile_id))
			.map((s) => ({ id: String(s.stockpile_id), name: s.stockpile_name ?? `Location ${s.stockpile_id}` }));
	}, [stockpiles]);

	return (
		<>
			<PageHeader title="Stock">
				<Button variant="outline" size="sm" onClick={() => setStockCountOpen(true)}>
					<ClipboardCheck size={16} className="mr-1.5" />
					Stock Count
				</Button>
				<Sheet open={stockCountOpen} onOpenChange={setStockCountOpen}>
					<SheetContent className="sm:max-w-lg overflow-y-auto">
						<SheetHeader>
							<SheetTitle>Stock Count</SheetTitle>
						</SheetHeader>
						<div className="space-y-4 pt-4">
							<Select value={stockCountAddressId} onValueChange={setStockCountAddressId}>
								<SelectTrigger>
									<SelectValue placeholder="Select location" />
								</SelectTrigger>
								<SelectContent>
									{stockAddresses.map((addr) => (
										<SelectItem key={addr.id} value={addr.id}>
											{addr.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{stockCountAddressId && (
								<StockCheckForm
									key={stockCountAddressId}
									addressId={stockCountAddressId}
									onSuccess={() => {
										setStockCountOpen(false);
										setStockCountAddressId("");
									}}
								/>
							)}
						</div>
					</SheetContent>
				</Sheet>
				<Button variant="outline" size="sm" asChild>
					<Link to="/home/stock/reorder-plan">
						<Calendar size={16} className="mr-1.5" />
						Reorder Plan
					</Link>
				</Button>
			</PageHeader>

			<Tabs value={tab} onValueChange={handleTabChange} className="w-full">
				<div className="flex items-center gap-4 w-full">
					<div className="flex-1 min-w-0">
						<TabsHeader tabsList={tabsList} />
					</div>
					<div className="relative w-48 shrink-0">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search items..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9 h-9"
						/>
					</div>
				</div>

				{tabConfig.map(({ value }) => (
					<TabsContent
						key={value}
						value={value}
						className="flex flex-col gap-4 w-full"
					>
						<StockTable
							rows={rows}
							columns={columns}
							inventoryHistory={inventoryHistory ?? []}
							reorderInfo={reorderInfo}
							typeFilter={value}
							globalFilter={search}
							onGlobalFilterChange={setSearch}
						/>
					</TabsContent>
				))}
			</Tabs>
		</>
	);
};

export const Route = createFileRoute("/home/stock/")({
	component: StockPage,
	validateSearch: (search: Record<string, unknown>): { tab: StockTab } => ({
		tab: (tabConfig.some((t) => t.value === search.tab)
			? search.tab
			: "all") as StockTab,
	}),
	loader: async ({ context }) => {
		// Amazon is optional - prefetch but don't block if it fails
		context.queryClient.prefetchQuery(selectAmazonInventoryQueryOptions());
		await Promise.all([
			context.queryClient.ensureQueryData(
				selectStockpilesQueryOptions(),
			),
			context.queryClient.ensureQueryData(
				selectInventoryHistoryQueryOptions(),
			),
		]);
	},
});
