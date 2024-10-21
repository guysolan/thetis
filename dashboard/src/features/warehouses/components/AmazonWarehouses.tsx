import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAmazonInventory } from "../../amazon/api/selectAmazonInventory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const AmazonWarehouses = () => {
    const { data: allInventories } = useAmazonInventory();

    return (
        <div className="flex flex-col gap-4 py-4">
            {Object.entries(allInventories).map(([key, warehouse]) => (
                <Card key={key}>
                        <CardHeader>
                        <CardTitle>{key}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead>Inbound</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {warehouse.map((w) => (
                                    <TableRow key={w.name}>
                                        <TableCell>{w.name}</TableCell>
                                        <TableCell>{w.total}</TableCell>
                                        <TableCell>{w.available}</TableCell>
                                        <TableCell>{w.inbound}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AmazonWarehouses;
