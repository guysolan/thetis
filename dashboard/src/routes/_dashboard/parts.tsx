import { createFileRoute } from "@tanstack/react-router";
import { useSelectParts } from "../../features/parts/api/selectParts";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { PartForm } from "../../features/parts/components/PartForm";
import { useUpsertPart } from "../../features/parts/api/upsertPart";

const PartsPage = () => {
	const { data: parts } = useSelectParts();

	const { mutate: upsertPart } = useUpsertPart();

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row justify-between space-y-0 pb-4">
				<CardTitle>Parts Inventory</CardTitle>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="default">New Part</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>New Part</SheetTitle>
						</SheetHeader>
						<PartForm onSubmit={upsertPart} />
					</SheetContent>
				</Sheet>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead>Used In Products</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{parts.map((part) => (
							<TableRow key={part.id}>
								<TableCell>{part.name}</TableCell>
								<TableCell>${part.price.toFixed(2)}</TableCell>
								<TableCell>{part.quantity}</TableCell>
								<TableCell>
									{part.product_parts.map((pp) => pp.product.name).join(", ")}
								</TableCell>
								<TableCell>
									<Sheet>
										<SheetTrigger asChild>
											<Button variant="outline">Edit</Button>
										</SheetTrigger>
										<SheetContent>
											<SheetHeader>
												<SheetTitle>Edit Part: {part.name}</SheetTitle>
											</SheetHeader>
											<PartForm onSubmit={upsertPart} defaultValues={part} />
										</SheetContent>
									</Sheet>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export const Route = createFileRoute("/_dashboard/parts")({
	component: PartsPage,
});
