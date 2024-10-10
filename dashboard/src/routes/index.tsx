"use client";

import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Dashboard,
});

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
	PlusCircle,
	ShoppingCart,
	Package,
	Cog,
	FileText,
	ClipboardList,
} from "lucide-react";

const productData = [
	{ name: "Product A", parts: 5, stock: 100 },
	{ name: "Product B", parts: 3, stock: 75 },
	{ name: "Product C", parts: 8, stock: 50 },
];

const partData = [
	{ name: "Part 1", stock: 500 },
	{ name: "Part 2", stock: 300 },
	{ name: "Part 3", stock: 750 },
	{ name: "Part 4", stock: 200 },
];

const orderData = [
	{ id: "ORD001", product: "Product A", quantity: 10, date: "2023-06-01" },
	{ id: "ORD002", product: "Product B", quantity: 5, date: "2023-06-02" },
	{ id: "ORD003", product: "Product C", quantity: 8, date: "2023-06-03" },
];

const salesData = [
	{
		id: "SAL001",
		product: "Product A",
		quantity: 8,
		date: "2023-06-01",
		revenue: 800,
	},
	{
		id: "SAL002",
		product: "Product B",
		quantity: 3,
		date: "2023-06-02",
		revenue: 450,
	},
	{
		id: "SAL003",
		product: "Product C",
		quantity: 6,
		date: "2023-06-03",
		revenue: 1200,
	},
];

const productChartConfig = {
	stock: {
		label: "Stock",
		color: "#8884d8",
	},
} satisfies ChartConfig;

const partChartConfig = {
	stock: {
		label: "Stock",
		color: "#82ca9d",
	},
} satisfies ChartConfig;

export default function Dashboard() {
	return (
		<div className="flex flex-col bg-gray-100 min-h-screen">
			<header className="bg-white shadow-sm">
				<div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
					<h1 className="font-semibold text-2xl text-gray-900">
						Ecommerce Dashboard
					</h1>
					<div className="flex space-x-2">
						<Button size="sm">
							<PlusCircle className="mr-2 w-4 h-4" />
							New Invoice
						</Button>
						<Button size="sm">
							<ClipboardList className="mr-2 w-4 h-4" />
							New Purchase Order
						</Button>
					</div>
				</div>
			</header>
			<main className="flex-grow mx-auto sm:px-6 lg:px-8 py-6 w-full max-w-7xl">
				<div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>Products Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={productChartConfig}
								className="w-full min-h-[200px]"
							>
								<BarChart data={productData}>
									<XAxis dataKey="name" />
									<YAxis />
									<Bar dataKey="stock" fill="var(--color-stock)" radius={4} />
									<ChartTooltipContent />
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Parts Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer
								config={partChartConfig}
								className="w-full min-h-[200px]"
							>
								<BarChart data={partData}>
									<XAxis dataKey="name" />
									<YAxis />
									<Bar dataKey="stock" fill="var(--color-stock)" radius={4} />
									<ChartTooltipContent />
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Parts per Product</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{productData.map((product) => (
									<li
										key={product.name}
										className="flex justify-between items-center"
									>
										<span>{product.name}</span>
										<Badge variant="secondary">{product.parts} parts</Badge>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
				<div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-8">
					<Card>
						<CardHeader>
							<CardTitle>Previous Orders</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Order ID</TableHead>
										<TableHead>Product</TableHead>
										<TableHead>Quantity</TableHead>
										<TableHead>Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orderData.map((order) => (
										<TableRow key={order.id}>
											<TableCell>{order.id}</TableCell>
											<TableCell>{order.product}</TableCell>
											<TableCell>{order.quantity}</TableCell>
											<TableCell>{order.date}</TableCell>
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
										<TableHead>Product</TableHead>
										<TableHead>Quantity</TableHead>
										<TableHead>Revenue</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{salesData.map((sale) => (
										<TableRow key={sale.id}>
											<TableCell>{sale.id}</TableCell>
											<TableCell>{sale.product}</TableCell>
											<TableCell>{sale.quantity}</TableCell>
											<TableCell>${sale.revenue}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</main>
			<footer className="bg-white shadow-sm mt-8">
				<div className="flex justify-center space-x-4 mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
					<Button variant="outline">
						<Package className="mr-2 w-4 h-4" />
						Add New Part
					</Button>
					<Button variant="outline">
						<ShoppingCart className="mr-2 w-4 h-4" />
						Add New Product
					</Button>
					<Button variant="outline">
						<Cog className="mr-2 w-4 h-4" />
						Configure Parts/Products
					</Button>
				</div>
			</footer>
		</div>
	);
}
