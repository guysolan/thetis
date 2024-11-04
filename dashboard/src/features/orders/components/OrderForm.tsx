import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PurchaseForm from '../order-forms/components/PurchaseForm';
import SaleForm from '../order-forms/components/SaleForm';
import BuildForm from '../order-forms/components/BuildForm';
import { Banknote, Hammer, ShoppingCart, Truck } from 'lucide-react';
import ShipmentForm from '../order-forms/components/ShipmentForm';

export const OrderForm: React.FC = () => {
	
	return (
		<>
			<Tabs defaultValue="build">
				<TabsList className="mt-4">
					<TabsTrigger className='flex flex-row gap-2' value="build"><Hammer size={16} />Build</TabsTrigger>
					<TabsTrigger className='flex flex-row gap-2' value="purchase"><ShoppingCart size={16} />Purchase</TabsTrigger>
					<TabsTrigger className='flex flex-row gap-2' value="sale"><Banknote size={16} />Sell</TabsTrigger>
					<TabsTrigger className='flex flex-row gap-2' value="shipment"><Truck size={16} />Ship</TabsTrigger>
				</TabsList>
				<TabsContent value="purchase"><PurchaseForm /></TabsContent>
				<TabsContent value="sale"><SaleForm /></TabsContent>
				<TabsContent value="build"><BuildForm /></TabsContent>
				<TabsContent value="shipment"><ShipmentForm /></TabsContent>
			</Tabs>
		</>
	);
};
