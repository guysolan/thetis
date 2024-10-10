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
import { PurchaseItem } from "../utils/purchaseUtils";

interface PurchaseFormProps {
	purchaseItems: PurchaseItem[];
	setPurchaseItems: React.Dispatch<React.SetStateAction<PurchaseItem[]>>;
	products: any[];
	parts: any[];
	isAnyPartNegative: boolean;
	handleCreatePurchase: () => void;
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
	purchaseItems,
	setPurchaseItems,
	products,
	parts,
	isAnyPartNegative,
	handleCreatePurchase,
}) => {
	const handleInputChange = (
		index: number,
		field: keyof PurchaseItem,
		value: string,
	) => {
		const updatedItems = [...purchaseItems];
		if (field === "quantity") {
			updatedItems[index][field] = Number.parseInt(value) || 0;
		} else if (field === "id") {
			updatedItems[index][field] = value;
		}
		setPurchaseItems(updatedItems);
	};

	const addPurchaseItem = (type: "product" | "part") => {
		setPurchaseItems([...purchaseItems, { type, id: "", quantity: 0 }]);
	};

	const removePurchaseItem = (index: number) => {
		const updatedItems = purchaseItems.filter((_, i) => i !== index);
		setPurchaseItems(updatedItems);
	};

	return (
		<ScrollArea className="pr-4 h-[calc(100vh-400px)]">
			<SheetHeader>
				<SheetTitle>Create Purchase Purchase</SheetTitle>
				<SheetDescription>
					Enter the details for your new purchase purchase.
				</SheetDescription>
			</SheetHeader>
			<div className="gap-4 grid py-4">
				{purchaseItems.map((item, index) => (
					<div key={index} className="gap-2 grid">
						<div className="items-center gap-4 grid grid-cols-4">
							<Label htmlFor={`type-${index}`} className="text-right">
								Type
							</Label>
							<Select
								value={item.type}
								onValueChange={(value: "product" | "part") =>
									handleInputChange(index, "type", value)
								}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="product">Product</SelectItem>
									<SelectItem value="part">Part</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="items-center gap-4 grid grid-cols-4">
							<Label htmlFor={`id-${index}`} className="text-right">
								{item.type === "product" ? "Product" : "Part"}
							</Label>
							<Select
								value={item.id}
								onValueChange={(value) => handleInputChange(index, "id", value)}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder={`Select ${item.type}`} />
								</SelectTrigger>
								<SelectContent>
									{item.type === "product"
										? products.map((product) => (
												<SelectItem
													key={product.id}
													value={product.id.toString()}
												>
													{product.name}
												</SelectItem>
											))
										: parts.map((part) => (
												<SelectItem key={part.id} value={part.id.toString()}>
													{part.name}
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
						{purchaseItems.length > 1 && (
							<Button
								onClick={() => removePurchaseItem(index)}
								variant="destructive"
								size="sm"
							>
								Remove
							</Button>
						)}
					</div>
				))}
				<div className="flex gap-2">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => addPurchaseItem("product")}
					>
						Add Product
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => addPurchaseItem("part")}
					>
						Add Part
					</Button>
				</div>
			</div>

			<Button onClick={handleCreatePurchase} disabled={isAnyPartNegative}>
				Create Purchase
			</Button>
		</ScrollArea>
	);
};
