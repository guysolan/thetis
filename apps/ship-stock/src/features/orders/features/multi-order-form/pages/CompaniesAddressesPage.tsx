import BuyerSeller from "../../../../companies/components/BuyerSeller";
import { useFormContext, useWatch } from "react-hook-form";

export function CompaniesAddressesPage() {
	const { control } = useFormContext();
	const orderType = useWatch({ control, name: "order_type" });

	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-2 font-semibold text-xl">
					Companies & Addresses
				</h2>
				<p className="text-muted-foreground text-sm">
					Select the companies, addresses, and contacts for this
					order
				</p>
			</div>

			<BuyerSeller isShipment={orderType === "ship"} />
		</div>
	);
}
