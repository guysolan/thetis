import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayPickerProvider } from "react-day-picker";
import PurchaseForm from "../features/order-forms/features/purchase-form/PurchaseForm";
import SaleForm from "../features/order-forms/features/sale-form/SaleForm";
import BuildForm from "../features/order-forms/features/build-form/BuildForm";
import { Banknote, Hammer, ShoppingCart, Truck } from "lucide-react";
import ShipmentForm from "../features/order-forms/features/shipment-form/ShipmentForm";

export const OrderForm: React.FC = () => {
	return (
		<Tabs defaultValue="build">
			<div className="overflow-x-scroll">
				<TabsList className="">
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
				<p>Purchase forms are for buying stock from a supplier.</p>
				<PurchaseForm />
			</TabsContent>
			<TabsContent value="sale">
				<p>Sale forms are for selling stock to a customer.</p>
				<SaleForm />
			</TabsContent>
			<TabsContent value="build">
				<p>Build forms are for creating stock from parts materials.</p>
				<BuildForm />
			</TabsContent>
			<TabsContent value="shipment">
				<p>
					Shipment forms are form moving packages of stock between
					addresses where you keep stock.
				</p>
				<ShipmentForm />
			</TabsContent>
		</Tabs>
	);
};
