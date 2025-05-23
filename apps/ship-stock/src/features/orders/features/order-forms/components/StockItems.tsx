import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelectItemsView } from "@/features/items/api/selectItemsView";
import { useStockQuantities } from "../hooks/useStockQuantities";
import StockItemsFormFields from "./StockItemsFormFields";
import StockItemsSummary from "./StockItemsSummary";
import StockItemActions from "./StockItemActions";
import {
  AddressName,
  ItemType,
  StockItemFormData,
  StockItemName,
} from "../types";
import { useSelectAddresses } from "@/features/stockpiles/api/selectAddresses";
import FormErrors from "../../../../../components/FormErrors";

interface StockItemProps {
  name: StockItemName;
  address_name?: AddressName;
  title?: string;
  allowedTypes?: ItemType[];
  readOnly?: boolean;
  showPrice?: boolean;
  showQuantity?: boolean;
  onUpdate?: (vals?: unknown) => void;
  packageMode?: boolean;
}

const StockItems = ({
  name,
  address_name = "from_shipping_address_id",
  title,
  allowedTypes = ["part", "product", "service", "package"],
  showPrice = false,
  showQuantity = true,
  readOnly = false,
  onUpdate,
  packageMode = false,
}: StockItemProps) => {
  const { data: items } = useSelectItemsView();
  const form = useFormContext();
  const { data: addresses } = useSelectAddresses();
  const { fields, append, remove } = useFieldArray({ name });
  const { getItemQuantities } = useStockQuantities(name, address_name);

  const address = addresses?.find(
    (a) => String(a.id) === form.watch(address_name),
  );

  const copyRow = (index: number) => {
    const rowToCopy = form.getValues(`${name}.${index}`);
    append({ ...rowToCopy });
  };

  const handleAppend = (type: ItemType) => {
    append({
      item_type: type,
      item_id: "",
      quantity_change: 1,
      price: 1,
      tax: 20,
      total: 1.2,
    } as StockItemFormData);
  };

  return (
    <div className="">
      <h2 className="mb-2 font-medium text-base">
        {title || `Stock Changes ${address?.name ? `(${address.name})` : ""}`}
      </h2>

      {!readOnly ? (
        <>
          <StockItemsFormFields
            onUpdate={onUpdate}
            showPrice={showPrice}
            showQuantity={showQuantity}
            name={name}
            fields={fields}
            items={items || []}
            form={form}
            getItemQuantities={getItemQuantities}
            onCopy={copyRow}
            onRemove={remove}
            allowedTypes={allowedTypes}
            packageMode={packageMode}
          />
          <StockItemActions
            allowedTypes={allowedTypes}
            onAppend={handleAppend}
          />
        </>
      ) : (
        <StockItemsSummary name={name} addressName={address_name} />
      )}

      <div className="mt-4">
        <FormErrors
          title="Stock Items Errors"
          fieldPrefix={name}
          fields={[name, ...fields.map((field) => field.id)]}
        />
      </div>
    </div>
  );
};

export default StockItems;
