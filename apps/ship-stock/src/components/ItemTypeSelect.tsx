import React from "react";
import Select from "./Select";
import { itemTypes } from "@/features/items/types";

const ItemTypeSelect = ({
  name,
  className,
  disabled,
}: { name: string; className?: string; disabled?: boolean }) => {
  return (
    <Select
      name={name}
      options={itemTypes.map((type) => ({ label: type, value: type }))}
      className={className}
      disabled={disabled}
    />
  );
};

export default ItemTypeSelect;
