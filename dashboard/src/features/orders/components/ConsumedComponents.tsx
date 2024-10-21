import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import NumberCell from '../../../components/NumberCell';

interface ConsumedComponent {
	component_id: string;
	component_name: string;
	quantity_before: number;
	quantity_change: number;
	quantity_after: number;
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
						<NumberCell value={c.quantity_before} />
						<NumberCell value={c.quantity_change}/>
						<NumberCell value={c.quantity_after}/>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
