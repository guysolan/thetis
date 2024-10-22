import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { OrderItem } from '../../orders/types';
import { calculateOrderDetails } from './ExistingSales';

interface OrderSummaryProps {
	orderItems: OrderItem[];
	products: any[];
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
	orderItems,
	products,
}) => {
	const { totalCost } = calculateOrderDetails(
		orderItems,
		products,
	);

	return (
		<div className="mt-4 mb-4">
			<h3 className="mb-2 font-semibold">Order Summary:</h3>
			<p>Total Cost: ${totalCost.toFixed(2)}</p>
			<h4 className="mt-2 font-semibold">Products stock changes:</h4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Product Name</TableHead>
						<TableHead>Previous Stock</TableHead>
						<TableHead>Change</TableHead>
						<TableHead>Remaining After Order</TableHead>
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
