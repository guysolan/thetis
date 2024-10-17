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
import { Badge } from "../../../components/ui/badge";
import { OrderView } from "../types";

interface ExistingOrdersProps {
	orders: OrderView[];
}

export const OrderHistory: React.FC<ExistingOrdersProps> = ({
	orders,
}) => {
	return (
		<div className="mt-4">
			<h2 className="mb-2 font-semibold text-xl">Existing Orders</h2>
			<Accordion type="single" collapsible className="w-full">
				{orders.map((order) => (
					<AccordionItem
						key={order.id}
						value={`order-${order.order_id}-${order.order_type}-${order.order_date}`}
					>
						<AccordionTrigger className="flex-row-reverse gap-x-2">
							<div className="flex justify-between w-full">
								<span className="flex gap-2">
									Order {order.id} -{" "}
									{new Date(order.order_date)
										.toLocaleDateString()}
									<Badge>{order.order_type}</Badge>
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
						<AccordionContent className="px-4">
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
									{order.items?.map((item: any) => (
										<TableRow
											key={`${order.item_id}-${item.item_name}`}
										>
											<TableCell>
												{item.item_name}
											</TableCell>
											<TableCell>
												${item.price?.toFixed(2)}
											</TableCell>
											<TableCell>
												{item.quantity}
											</TableCell>
											<TableCell>
												${item.total?.toFixed(2)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
