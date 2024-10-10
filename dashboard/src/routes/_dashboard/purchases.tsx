import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { useSelectPurchases } from "../../features/purchases/api/selectPurchases";
import { useSelectProductParts } from "../../features/product-parts/selectProductParts";
import { useSelectParts } from "../../features/parts/api/selectParts";
import {
	type PurchaseItem,
	calculatePurchaseDetails,
} from "../../features/purchases/utils/calculatePurchaseDetails";
import { PurchaseForm } from "../../features/purchases/components/PurchaseForm";
import { PurchaseSummary } from "../../features/purchases/components/PurchaseSummary";
import { ExistingPurchases } from "../../features/purchases/components/ExistingPurchases";
import { ScrollArea } from "../../components/ui/scroll-area";

const PurchasesPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([
		{ type: "product", id: "", quantity: 0 },
	]);
	const { data: purchases } = useSelectPurchases();
	const { data: products } = useSelectProductParts();
	const { data: parts } = useSelectParts();

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="mb-4 font-bold text-2xl">Purchase Creator</h1>
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button>Create New Purchase</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Create Purchase</SheetTitle>
							<SheetDescription>
								Enter the details for your new Purchase.
							</SheetDescription>
						</SheetHeader>
						<ScrollArea className="pr-2 h-[90vh]">
							<PurchaseForm products={products} parts={parts} />
						</ScrollArea>
					</SheetContent>
				</Sheet>
			</div>
			<ExistingPurchases purchases={purchases} />
		</div>
	);
};

export const Route = createFileRoute("/_dashboard/purchases")({
	component: PurchasesPage,
});
