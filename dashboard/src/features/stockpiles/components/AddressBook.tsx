import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import useDeleteAddress from "@/features/stockpiles/api/deleteAddress";
import { useSelectAddresses } from "../../../features/stockpiles/api/selectAddresses";
import ActionPopover from "@/components/ActionPopover";

const AddressBook = () => {
    const { data: addresses } = useSelectAddresses();
    const { mutate: deleteAddress } = useDeleteAddress();
    return (
        <section className="gap-4 grid lg:grid-cols-2 pt-4">
            {addresses?.map((address) => (
                <Card key={address.id} className="flex flex-col">
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-semibold text-lg truncate">
                            {address.name}
                        </CardTitle>
                        <ActionPopover
                            title={address.name ?? "Address"}
                            editForm={
                                <AddressForm
                                    operation="upsert"
                                    address={address}
                                />
                            }
                            deleteFunction={() =>
                                deleteAddress(address.id as number)}
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground text-sm">
                            {address.line_1}
                            <br />
                            {address.line_2 && (
                                <>
                                    {address.line_2}
                                    <br />
                                </>
                            )}
                            {address.city}, {address.region} {address.code}
                            <br />
                            {address.country}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
};

export default AddressBook;
