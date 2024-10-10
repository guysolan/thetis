import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface PurchaseSummaryProps {
	totalCost: number;
	partsConsumed: {
		partId: string;
		partName: string;
		quantity: number;
		currentStock: number;
		remainingStock: number;
	}[];
}

export const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
	totalCost,
	partsConsumed,
}) => {
	return (
		<div className="mt-4 mb-4">
			<h3 className="mb-2 font-semibold">Purchase Summary:</h3>
			<p>Total Cost: ${totalCost.toFixed(2)}</p>
			<h4 className="mt-2 font-semibold">Parts stock changes:</h4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Part Name</TableHead>
						<TableHead>Change</TableHead>
						<TableHead>Current Stock</TableHead>
						<TableHead>Remaining After Purchase</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{partsConsumed.map((part) => (
						<TableRow key={part.partId}>
							<TableCell>{part.partName}</TableCell>
							<TableCell>
								{part.quantity > 0 ? (
									<span style={{ color: "red" }}>- {part.quantity}</span>
								) : (
									<span style={{ color: "green" }}>
										+ {Math.abs(part.quantity)}
									</span>
								)}
							</TableCell>
							<TableCell>{part.currentStock}</TableCell>
							<TableCell>
								{part.remainingStock < 0 ? (
									<span style={{ color: "red" }}>{part.remainingStock}</span>
								) : (
									part.remainingStock
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
