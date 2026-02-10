import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@thetis/ui/table";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@thetis/ui/accordion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	useCarousel,
} from "@thetis/ui/carousel";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@thetis/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { selectItemsByAddressQueryOptions } from "@/features/stockpiles/api/selectItemsByAddress";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";
import {
	selectStockpilesQueryOptions,
	useSelectStockpiles,
} from "@/features/stockpiles/api/selectStockpiles";
import {
	selectInventoryHistoryQueryOptions,
	useSelectInventoryHistory,
} from "@/features/stock-history/api/selectInventoryHistory";
import { getCurrentQuantity } from "@/features/stock-history/utils";
import {
	ANNUAL_DEMAND_TOTAL,
	BUFFER_MONTHS,
	computeReorderPlan,
	computeRunOutAndOrderBy,
	getDemandMultiplierForProduct,
	getMonthName,
	getUpcomingMonthsDemand,
	LEAD_TIME_WEEKS,
	ORDER_QUANTITY_MULTIPLE,
	type ReorderPlanResult,
} from "@/features/stock-history/reorderPlanUtils";
import { Button } from "@thetis/ui/button";
import {
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	Info,
	Package,
} from "lucide-react";

// Fixed order: Small Right, Small Left, Large Right, Large Left
const TARGET_PRODUCTS = [
	{ name: "Night Splint - Small Right (Bag)", label: "Small Right" },
	{ name: "Night Splint - Small Left (Bag)", label: "Small Left" },
	{ name: "Night Splint - Large Right (Bag)", label: "Large Right" },
	{ name: "Night Splint - Large Left (Bag)", label: "Large Left" },
] as const;

// Custom carousel controls component that uses the carousel context
function CarouselControls() {
	const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
		useCarousel();

	return (
		<div className="flex items-center gap-1">
			<Button
				variant="ghost"
				size="icon"
				onClick={scrollPrev}
				disabled={!canScrollPrev}
				className="w-8 h-8"
			>
				<ChevronLeft className="w-4 h-4" />
				<span className="sr-only">Previous order</span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={scrollNext}
				disabled={!canScrollNext}
				className="w-8 h-8"
			>
				<ChevronRight className="w-4 h-4" />
				<span className="sr-only">Next order</span>
			</Button>
		</div>
	);
}

const ReorderPlanPage = () => {
	const { data: stockpiles } = useSelectStockpiles();
	const { data: itemsByAddress } = useSelectItemsByAddress();
	const { data: inventoryHistory } = useSelectInventoryHistory();

	const mpd = stockpiles?.find((s) => s.stockpile_name === "MPD");
	const parkHouse = stockpiles?.find((s) =>
		s.stockpile_name === "Park House"
	);
	const mpdId = mpd?.stockpile_id;
	const parkHouseId = parkHouse?.stockpile_id;

	const products = itemsByAddress?.filter(
		(item) =>
			item.item_type === "product" &&
			TARGET_PRODUCTS.some(
				(t) =>
					t.name.toLowerCase() ===
						(item.item_name ?? "").toLowerCase(),
			),
	) ?? [];

	const byItemName = new Map(
		products.map((p) => [(p.item_name ?? "").toLowerCase(), p] as const),
	);

	const now = new Date();
	const startMonth = now.getMonth();
	const startYear = now.getFullYear();

	// Build data for each variant and compute all orders
	const variantData = TARGET_PRODUCTS.map((target) => {
		const product = byItemName.get(target.name.toLowerCase());
		const itemId = product?.item_id ?? 0;

		const currentStock = itemId && mpdId != null && parkHouseId != null
			? getCurrentQuantity(itemId, inventoryHistory ?? [], mpdId) +
				getCurrentQuantity(itemId, inventoryHistory ?? [], parkHouseId)
			: 0;

		let plan: ReorderPlanResult | null = null;
		if (itemId) {
			plan = computeReorderPlan(currentStock, startMonth, startYear, {
				demandMultiplier: getDemandMultiplierForProduct(target.name),
			});
		}

		return {
			label: target.label,
			name: target.name,
			currentStock,
			plan,
		};
	});

	const totalStock = variantData.reduce((sum, v) => sum + v.currentStock, 0);

	// Build orders grouped by orderIndex (all variants for each order)
	const firstPlan = variantData.find((v) => v.plan)?.plan;
	const orders = firstPlan?.orders ?? [];
	const ordersData = orders.map((order) => {
		const variantQuantities = variantData.map((v) => ({
			label: v.label,
			currentStock: v.currentStock,
			orderQty: v.plan?.orders.find((o) =>
				o.orderIndex === order.orderIndex
			)?.quantity ?? 0,
		}));
		const totalOrderQty = variantQuantities.reduce(
			(sum, v) => sum + v.orderQty,
			0,
		);
		return {
			orderIndex: order.orderIndex,
			isNextOrder: order.isNextOrder,
			placeOrderBy: order.placeOrderBy,
			deliversBy: order.deliversBy,
			variantQuantities,
			totalOrderQty,
		};
	});

	// Find the next order index for carousel initial slide
	const nextOrderIndex = ordersData.findIndex((o) => o.isNextOrder);
	const initialSlide = nextOrderIndex >= 0 ? nextOrderIndex : 0;

	// For the "how it works" section
	const runOutResult = computeRunOutAndOrderBy(totalStock, startMonth, startYear, {
		demandMultiplier: 1,
	});
	const upcomingDemand = getUpcomingMonthsDemand(startMonth, startYear, 12);
	const runOutMonth = runOutResult.runOutMonth;
	const runOutYear = runOutResult.runOutYear;

	return (
		<div className="space-y-6 mx-auto p-6 max-w-2xl">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="sm" asChild>
					<Link to="/home/stock">
						<ArrowLeft className="mr-1 w-4 h-4" />
						Stock
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader className="pb-4">
					<div className="flex items-center gap-3">
						<div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
							<Package className="w-5 h-5 text-primary" />
						</div>
						<div>
							<CardTitle className="text-xl">
								Next Order
							</CardTitle>
							<p className="text-muted-foreground text-sm">
								Based on {totalStock}{" "}
								units in stock (MPD + Park House)
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{ordersData.length > 0
						? (
							<Carousel
								opts={{ startIndex: initialSlide }}
								className="w-full"
							>
								<CarouselContent className="-ml-0">
									{ordersData.map((order) => (
										<CarouselItem
											key={order.orderIndex}
											className="pl-0"
										>
											<div className="space-y-4">
												<div className="flex justify-between items-center">
													<div>
														<h3 className="font-semibold text-lg">
															Order #{order
																.orderIndex}
															{order
																.isNextOrder &&
																(
																	<span className="ml-2 font-normal text-primary text-sm">
																		(Next)
																	</span>
																)}
														</h3>
														<p className="mt-1 text-muted-foreground text-sm">
															Place by{" "}
															{getMonthName(
																order
																	.placeOrderBy
																	.month,
															)}{" "}
															{order.placeOrderBy
																.year} •{" "}
															Delivers by{" "}
															{getMonthName(
																order.deliversBy
																	.month,
															)} {order.deliversBy
																.year}
														</p>
													</div>
													<CarouselControls />
												</div>
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead>
																Variant
															</TableHead>
															<TableHead className="text-right">
																Current Stock
															</TableHead>
															<TableHead className="text-right">
																Order Qty
															</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{order.variantQuantities
															.map((v) => (
																<TableRow
																	key={v
																		.label}
																>
																	<TableCell className="font-medium">
																		{v.label}
																	</TableCell>
																	<TableCell className="tabular-nums text-right">
																		{v.currentStock}
																	</TableCell>
																	<TableCell className="font-semibold tabular-nums text-right">
																		{v.orderQty}
																	</TableCell>
																</TableRow>
															))}
													</TableBody>
													<TableFooter>
														<TableRow>
															<TableCell className="font-semibold">
																Total
															</TableCell>
															<TableCell className="font-semibold tabular-nums text-right">
																{totalStock}
															</TableCell>
															<TableCell className="font-bold tabular-nums text-lg text-right">
																{order
																	.totalOrderQty}
															</TableCell>
														</TableRow>
													</TableFooter>
												</Table>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						)
						: (
							<p className="py-4 text-muted-foreground text-sm text-center">
								No orders calculated.
							</p>
						)}

					{totalStock === 0 && (
						<p className="py-4 text-muted-foreground text-sm text-center">
							No stock found at MPD or Park House.
						</p>
					)}

					{/* How it works - collapsible */}
					<Accordion type="single" collapsible>
						<AccordionItem
							value="how-it-works"
							className="border-t border-b-0"
						>
							<AccordionTrigger className="text-muted-foreground hover:text-foreground text-sm">
								<span className="flex items-center gap-2">
									<Info className="w-4 h-4" />
									How is this calculated?
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-4 text-sm">
									{/* Assumptions */}
									<div>
										<h4 className="mb-2 font-semibold">
											Assumptions
										</h4>
										<ul className="space-y-1 text-muted-foreground list-disc list-inside">
											<li>
												<strong>Annual demand:</strong>
												{" "}
												{ANNUAL_DEMAND_TOTAL
													.toLocaleString()}{" "}
												units/year
											</li>
											<li>
												<strong>Size split:</strong>
												{" "}
												3:1 Large to Small (75% Large,
												25% Small)
											</li>
											<li>
												<strong>Lead time:</strong>{" "}
												{LEAD_TIME_WEEKS}{" "}
												weeks (~{Math.round(
													LEAD_TIME_WEEKS / 4.33,
												)} months)
											</li>
											<li>
												<strong>Buffer:</strong>{" "}
												{BUFFER_MONTHS}{" "}
												month extra stock
											</li>
											<li>
												<strong>
													Order multiples:
												</strong>{" "}
												Rounded up to nearest{" "}
												{ORDER_QUANTITY_MULTIPLE}
											</li>
										</ul>
									</div>

									{/* Monthly demand curve */}
									<div>
										<h4 className="mb-2 font-semibold">
											Monthly Demand (Seasonal)
										</h4>
										<p className="mb-2 text-muted-foreground text-xs">
											Low: Oct–Feb | Mid (×1.5): Mar, Aug,
											Sep | High (×2): Apr–Jul
										</p>
										<ChartContainer
											config={{
												demand: {
													label: "Demand",
													color:
														"hsl(var(--chart-2))",
												},
											}}
											className="w-full h-[140px]"
										>
											<BarChart
												data={upcomingDemand}
												margin={{
													top: 8,
													right: 8,
													bottom: 0,
													left: 0,
												}}
											>
												<XAxis
													dataKey="monthName"
													tickLine={false}
													axisLine={false}
													tick={{ fontSize: 10 }}
													tickFormatter={(v) =>
														v.slice(0, 1)}
												/>
												<YAxis
													hide
													domain={[0, "dataMax"]}
												/>
												<ChartTooltip
													content={
														<ChartTooltipContent className="bg-white dark:bg-neutral-900 border-neutral-200" />
													}
													cursor={{
														fill:
															"hsl(var(--neutral-200, 0 0% 90%))",
													}}
												/>
												<Bar
													dataKey="demand"
													fill="var(--color-demand)"
													radius={[4, 4, 0, 0]}
												/>
											</BarChart>
										</ChartContainer>
									</div>

									{/* Stock projection */}
									{totalStock > 0 && (
										<div>
											<h4 className="mb-2 font-semibold">
												Stock Projection (if no order)
											</h4>
											<ChartContainer
												config={{
													stock: {
														label: "Stock",
														color:
															"hsl(var(--chart-1))",
													},
												}}
												className="w-full h-[140px]"
											>
												<BarChart
													data={runOutResult
														.projectedStockByMonth}
													margin={{
														top: 8,
														right: 8,
														bottom: 0,
														left: 0,
													}}
												>
													<XAxis
														dataKey="monthLabel"
														tickLine={false}
														axisLine={false}
														tick={{ fontSize: 10 }}
														tickFormatter={(v) =>
															v.split(" ")[0]
																?.slice(0, 1) ??
																""}
													/>
													<YAxis
														hide
														domain={[0, "dataMax"]}
													/>
													<ChartTooltip
														content={
															<ChartTooltipContent className="bg-white dark:bg-neutral-900 border-neutral-200" />
														}
														cursor={{
															fill:
																"hsl(var(--neutral-200, 0 0% 90%))",
														}}
													/>
													<Bar
														dataKey="stock"
														fill="var(--color-stock)"
														radius={[4, 4, 0, 0]}
													/>
												</BarChart>
											</ChartContainer>
											{runOutMonth != null &&
												runOutYear != null && (
												<p className="mt-2 text-destructive text-xs">
													Stock would run out by{" "}
													{getMonthName(runOutMonth)}
													{" "}
													{runOutYear}{" "}
													without an order.
												</p>
											)}
										</div>
									)}

									{/* Calculation summary */}
									<div>
										<h4 className="mb-2 font-semibold">
											Calculation
										</h4>
										<p className="text-muted-foreground text-xs">
											Order quantity = demand until next
											delivery + {BUFFER_MONTHS}{" "}
											month buffer − current stock,
											rounded up to nearest{" "}
											{ORDER_QUANTITY_MULTIPLE}. Each
											variant is calculated separately
											based on its share of total demand.
										</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardContent>
			</Card>
		</div>
	);
};

export const Route = createFileRoute("/home/stock/reorder-plan")({
	component: ReorderPlanPage,
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(selectStockpilesQueryOptions()),
			context.queryClient.ensureQueryData(
				selectItemsByAddressQueryOptions(),
			),
			context.queryClient.ensureQueryData(
				selectInventoryHistoryQueryOptions(),
			),
		]);
	},
});
