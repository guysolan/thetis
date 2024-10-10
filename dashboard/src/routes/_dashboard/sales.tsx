import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useSelectSales } from "../../features/sales/api/selectSales";
import { useSelectProducts } from "../../features/products/api/selectProducts";

import { SaleForm } from "../../features/sales/components/SaleForm";
import { ExistingSales } from "../../features/sales/components/ExistingSales";
import { ScrollArea } from "../../components/ui/scroll-area";

const SalesPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: sales } = useSelectSales();
	const { data: products } = useSelectProducts();

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="mb-4 font-bold text-2xl">Sale Creator</h1>

				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button>Create New Sale</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Create Sale</SheetTitle>
							<SheetDescription>
								Enter the details for your new Sale.
							</SheetDescription>
						</SheetHeader>
						<ScrollArea className="pr-2 h-[90vh]">
							<SaleForm defaultValues={products} />
						</ScrollArea>
					</SheetContent>
				</Sheet>
			</div>
			<ExistingSales sales={sales} />
		</div>
	);
};

export const Route = createFileRoute("/_dashboard/sales")({
	component: SalesPage,
});
