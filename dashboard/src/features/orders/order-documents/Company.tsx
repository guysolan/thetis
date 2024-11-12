import React from "react";
interface Props {
    title: string;
    name: string;
    address: string;
    email: string;
}
const Company = ({ title,name, address, email }: Props) => {
    return (
        <div>
            <h2 className="mb-2 font-semibold text-xl">{title}</h2>
            <p>Name: {name}</p>
            <p>Address: {address}</p>
            <p>Contact: {email}</p>
        </div>
    );
};

export default Company;
