import React from "react";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import useDeleteAddress from "@/features/stockpiles/api/deleteAddress";
import ActionPopover from "@/components/ActionPopover";
import { Address } from '../types';

const AddressActionPopover = ({ address }: { address: Address }) => {
    const { mutate: deleteAddress } = useDeleteAddress();
    return (

        <ActionPopover
            title={address?.name ?? "Address"}
            editForm={
                <AddressForm
                    operation="upsert"
                    address={address}
                />
            }
            deleteFunction={() =>
                deleteAddress(address.id as number)}
        />

    );
};

export default AddressActionPopover;
