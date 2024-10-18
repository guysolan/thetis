import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface ConsumedComponent {
	component_id: string;
	component_name: string;
	components_before: number;
	components_change: number;
	components_after: number;
}

interface ConsumedComponentsProps {
	consumedComponents: ConsumedComponent[];
}

export const ConsumedComponents: React.FC<ConsumedComponentsProps> = ({ consumedComponents }) => {
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
				{consumedComponents.map((c) => (
					<TableRow key={c.component_id}>
						<TableCell>{c.component_name}</TableCell>
						<TableCell
							className={Number(c.components_before) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(c.components_before)
								? c.components_before
								: Number(c.components_before).toFixed(2)}
						</TableCell>
						<TableCell
							className={Number(c.components_change) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(c.components_change)
								? c.components_change
								: Number(c.components_change).toFixed(2)}
						</TableCell>
						<TableCell
							className={Number(c.components_after) < 0 ? "text-red-500" : ""}
						>
							{Number.isInteger(c.components_after)
								? c.components_after
								: Number(c.components_after).toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
