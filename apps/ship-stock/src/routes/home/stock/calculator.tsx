import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";
import { Input } from "@thetis/ui/input";
import { selectItemsByAddressQueryOptions } from "@/features/stockpiles/api/selectItemsByAddress";
import { useSelectItemsByAddress } from "@/features/stockpiles/api/selectItemsByAddress";
import {
    selectInventoryHistoryQueryOptions,
    useSelectInventoryHistory,
} from "@/features/stock-history/api/selectInventoryHistory";
import { getCurrentQuantity } from "@/features/stock-history/utils";
import {
    calculateOrderQuantity,
    calculateProjectedSales,
    getMonthlyBreakdown,
} from "@/features/stock-history/calculatorUtils";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ProductData {
    item_id: number;
    item_name: string;
    currentStock: number;
}

const StockCalculator = () => {
    const { data: itemsByAddress } = useSelectItemsByAddress();
    const { data: inventoryHistory } = useSelectInventoryHistory();

    // Specific products to track
    const targetProducts = [
        "Night Splint - Small Right (Bag)",
        "Night Splint - Small Left (Bag)",
        "Night Splint - Large Right (Bag)",
        "Night Splint - Large Left (Bag)",
    ];

    // Filter to only Night Splint products at Park House address
    const products = itemsByAddress?.filter(
        (item) =>
            item.item_type === "product" &&
            item.address_name === "Park House" &&
            targetProducts.includes(item.item_name || ""),
    ) || [];

    // Get Park House address ID
    const parkHouseAddressId = products[0]?.address_id;

    // Total projected sales for all night splints this year
    const [totalProjectedSales, setTotalProjectedSales] = useState(2000);

    // Calculate individual product sales based on size split (Large:Small = 3:1)
    const getProductSales = (productName: string): number => {
        // Large products get 3/8 each, Small products get 1/8 each
        if (productName.includes("Large")) {
            return totalProjectedSales * (3 / 8);
        } else {
            return totalProjectedSales * (1 / 8);
        }
    };

    // Initialize state with current stock from inventory history (same as stock page)
    const [productData, setProductData] = useState<Record<number, ProductData>>(
        () => {
            const initial: Record<number, ProductData> = {};
            products.forEach((product) => {
                if (product.item_id) {
                    const currentStock = getCurrentQuantity(
                        product.item_id,
                        inventoryHistory || [],
                        parkHouseAddressId,
                    );
                    initial[product.item_id] = {
                        item_id: product.item_id,
                        item_name: product.item_name || "",
                        currentStock: currentStock,
                    };
                }
            });
            return initial;
        },
    );

    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (itemId: number) => {
        setExpandedRows((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const updateProductData = (
        itemId: number,
        field: "currentStock",
        value: number,
    ) => {
        setProductData((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [field]: value,
            },
        }));
    };

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Stock Forecast Calculator - Park House Night Splints
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                        Calculate recommended order quantities for Night Splint
                        products at Park House based on seasonal sales patterns.
                        Accounts for 10-week lead time and maintains 3 months of
                        buffer stock.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <label className="font-semibold">
                            Total Projected Sales This Year:
                        </label>
                        <Input
                            type="number"
                            value={totalProjectedSales}
                            onChange={(e) =>
                                setTotalProjectedSales(Number(e.target.value))}
                            className="w-32"
                            min="0"
                        />
                        <span className="text-gray-500 text-sm">
                            (Large: 37.5% each, Small: 12.5% each)
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>
                                        Current Stock
                                    </TableHead>
                                    <TableHead>
                                        Projected Sales
                                    </TableHead>
                                    <TableHead>
                                        3-Month Sales
                                    </TableHead>
                                    <TableHead>
                                        Lead Time Sales
                                    </TableHead>
                                    <TableHead>
                                        Recommended Order
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => {
                                    if (!product.item_id) return null;

                                    const data = productData[product.item_id];
                                    if (!data) return null;

                                    const productSales = getProductSales(
                                        data.item_name,
                                    );
                                    const threeMonthSales =
                                        calculateProjectedSales(
                                            productSales,
                                            new Date(),
                                            3,
                                        );
                                    const leadTimeSales =
                                        calculateProjectedSales(
                                            productSales,
                                            new Date(),
                                            10 / 4.33, // 10 weeks in months
                                        );
                                    const orderQuantity =
                                        calculateOrderQuantity(
                                            data.currentStock,
                                            productSales,
                                        );
                                    const isExpanded = expandedRows.has(
                                        product.item_id,
                                    );

                                    return (
                                        <>
                                            <TableRow key={product.item_id}>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            toggleRow(
                                                                product
                                                                    .item_id!,
                                                            )}
                                                        disabled={totalProjectedSales ===
                                                            0}
                                                    >
                                                        {isExpanded
                                                            ? (
                                                                <ChevronDown className="w-4 h-4" />
                                                            )
                                                            : (
                                                                <ChevronRight className="w-4 h-4" />
                                                            )}
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {data.item_name}
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={data
                                                            .currentStock}
                                                        onChange={(e) =>
                                                            updateProductData(
                                                                product
                                                                    .item_id!,
                                                                "currentStock",
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )}
                                                        className="w-24"
                                                        min="0"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {Math.round(productSales)}
                                                </TableCell>
                                                <TableCell>
                                                    {threeMonthSales}
                                                </TableCell>
                                                <TableCell>
                                                    {leadTimeSales}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {orderQuantity}
                                                </TableCell>
                                            </TableRow>
                                            {isExpanded && (
                                                <TableRow
                                                    key={`${product.item_id}-breakdown`}
                                                >
                                                    <TableCell
                                                        colSpan={7}
                                                        className="bg-gray-50 p-4"
                                                    >
                                                        <div className="space-y-2">
                                                            <h4 className="font-semibold">
                                                                Month-by-Month
                                                                Breakdown
                                                            </h4>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>
                                                                        </TableHead>
                                                                        {getMonthlyBreakdown(
                                                                            productSales,
                                                                            new Date(),
                                                                            12,
                                                                        ).map(
                                                                            (
                                                                                month,
                                                                            ) => (
                                                                                <TableHead
                                                                                    key={`${month.month}-${month.year}`}
                                                                                >
                                                                                    {month
                                                                                        .month}
                                                                                    {" "}
                                                                                    '
                                                                                    {String(
                                                                                        month
                                                                                            .year,
                                                                                    ).slice(
                                                                                        2,
                                                                                    )}
                                                                                </TableHead>
                                                                            ),
                                                                        )}
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium">
                                                                            Projected
                                                                            Sales
                                                                        </TableCell>
                                                                        {getMonthlyBreakdown(
                                                                            productSales,
                                                                            new Date(),
                                                                            12,
                                                                        ).map(
                                                                            (
                                                                                month,
                                                                            ) => (
                                                                                <TableCell
                                                                                    key={`${month.month}-${month.year}-sales`}
                                                                                >
                                                                                    {month
                                                                                        .sales}
                                                                                </TableCell>
                                                                            ),
                                                                        )}
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium">
                                                                            % of
                                                                            Year
                                                                        </TableCell>
                                                                        {getMonthlyBreakdown(
                                                                            productSales,
                                                                            new Date(),
                                                                            12,
                                                                        ).map(
                                                                            (
                                                                                month,
                                                                            ) => (
                                                                                <TableCell
                                                                                    key={`${month.month}-${month.year}-pct`}
                                                                                >
                                                                                    {(month
                                                                                        .percentage *
                                                                                        100).toFixed(
                                                                                            1,
                                                                                        )}%
                                                                                </TableCell>
                                                                            ),
                                                                        )}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {products.length === 0 && (
                        <div className="py-8 text-gray-500 text-center">
                            No Night Splint products found at Park House
                            address.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export const Route = createFileRoute("/home/stock/calculator")({
    component: StockCalculator,
    loader: async ({ context }) => {
        await Promise.all([
            context.queryClient.ensureQueryData(
                selectItemsByAddressQueryOptions(),
            ),
            context.queryClient.ensureQueryData(
                selectInventoryHistoryQueryOptions(),
            ),
        ]);
    },
});
