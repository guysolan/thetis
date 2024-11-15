import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { OrderView } from "../types";
import { Separator } from "@/components/ui/separator";
import DeleteOrder from "./DeleteOrder";
import { Edit, ExternalLink, Trash, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import OrderBreakdown from "../order-history/components/OrderBreakdown";
import Sheet from "@/components/Sheet";
import EditOrderForm from "./EditOrderForm";
import { Link } from "@tanstack/react-router";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import PopoverOption from "@/components/PopoverOption";
interface ExistingOrdersProps {
	orders: OrderView[];
}

export const OrderHistory: React.FC<ExistingOrdersProps> = ({
	orders,
}) => {
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
									<Link
										to="/documents/orders/$orderId"
										params={{ orderId: String(order.order_id) }}
										target="_blank"
										onClick={(e) => e.stopPropagation()}
										className="flex items-center gap-2 text-blue-500 hover:underline"
									>
										<span className="sr-only md:not-sr-only">
											Open in new tab
										</span>
										<ExternalLink size={20} />
									</Link>
									<Separator
										orientation="vertical"
										className="h-4"
									/>
									<Popover>
										<PopoverTrigger
											onClick={(e) => e.stopPropagation()}
											asChild
										>
											<Button variant="ghost" size="icon">
												<MoreVertical size={20} />
											</Button>
										</PopoverTrigger>
										<PopoverContent
											align="end"
											side="bottom"
											className="flex flex-col gap-1 p-1"
										>
											<Sheet
												trigger={
													<Button
														className="justify-start gap-2 px-2"
														variant="ghost"
													>
														<Edit size={20} />Edit
													</Button>
												}
												title="Edit Order"
											>
												<EditOrderForm order={order} />
											</Sheet>
											<DeleteOrder
												trigger={
													<Button
														variant="ghost"
														className="justify-start gap-2 px-2 text-red-500 hover:text-red-600"
													>
														<Trash2 size={20} />Delete
													</Button>
												}
												orderId={order.order_id as number}
											/>
										</PopoverContent>
									</Popover>
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
