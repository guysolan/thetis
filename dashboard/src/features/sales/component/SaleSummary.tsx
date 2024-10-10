import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	type SaleItem,
	calculateSaleDetails,
} from "../utils/calculateSaleDetails";

interface SaleSummaryProps {
	saleItems: SaleItem[];
	products: any[];
}

export const SaleSummary: React.FC<SaleSummaryProps> = ({
	saleItems,
	products,
}) => {
	const { totalCost, productsConsumed } = calculateSaleDetails(
		saleItems,
		products,
	);

	return (
		<div className="mt-4 mb-4">
			<h3 className="mb-2 font-semibold">Sale Summary:</h3>
			<p>Total Cost: ${totalCost.toFixed(2)}</p>
			<h4 className="mt-2 font-semibold">Products stock changes:</h4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Product Name</TableHead>
						<TableHead>Previous Stock</TableHead>
						<TableHead>Change</TableHead>
						<TableHead>Remaining After Sale</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{productsConsumed.map((product) => (
						<TableRow key={product.productId}>
							<TableCell>{product.productName}</TableCell>
							<TableCell>{product.currentStock}</TableCell>
							<TableCell>
								<span style={{ color: "red" }}>- {product.quantity}</span>
							</TableCell>
							<TableCell>
								{product.remainingStock < 0 ? (
									<span style={{ color: "red" }}>{product.remainingStock}</span>
								) : (
									product.remainingStock
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
