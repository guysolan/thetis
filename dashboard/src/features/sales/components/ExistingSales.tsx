import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Order {
	id: number;
	uuid: string;
	quantity: number;
	order_date: string;
	order_products: {
		product: {
			name: string;
			price: number;
		};
		quantity: number;
	}[];
}

interface ExistingOrdersProps {
	orders: Order[];
}

export const ExistingOrders: React.FC<ExistingOrdersProps> = ({ orders }) => {
	return (
		<div className="mt-4">
			<h2 className="mb-2 font-semibold text-xl">Existing Orders</h2>
			<Accordion type="single" collapsible className="w-full">
				{orders.map((order) => (
					<AccordionItem key={order.id} value={`order-${order.id}`}>
						<AccordionTrigger>
							<div className="flex justify-between w-full">
								<span>
									Order {order.id} -{" "}
									{new Date(order.order_date).toLocaleDateString()}
								</span>
								<a
									href={`/orders/${order.id}`}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="text-blue-500 hover:underline"
								>
									Open in new tab
								</a>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<div>
									<h3 className="font-semibold">Products</h3>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Name</TableHead>
												<TableHead>Price</TableHead>
												<TableHead>Quantity</TableHead>
												<TableHead>Total</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{order.products.map((product) => (
												<TableRow key={`${order.id}-${product.product_name}`}>
													<TableCell>{product.product_name}</TableCell>
													<TableCell>
														${product.price.toFixed(2)}
													</TableCell>
													<TableCell>{-product.quantity}</TableCell>
													<TableCell>
														${(product.total).toFixed(2)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
export interface OrderItem {
	id: string;
	quantity: number;
}

export const calculateOrderDetails = (
	orderItems: OrderItem[],
	products: any[],
) => {
	let totalCost = 0;

	for (const item of orderItems) {
		const selectedProduct = products.find((p) => p.id.toString() === item.id);
		if (selectedProduct) {
			totalCost += selectedProduct.price * item.quantity;
		}
	}

	return { totalCost };
};
