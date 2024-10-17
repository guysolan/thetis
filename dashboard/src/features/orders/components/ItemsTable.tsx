import React from "react";

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
	parts_before: number;
	parts_change: number;
	parts_after: number;
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
							className={Number(part.parts_before) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(part.parts_before)
								? part.parts_before
								: Number(part.parts_before).toFixed(2)}
						</TableCell>
						<TableCell
							className={Number(part.parts_change) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(part.parts_change)
								? part.parts_change
								: Number(part.parts_change).toFixed(2)}
						</TableCell>
						<TableCell
							className={Number(part.parts_after) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(part.parts_after)
								? part.parts_after
								: Number(part.parts_after).toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
