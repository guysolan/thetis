import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ActionPopover from "@/components/ActionPopover";
import AddressForm from "./AddressForm";
import useDeleteAddress from "../api/deleteAddress";
import { Address } from "../types";
import { Badge } from '../../../components/ui/badge';

interface Props {
    addresses: Address["Row"][];
    companyId?: number;
}
const AddressTable = ({ companyId, addresses }: Props) => {

    const { mutate: deleteAddress } = useDeleteAddress();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Name
                    </TableHead>
                    <TableHead>
                        Line 1
                    </TableHead>
                    <TableHead>
                        Line 2
                    </TableHead>
                    <TableHead>
                        City
                    </TableHead>
                    <TableHead>
                        Region
                    </TableHead>
                    <TableHead>
                        Stock
                    </TableHead>
                    <TableHead>
                        Company
                    </TableHead>
                    <TableHead className="w-[100px]">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {addresses?.map((
                    address,
                ) => (
                    <TableRow
                        key={address.id}
                    >
                        <TableCell>
                            {address.name}
                        </TableCell>
                        <TableCell className='min-w-32'>
                            {address.line_1}
                        </TableCell>
                        <TableCell >
                            {address.line_2}
                        </TableCell>
                        <TableCell >
                            {address.city}
                        </TableCell>
                        <TableCell >
                            {address.region}
                        </TableCell>
                        <TableCell className='min-w-16'>
                            {address
                                .holds_stock
                                ? "Yes"
                                : "No"}
                        </TableCell>
                        <TableCell className='min-w-40'>
                            <Badge >
                                {address?.companies?.name}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <ActionPopover
                                title="Address"
                                editForm={
                                    <AddressForm
                                        address={address}
                                        operation="upsert"
                                        companyId={companyId}
                                    />
                                }
                                deleteFunction={() =>
                                    deleteAddress(
                                        address.id,
                                    )}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AddressTable;
