import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSelectSales } from "../features/sales/api/selectSales";
import { useSelectProducts } from "../features/products/api/selectProducts";
import {
	type SaleItem,
	calculateSaleDetails,
} from "../features/sales/utils/calculateSaleDetails";
import { SaleForm } from "../features/sales/component/SaleForm";
import { SaleSummary } from "../features/sales/component/SaleSummary";
import { ExistingSales } from "../features/sales/component/ExistingSales";

const SalesPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [saleItems, setSaleItems] = useState<SaleItem[]>([
		{ id: "", quantity: 0 },
	]);
	const { data: sales } = useSelectSales();
	const { data: products } = useSelectProducts();

	const { totalCost } = useMemo(
		() => calculateSaleDetails(saleItems, products),
		[saleItems, products],
	);

	const handleCreateSale = () => {
		console.log("Sale created:", {
			saleItems,
			totalCost,
		});
		setIsOpen(false);
		setSaleItems([{ id: "", quantity: 0 }]);
	};

	return (
		<div className="p-4">
			<h1 className="mb-4 font-bold text-2xl">Sale Creator</h1>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button>Create New Sale</Button>
				</SheetTrigger>
				<SheetContent>
					<SaleForm
						saleItems={saleItems}
						setSaleItems={setSaleItems}
						products={products}
						handleCreateSale={handleCreateSale}
					/>
					<SaleSummary saleItems={saleItems} products={products} />
				</SheetContent>
			</Sheet>
			<ExistingSales sales={sales} />
		</div>
	);
};

export const Route = createFileRoute("/sales/")({
	component: SalesPage,
});
