import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseForm from "../features/order-forms/features/purchase-form/PurchaseForm";
import SaleForm from "../features/order-forms/features/sale-form/SaleForm";
import BuildForm from "../features/order-forms/features/build-form/BuildForm";
import { Banknote, Hammer, Info, ShoppingCart, Truck } from "lucide-react";
import ShipmentForm from "../features/order-forms/features/shipment-form/ShipmentForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const OrderForm: React.FC = () => {
	return (
		<Tabs defaultValue="build">
			<div className="overflow-x-scroll">
				<TabsList className="my-2">
					<TabsTrigger
						className="flex flex-row gap-2"
						value="build"
					>
						<Hammer size={16} />Build
					</TabsTrigger>
					<TabsTrigger
						className="flex flex-row gap-2"
						value="purchase"
					>
						<ShoppingCart size={16} />Purchase
					</TabsTrigger>
					<TabsTrigger
						className="flex flex-row gap-2"
						value="sale"
					>
						<Banknote size={16} />Sell
					</TabsTrigger>
					<TabsTrigger
						className="flex flex-row gap-2"
						value="shipment"
					>
						<Truck size={16} />Ship
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="purchase">
				<Alert className="mb-4">
					<Info size={20} />
					<AlertTitle>Purchase Order</AlertTitle>
					<AlertDescription>
						Purchase forms are for buying stock from a supplier.
					</AlertDescription>
				</Alert>
				<PurchaseForm />
			</TabsContent>
			<TabsContent value="sale">
				<Alert className="mb-4">
					<Info size={20} />

					<AlertTitle>Sale Order</AlertTitle>
					<AlertDescription>
						Sale forms are for selling stock to a customer.
					</AlertDescription>
				</Alert>
				<SaleForm />
			</TabsContent>
			<TabsContent value="build">
				<Alert className="mb-4">
					<Info size={20} />
					<AlertTitle>Build Order</AlertTitle>
					<AlertDescription>
						Pay for products to be build using parts you already
						have purchased.
					</AlertDescription>
				</Alert>
				<BuildForm />
			</TabsContent>
			<TabsContent value="shipment">
				<Alert className="mb-4">
					<Info size={20} />

					<AlertTitle>Shipment Order</AlertTitle>
					<AlertDescription>
						Shipment forms are for moving packages of stock between
						addresses where you keep stock.
					</AlertDescription>
				</Alert>
				<ShipmentForm />
			</TabsContent>
		</Tabs>
	);
};
