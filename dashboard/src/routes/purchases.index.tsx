import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSelectPurchases } from "../features/purchases/api/selectPurchases";
import { useSelectProductParts } from "../features/product-parts/selectProductParts";
import { useSelectParts } from "../features/parts/api/selectParts";
import {
	type PurchaseItem,
	calculatePurchaseDetails,
} from "../features/purchases/utils/calculatePurchaseDetails";
import { PurchaseForm } from "../features/purchases/components/PurchaseForm";
import { PurchaseSummary } from "../features/purchases/components/PurchaseSummary";
import { ExistingPurchases } from "../features/purchases/components/ExistingPurchases";

const PurchasesPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([
		{ type: "product", id: "", quantity: 0 },
	]);
	const { data: purchases } = useSelectPurchases();
	const { data: products } = useSelectProductParts();
	const { data: parts } = useSelectParts();

	const { totalCost, partsConsumed } = calculatePurchaseDetails(
		purchaseItems,
		products,
		parts,
	);

	const isAnyPartNegative = useMemo(() => {
		return partsConsumed.some((part) => part.remainingStock < 0);
	}, [partsConsumed]);

	const handleCreatePurchase = () => {
		console.log("Purchase created:", {
			purchaseItems,
			totalCost,
			partsConsumed,
		});
		setIsOpen(false);
		setPurchaseItems([{ type: "product", id: "", quantity: 0 }]);
	};

	return (
		<div className="p-4">
			<h1 className="mb-4 font-bold text-2xl">Purchase Purchase Creator</h1>

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button>Create New Purchase Purchase</Button>
				</SheetTrigger>
				<SheetContent>
					<PurchaseForm
						purchaseItems={purchaseItems}
						setPurchaseItems={setPurchaseItems}
						products={products}
						parts={parts}
						isAnyPartNegative={isAnyPartNegative}
						handleCreatePurchase={handleCreatePurchase}
					/>
					<PurchaseSummary
						totalCost={totalCost}
						partsConsumed={partsConsumed}
					/>
				</SheetContent>
			</Sheet>
			<ExistingPurchases purchases={purchases} />
		</div>
	);
};

export const Route = createFileRoute("/purchases/")({
	component: PurchasesPage,
});
