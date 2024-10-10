import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface PartsSummary {
	id: string;
	name: string;
	partsBefore: number;
	partsChange: number;
	partsAfter: number;
}

interface PartsTableProps {
	partsSummary: PartsSummary[];
}

export const PartsTable: React.FC<PartsTableProps> = ({ partsSummary }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Before</TableHead>
					<TableHead>Change</TableHead>
					<TableHead>After</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{partsSummary.map((part) => (
					<TableRow key={part.id}>
						<TableCell>{part.name}</TableCell>
						<TableCell
							className={Number(part.partsBefore) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(part.partsBefore)
								? part.partsBefore
								: Number(part.partsBefore).toFixed(2)}
						</TableCell>
						<TableCell
							className={Number(part.partsChange) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(part.partsChange)
								? part.partsChange
								: Number(part.partsChange).toFixed(2)}
						</TableCell>
						<TableCell
							className={Number(part.partsAfter) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(part.partsAfter)
								? part.partsAfter
								: Number(part.partsAfter).toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
