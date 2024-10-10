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

interface Sale {
	id: number;
	uuid: string;
	quantity: number;
	sale_date: string;
	sale_products: {
		product: {
			name: string;
			price: number;
		};
		quantity: number;
	}[];
}

interface ExistingSalesProps {
	sales: Sale[];
}

export const ExistingSales: React.FC<ExistingSalesProps> = ({ sales }) => {
	return (
		<div className="mt-4">
			<h2 className="mb-2 font-semibold text-xl">Existing Sales</h2>
			<Accordion type="single" collapsible className="w-full">
				{sales.map((sale) => (
					<AccordionItem key={sale.id} value={`sale-${sale.id}`}>
						<AccordionTrigger>
							<div className="flex justify-between w-full">
								<span>
									Sale {sale.id} -{" "}
									{new Date(sale.sale_date).toLocaleDateString()}
								</span>
								<a
									href={`/sales/${sale.id}`}
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
											{sale.sale_products.map((item) => (
												<TableRow key={`${sale.id}-${item.product.name}`}>
													<TableCell>{item.product.name}</TableCell>
													<TableCell>
														${item.product.price.toFixed(2)}
													</TableCell>
													<TableCell>{item.quantity}</TableCell>
													<TableCell>
														${(item.product.price * item.quantity).toFixed(2)}
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
