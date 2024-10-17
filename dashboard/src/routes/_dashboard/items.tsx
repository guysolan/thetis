import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sheet from "../../components/Sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ItemComponentsForm from "../../features/items/components/ItemComponentsForm";
import { Database } from "../../database.types";
import { useSelectItemsView } from "../../features/items/api/selectItemsView";
import DeleteItemDialog from "../../features/items/components/DeleteItemDialog";
import { ItemForm } from "../../features/items/components/ItemForm";
import { Badge } from "../../components/ui/badge";
import PageTitle from "../../components/PageTitle";
import { ItemView } from "../../features/items/types.ts";
const ItemsPage = () => {
	const { data: itemsView } = useSelectItemsView();

	return (
		<>
			<PageTitle title="Items">
				<Sheet
					trigger={
						<Button variant="default">
							New Item
						</Button>
					}
					title="Edit"
				>
					<ItemForm item={null} />
				</Sheet>
			</PageTitle>

			<section className="flex flex-col gap-4">
				{itemsView.map((item: ItemView) => (
					<Card key={item.item_id} className="flex flex-col">
						<Accordion type="single" collapsible>
							<AccordionItem value={`item-${item.item_id}`}>
								<CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
									<AccordionTrigger className="flex-row-reverse gap-x-2 pt-0 pr-4">
										<CardTitle className="flex flex-wrap gap-4 font-semibold text-left text-lg text-wrap truncate">
											{item.item_name}
											<Badge>{item.item_type}</Badge>
										</CardTitle>
									</AccordionTrigger>
									<div className="flex flex-row flex-shrink gap-2">
										<Sheet
											trigger={
												<Button variant="default">
													Edit
												</Button>
											}
											title="Edit"
										>
											<ItemForm item={item} />
										</Sheet>
										<DeleteItemDialog
											itemId={item.item_id as number}
										/>
									</div>
								</CardHeader>
								<AccordionContent>
									<CardContent className="flex-grow">
										<Table className="mt-4">
											<TableHeader>
												<TableRow>
													<TableHead>
														Component Name
													</TableHead>
													<TableHead>
														Quantity per Item
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{item?.components?.map((
													c: any,
												) => (
													<TableRow
														key={String(
															c.component_item_id,
														)}
													>
														<TableCell>
															{c.component_name}
														</TableCell>
														<TableCell>
															{c.quantity}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
										<Sheet
											trigger={
												<Button
													size="lg"
													className="gap-x-2 mt-4 w-full"
													variant="secondary"
												>
													<Pencil size={16} />
													Edit
												</Button>
											}
											title={item.item_name}
											description={`Make changes to the ${item.item_name} details here. Click save when you're done.`}
										>
											<ItemComponentsForm
												defaultValues={{
													item_components: item
														.components
														?.map((ic) => ({
															quantity:
																ic.quantity,
															parent_item_id:
																String(
																	item.item_id,
																),
															component_item_id:
																String(
																	ic.component_item_id,
																),
														})),
												}}
											/>
										</Sheet>
									</CardContent>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</Card>
				))}
			</section>
		</>
	);
};

export const Route = createFileRoute("/_dashboard/items")({
	component: ItemsPage,
});
