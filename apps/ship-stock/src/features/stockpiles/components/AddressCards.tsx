import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@thetis/ui/card";
import { useSelectAddresses } from "../api/selectAddresses";
import { Badge } from "@thetis/ui/badge";
import AddressActionPopover from './AddressActionPopover';

const AddressCards = () => {
    const { data: addresses } = useSelectAddresses();
    return (
        <section className="gap-4 grid lg:grid-cols-2">
            {addresses?.map((address) => (
                <Card key={address?.id} className="flex flex-col">
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                        <CardTitle className="font-semibold text-lg truncate">
                            {address?.name}
                        </CardTitle>
                        <AddressActionPopover
                            address={address}
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
                    <CardFooter>
                        <Badge>{address.companies?.name}</Badge>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
};

export default AddressCards;
