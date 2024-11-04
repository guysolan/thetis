import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { OrderView } from "../types";
import { Separator } from "../../../components/ui/separator";
import DeleteOrder from "./DeleteOrder";
import { ExternalLink } from "lucide-react";
import dayjs from "dayjs";
import OrderBreakdown from '../order-history/components/OrderBreakdown';

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
						key={order.order_id}
						value={`order-${order.order_id}-${order.order_type}-${order.order_date}`}
					>
						<AccordionTrigger className="flex-row-reverse gap-x-2 [&_h2]:hover:underline hover:no-underline">
							<div className="flex justify-between items-start w-full">
								<div className="flex flex-col gap-1 text-left">
									<div className="flex flex-row items-center gap-2 font-medium text-lg">
										<h2 className="underline-offset-2">Order {order.order_id}</h2>
										<Badge variant="outline">
											{order.order_type}
										</Badge>
									</div>
								
									<span className="font-light text-neutral-600 text-sm">
										{dayjs(order.order_date as string)
											.format("DD MMM YYYY")}
									</span>
										<span className="font-semibold text-neutral-800">
										${order.total_value?.toFixed(2) ??
											"0.00"}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<a
										href={`/orders/${order.order_id}`}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="flex items-center gap-2 text-blue-500 hover:underline"
									>
										<span className="sr-only md:not-sr-only">
											Open in new tab
										</span>
										<ExternalLink className="w-4 h-4" />
									</a>
									<Separator
										orientation="vertical"
										className="h-4"
									/>
									<div onClick={(e) => e.stopPropagation()}>
										{/* Add this wrapper */}

										<DeleteOrder
											orderId={order.order_id as number}
										/>
									</div>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="px-4">
							<OrderBreakdown order={order} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
