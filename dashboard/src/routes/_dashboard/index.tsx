import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSelectProducts } from "../../features/products/api/selectProducts";
import { useSelectParts } from "../../features/parts/api/selectParts";
import { useSelectPurchases } from "../../features/purchases/api/selectPurchases";
import { useSelectSales } from "../../features/sales/api/selectSales";

const productChartConfig = {
	quantity: {
		label: "Quantity",
		color: "#8884d8",
	},
	totalCost: {
		label: "Total Cost",
		color: "#82ca9d",
	},
} satisfies ChartConfig;

const partChartConfig = {
	quantity: {
		label: "Quantity",
		color: "rgb(64 64 64)",
	},
} satisfies ChartConfig;

export default function Dashboard() {
	const { data: products } = useSelectProducts();
	const { data: parts } = useSelectParts();
	const { data: purchases } = useSelectPurchases();
	const { data: sales } = useSelectSales();

	const productChartData =
		products?.map((product) => ({
			name: product.name,
			quantity: product.quantity,
		})) || [];

	const partChartData =
		parts?.map((part) => ({
			name: part.name,
			quantity: part.quantity,
		})) || [];

	const totalProductCost = products.reduce(
		(sum, product) => sum + product.quantity * product.price,
		0,
	);
	const totalPartCost = parts.reduce(
		(sum, part) => sum + part.quantity * part.price,
		0,
	);

	return (
		<div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Products Overview</CardTitle>
					<div className="mb-4 font-semibold text-lg">
						Total Product Cost: ${totalProductCost.toFixed(2)}
					</div>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={productChartConfig}
						className="w-full min-h-[200px]"
					>
						<BarChart data={productChartData}>
							<XAxis dataKey="name" />
							<YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
							<YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
							<Bar yAxisId="left" dataKey="quantity" fill="rgb(64 64 64)" />

							<ChartTooltipContent />
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Parts Overview</CardTitle>
					<div className="mb-4 font-semibold text-lg">
						Total Parts Cost: ${totalPartCost.toFixed(2)}
					</div>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={partChartConfig}
						className="w-full min-h-[200px]"
					>
						<BarChart data={partChartData}>
							<XAxis dataKey="name" />
							<YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
							<YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
							<Bar yAxisId="left" dataKey="quantity" fill="rgb(64 64 64)" />
							<ChartTooltipContent />
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Previous Purchases</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Purchase ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Total Cost</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{purchases?.slice(0, 5).map((purchase) => (
								<TableRow key={purchase.id}>
									<TableCell>{purchase.id}</TableCell>
									<TableCell>
										{new Date(purchase.purchase_date).toLocaleDateString()}
									</TableCell>
									<TableCell>
										${Number(purchase.total_cost).toFixed(2)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Previous Sales</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Sale ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Revenue</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sales?.slice(0, 5).map((sale) => (
								<TableRow key={sale.id}>
									<TableCell>{sale.id}</TableCell>
									<TableCell>
										{new Date(sale.sale_date).toLocaleDateString()}
									</TableCell>
									<TableCell>${Number(sale.total_cost).toFixed(2)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}

export const Route = createFileRoute("/_dashboard/")({
	component: Dashboard,
});
