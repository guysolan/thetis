import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PurchaseForm from './PurchaseForm';
import SaleForm from './SaleForm';
import BuildForm from './BuildForm';



export const OrderForm: React.FC = () => {
	
	return (
		<>
			<Tabs defaultValue="build">
				<TabsList className="mt-4">
					<TabsTrigger value="build">Build</TabsTrigger>
					<TabsTrigger value="purchase">Purchase</TabsTrigger>
					<TabsTrigger value="sale">Sale</TabsTrigger>
					<TabsContent value="shipment"></TabsContent>
					<TabsContent value="stocktake"></TabsContent>
				</TabsList>
				<TabsContent value="purchase"><PurchaseForm /></TabsContent>
				<TabsContent value="sale"><SaleForm /></TabsContent>
				<TabsContent value="build"><BuildForm /></TabsContent>
			</Tabs>
		</>
	);
};
