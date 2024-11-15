import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Component = {
    component_id: number;
    component_name: string;
    component_quantity: number;
};
interface Props {
    components: Component[];
}
export default function ComponentsTable({ components }: Props) {
    return (
        <Table className="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Component Name</TableHead>
                    <TableHead>Quantity per Item</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {components.map((c: any) => (
                    <TableRow key={String(c.component_id)}>
                        <TableCell>{c.component_name}</TableCell>
                        <TableCell>{c.component_quantity}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
