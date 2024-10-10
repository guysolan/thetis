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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const PartsPage = () => {
	const { data: parts } = useSelectParts();
	const [editingPart, setEditingPart] = useState(null);

	const handleEditSubmit = (e) => {
		e.preventDefault();
		// Handle the form submission here
		// You would typically update the part in your database
		setEditingPart(null);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Parts Inventory</CardTitle>
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
											<Button
												variant="outline"
												onClick={() => setEditingPart(part)}
											>
												Edit
											</Button>
										</SheetTrigger>
										<SheetContent>
											<SheetHeader>
												<SheetTitle>Edit Part: {part.name}</SheetTitle>
											</SheetHeader>
											<form
												onSubmit={handleEditSubmit}
												className="space-y-4 mt-4"
											>
												<div>
													<Label htmlFor="price">Price</Label>
													<Input
														id="price"
														defaultValue={part.price}
														type="number"
														step="0.01"
													/>
												</div>
												<div>
													<Label htmlFor="quantity">Quantity</Label>
													<Input
														id="quantity"
														defaultValue={part.quantity}
														type="number"
													/>
												</div>
												<Button type="submit">Save Changes</Button>
											</form>
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
