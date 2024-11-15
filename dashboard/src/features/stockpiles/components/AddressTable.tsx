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
                        Address
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
                        <TableCell>
                            {address.line_1}
                        </TableCell>
                        <TableCell>
                            {address.city}
                        </TableCell>
                        <TableCell>
                            {address.region}
                        </TableCell>
                        <TableCell>
                            {address
                                    .holds_stock
                                ? "Yes"
                                : "No"}
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
