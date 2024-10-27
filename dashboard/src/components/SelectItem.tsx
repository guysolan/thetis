import React from "react";
import Select from "./Select";

const SelectItemType = ({ name }: { name: string }) => {
    return (
        <Select
            name={name}
            options={[
                { label: "Product", value: "product" },
                { label: "Part", value: "part" },
                { label: "Service", value: "service" },
            ]}
        />
    );
};

export default SelectItemType;
