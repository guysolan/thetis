import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressForm from "@/features/stockpiles/components/AddressForm";
import useDeleteAddress from "@/features/stockpiles/api/deleteAddress";
import ActionPopover from "@/components/ActionPopover";
import { PlusCircle } from "lucide-react";
import { Address } from "../types";

const CompanyAddressBook = (
    { addresses: companyAddresses }: { addresses: Address["Row"][] },
) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { mutate: deleteAddress } = useDeleteAddress();

    const displayAddresses = isExpanded
        ? companyAddresses
        : companyAddresses.slice(0, 2);

    return (
        <div className="space-y-2">
            {/* Display addresses in a more compact format */}
            <div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {displayAddresses?.map((address) => (
                    <Card key={address.id} className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="text-md">
                                <span className="font-medium">
                                    {address.name}
                                </span>
                                <div className="text-muted-foreground text-sm">
                                    {address.line_1}
                                    {address.line_2 && `, ${address.line_2}`}
                                    <br />
                                    {address.city}, {address.region}{" "}
                                    {address.code}
                                </div>
                            </div>
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
                        </div>
                    </Card>
                ))}
            </div>

            {/* Show expand/collapse button if more than 2 addresses */}
            {companyAddresses.length > 2 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full text-center text-muted-foreground text-xs hover:text-primary"
                >
                    {isExpanded
                        ? "Show Less"
                        : `Show ${companyAddresses.length - 2} More`}
                </button>
            )}
        </div>
    );
};

export default CompanyAddressBook;
