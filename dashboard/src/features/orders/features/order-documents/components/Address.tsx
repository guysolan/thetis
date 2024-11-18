import React from "react";
import { AddressRow } from "../../../../stockpiles/types";
type Props = {
    title: string;
    address: AddressRow;
};
const Address = ({ title, address }: Props) => {
    return (
        <section>
            <h3>{title}</h3>
            <div>
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
        </section>
    );
};

export default Address;
