import { Button } from "@/components/ui/button";
import PriceItems from "@/features/orders/features/order-forms/components/PriceItems";
import StocktakeDiscrepancy from "../../components/StockDiscrepency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StocktakeFormFields = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Stocktake</CardTitle>
				</CardHeader>
				<CardContent>
					<PriceItems />
				</CardContent>
			</Card>
			<Button type="submit">Save Changes</Button>
			<Card>
				<CardHeader>
					<CardTitle>Stock Discrepancy</CardTitle>
				</CardHeader>
				<CardContent>
					<StocktakeDiscrepancy />
				</CardContent>
			</Card>
		</>
	);
};

export default StocktakeFormFields;
