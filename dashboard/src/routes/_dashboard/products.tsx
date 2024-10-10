import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSelectProductParts } from "../../features/product-parts/selectProductParts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { useUpsertProduct } from "../../features/products/api/upsertProduct";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
	SheetDescription,
	SheetClose,
} from "../../components/ui/sheet";
import { ProductForm } from "../../features/products/components/ProductForm";
import { ScrollArea } from "../../components/ui/scroll-area";

const ProductsPage = () => {
	const { data: products } = useSelectProductParts();
	const [expandedProducts, setExpandedProducts] = useState<number[]>([]);
	const [editingProduct, setEditingProduct] = useState<number | null>(null);
	const upsertProduct = useUpsertProduct();

	const toggleExpansion = (productId: number) => {
		setExpandedProducts((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId],
		);
	};

	const handleEdit = (productId: number) => {
		setEditingProduct(productId);
	};

	const handleSave = (product: any) => {
		upsertProduct.mutate(product);
		setEditingProduct(null);
	};

	return (
		<section className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 p-4">
			{products.map((product) => (
				<Card key={product.id} className="flex flex-col">
					<CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
						<CardTitle className="font-semibold text-lg truncate">
							{product.name}
						</CardTitle>
						<div className="flex space-x-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => toggleExpansion(product.id)}
							>
								{expandedProducts.includes(product.id) ? (
									<ChevronUp className="w-4 h-4" />
								) : (
									<ChevronDown className="w-4 h-4" />
								)}
							</Button>

							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleEdit(product.id)}
									>
										<Pencil className="w-4 h-4" />
									</Button>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Edit {product.name}</SheetTitle>
										<SheetDescription>
											Make changes to the {product.name} details here. Click
											save when you're done.
										</SheetDescription>
									</SheetHeader>
									<ScrollArea className="h-[calc(100vh-10rem)]">
										<ProductForm product={product} />
									</ScrollArea>
								</SheetContent>
							</Sheet>
						</div>
					</CardHeader>
					<CardContent className="flex-grow">
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground text-sm">Quantity</span>
								<span className="font-medium">{product.quantity}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground text-sm">Price</span>
								<span className="font-medium">${product.price.toFixed(2)}</span>
							</div>
							<div className="pt-2">
								<p className="line-clamp-2 text-muted-foreground text-sm">
									{product.description || "No description available"}
								</p>
							</div>
						</div>
						{expandedProducts.includes(product.id) && (
							<Table className="mt-4">
								<TableHeader>
									<TableRow>
										<TableHead>Part Name</TableHead>
										<TableHead>Quantity per Product</TableHead>
										<TableHead>Price</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{product.product_parts.map((pp: any) => (
										<TableRow key={pp.uuid}>
											<TableCell>{pp.part.name}</TableCell>
											<TableCell>{pp.quantity}</TableCell>
											<TableCell>${pp.part.price.toFixed(2)}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			))}
		</section>
	);
};

export const Route = createFileRoute("/_dashboard/products")({
	component: ProductsPage,
});
