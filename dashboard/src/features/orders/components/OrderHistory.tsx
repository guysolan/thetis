import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { OrderView } from "../types";
import { Separator } from "@/components/ui/separator";
import { Dock, ExternalLink, Ship, Stamp, Tag } from "lucide-react";
import dayjs from "dayjs";
import OrderBreakdown from "../features/order-history/components/OrderBreakdown";
import EditOrderForm from "./EditOrderForm";
import { Link } from "@tanstack/react-router";

import ActionPopover from "@/components/ActionPopover";
import { useDeleteOrder } from "../api/deleteOrder";
import { Button } from "../../../components/ui/button";
import { DocumentLinks } from "./DocumentLinks";

interface ExistingOrdersProps {
	orders: OrderView[];
}

export const OrderHistory: React.FC<ExistingOrdersProps> = ({
	orders,
}) => {
	const { mutate: deleteOrder } = useDeleteOrder();
	return (
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
									<h2 className="underline-offset-2">
										Order {order.order_id}
									</h2>
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
								<ActionPopover
									title={`Order ${order.order_id}`}
									editForm={<EditOrderForm order={order} />}
									deleteFunction={() =>
										deleteOrder(order.order_id)}
								>
									<DocumentLinks
										orderId={order.order_id}
										orderType={order.order_type}
									/>
								</ActionPopover>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4">
						<OrderBreakdown order={order} />
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
