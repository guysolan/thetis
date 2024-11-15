import React from "react";
import Select from "./Select";
import { itemTypes } from "@/features/items/types";

const ItemTypeSelect = ({ name }: { name: string }) => {
    return (
        <Select
            name={name}
            options={itemTypes.map((type) => ({ label: type, value: type }))}
        />
    );
};

export default ItemTypeSelect;
