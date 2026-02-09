import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@thetis/ui/select";
import StockHistoryTable, {
	type InventoryHistoryRecord,
} from "../../../features/stock-history/StockHistoryTable";
import { supabase } from "@/lib/supabase";
import { Button } from "@thetis/ui/button";
import { ArrowLeft } from "lucide-react";

interface Location {
	id: number;
	name: string;
	line_1?: string;
	line_2?: string;
	city?: string;
	region?: string;
	code?: string;
	country?: string;
	is_active?: boolean;
	holds_stock?: boolean;
	company_id?: number;
	is_default_shipping?: boolean;
	is_default_billing?: boolean;
}

const fetchInventoryHistory = async (addressId: string) => {
	const { data, error } = await supabase
		.from("inventory_history_by_address")
		.select("*")
		.order("transaction_date", { ascending: false });

	if (error) {
		throw new Error(`Error fetching inventory history: ${error.message}`);
	}

	return data.map((record) => ({
		...record,
		order_type: record.order_type as
			| "build"
			| "buy"
			| "sell"
			| "ship"
			| "count",
		items: record.items.map((item) => ({
			...item,
			address_id: item.address_id || record.address_id,
		})),
	})) as InventoryHistoryRecord[];
};

const getInventoryHistoryQueryOptions = (addressId: string) => ({
	queryKey: ["inventoryHistory", addressId],
	queryFn: () => fetchInventoryHistory(addressId),
});

const fetchLocations = async () => {
	const { data, error } = await supabase
		.from("addresses")
		.select(
			"id, name, line_1, line_2, city, region, code, country, holds_stock",
		)
		.eq("is_active", true)
		.eq("holds_stock", true)
		.order("name");

	if (error) {
		throw new Error(`Error fetching locations: ${error.message}`);
	}

	return data;
};

const getLocationsQueryOptions = () => ({
	queryKey: ["locations"],
	queryFn: fetchLocations,
});

function StockHistoryPage() {
	const { inventoryHistory, locations } = Route.useLoaderData();
	const navigate = useNavigate();
	const { addressId } = Route.useParams();

	const currentLocation = locations.find(
		(location) => location.id.toString() === addressId,
	);

	const handleLocationChange = (value: string) => {
		navigate({
			to: "/home/stock/history/$addressId",
			params: { addressId: value },
		});
	};

	return (
		<div className="space-y-6 mx-auto">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex items-center gap-3">
					<Button variant="ghost" size="sm" asChild>
						<Link to="/home/stock">
							<ArrowLeft className="mr-1 h-4 w-4" />
							Stock
						</Link>
					</Button>
					<h1 className="font-bold text-xl">
						{currentLocation?.name ?? "History"}
					</h1>
				</div>

				<Select value={addressId} onValueChange={handleLocationChange}>
					<SelectTrigger className="w-full sm:w-[260px]">
						<SelectValue>
							{currentLocation?.name ?? "Select location"}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{locations.map((location) => (
							<SelectItem
								key={location.id}
								value={location.id.toString()}
								className="py-2"
							>
								<div>
									<div className="font-medium">
										{location.name}
									</div>
									{(location.line_1 || location.city) && (
										<div className="mt-0.5 text-muted-foreground text-xs truncate">
											{[
												location.line_1,
												location.city,
												location.region,
											]
												.filter(Boolean)
												.join(", ")}
										</div>
									)}
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* History Table */}
			{!inventoryHistory || inventoryHistory.length === 0 ? (
				<div className="py-12 text-center text-muted-foreground">
					No inventory history found for this location.
				</div>
			) : (
				<StockHistoryTable
					inventoryHistory={inventoryHistory}
					addressId={Number(addressId)}
				/>
			)}
		</div>
	);
}

export const Route = createFileRoute("/home/stock/history/$addressId")({
	component: StockHistoryPage,
	loader: async ({ params, context }) => {
		const { addressId } = params;

		const [inventoryHistory, locations] = await Promise.all([
			context.queryClient.ensureQueryData(
				getInventoryHistoryQueryOptions(addressId),
			),
			context.queryClient.ensureQueryData(getLocationsQueryOptions()),
		]);

		return { inventoryHistory, locations };
	},
});
