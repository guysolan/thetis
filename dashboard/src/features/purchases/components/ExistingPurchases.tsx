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

interface Purchase {
	id: number;
	uuid: string;
	quantity: number;
	purchase_date: string;
	purchase_products: {
		product: {
			name: string;
			price: number;
		};
		quantity: number;
	}[];
	purchase_parts: {
		part: {
			name: string;
			price: number;
		};
		quantity: number;
	}[];
}

interface ExistingPurchasesProps {
	purchases: Purchase[];
}

export const ExistingPurchases: React.FC<ExistingPurchasesProps> = ({
	purchases,
}) => {
	return (
		<div className="mt-4">
			<h2 className="mb-2 font-semibold text-xl">Existing Purchases</h2>
			<Accordion type="single" collapsible className="w-full">
				{purchases.map((purchase) => (
					<AccordionItem key={purchase.id} value={`purchase-${purchase.id}`}>
						<AccordionTrigger>
							<div className="flex justify-between w-full">
								<span>
									Purchase {purchase.id} -{" "}
									{new Date(purchase.purchase_date).toLocaleDateString()}
								</span>
								<a
									href={`/purchases/${purchase.id}`}
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
											{purchase.purchase_products.map((item) => (
												<TableRow key={`${purchase.id}-${item.product.name}`}>
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
								<div>
									<h3 className="font-semibold">Parts</h3>
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
											{purchase.purchase_parts.map((item) => (
												<TableRow key={`${purchase.id}-${item.part.name}`}>
													<TableCell>{item.part.name}</TableCell>
													<TableCell>${item.part.price.toFixed(2)}</TableCell>
													<TableCell>{item.quantity}</TableCell>
													<TableCell>
														${(item.part.price * item.quantity).toFixed(2)}
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
