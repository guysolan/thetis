import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import type { SaleItem } from "../utils/calculateSaleDetails";

interface SaleFormProps {
	saleItems: SaleItem[];
	setSaleItems: React.Dispatch<React.SetStateAction<SaleItem[]>>;
	products: any[];
	handleCreateSale: () => void;
}

export const SaleForm: React.FC<SaleFormProps> = ({
	saleItems,
	setSaleItems,
	products,
	handleCreateSale,
}) => {
	const handleInputChange = (
		index: number,
		field: keyof SaleItem,
		value: string,
	) => {
		const updatedItems = [...saleItems];
		if (field === "quantity") {
			updatedItems[index][field] = Number.parseInt(value) || 0;
		} else if (field === "id") {
			updatedItems[index][field] = value;
		}
		setSaleItems(updatedItems);
	};

	const addSaleItem = () => {
		setSaleItems([...saleItems, { id: "", quantity: 0 }]);
	};

	const removeSaleItem = (index: number) => {
		const updatedItems = saleItems.filter((_, i) => i !== index);
		setSaleItems(updatedItems);
	};

	return (
		<ScrollArea className="pr-4 h-[calc(100vh-400px)]">
			<SheetHeader>
				<SheetTitle>Create Sale</SheetTitle>
				<SheetDescription>
					Enter the details for your new Sale.
				</SheetDescription>
			</SheetHeader>
			<div className="gap-4 grid py-4">
				{saleItems.map((item, index) => (
					<div key={index} className="gap-2 grid">
						<div className="items-center gap-4 grid grid-cols-4">
							<Label htmlFor={`id-${index}`} className="text-right">
								Product
							</Label>
							<Select
								value={item.id}
								onValueChange={(value) => handleInputChange(index, "id", value)}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select product" />
								</SelectTrigger>
								<SelectContent>
									{products.map((product) => (
										<SelectItem key={product.id} value={product.id.toString()}>
											{product.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="items-center gap-4 grid grid-cols-4">
							<Label htmlFor={`quantity-${index}`} className="text-right">
								Quantity
							</Label>
							<Input
								id={`quantity-${index}`}
								type="number"
								className="col-span-3"
								value={item.quantity}
								onChange={(e) =>
									handleInputChange(index, "quantity", e.target.value)
								}
							/>
						</div>
						{saleItems.length > 1 && (
							<Button
								onClick={() => removeSaleItem(index)}
								variant="destructive"
								size="sm"
							>
								Remove
							</Button>
						)}
					</div>
				))}
				<div className="flex gap-2">
					<Button variant="secondary" size="sm" onClick={addSaleItem}>
						Add Product
					</Button>
				</div>
			</div>

			<Button onClick={handleCreateSale}>Create Sale</Button>
		</ScrollArea>
	);
};
