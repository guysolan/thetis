import React from "react";
import { Address as AddressType } from "../types";
type Props = {
    title: string;
    address: AddressType;
};
const Address = ({ title, address }: Props) => {
    return (
        <div className="mb-4 text-neutral-600 text-sm">
            <h2 className="font-semibold text-neutral-800">{title}</h2>
            {address
                ? (
                    <>
                        <p>{address?.name}</p>
                        <p>{address?.line_1}</p>
                        <p>{address?.line_2}</p>
                        <p>{address?.city}</p>
                        <p>{address?.code}</p>
                        <p>{address?.country}</p>
                    </>
                )
                : <p>_</p>}
        </div>
    );
};

export default Address;
