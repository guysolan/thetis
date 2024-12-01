import DatePicker from "../../../../../../../components/DatePicker";
import Input from "../../../../../../../components/Input";
import Select from "../../../../../../../components/Select";
import { currencyKeys } from "../../../../../../../constants/currencies";
import { Card } from "@thetis/ui/card";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Button } from "@thetis/ui/button";
import dayjs from "dayjs";
import { EditIcon, Pencil } from "lucide-react";

const SellFormFields = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { watch } = useFormContext();

  const orderDate = watch("order_date");
  const currency = watch("currency");
  const carriage = watch("carriage");

  return (
    <Card>
      <div className="flex flex-row justify-between items-center space-y-0 p-4 pb-2">
        <h3 className="font-medium text-base">Order Details</h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil size={20} />
        </Button>
      </div>

      <div className="px-4 pb-4">
        {isEditing ? (
          <div className="flex flex-col gap-4">
            <DatePicker name="order_date" label="Order Date" />
            <div className="flex flex-row gap-4">
              <Input
                name="carriage"
                label="Carriage"
                type="number"
                step="0.01"
              />
              <Select
                name="currency"
                label="Currency"
                options={currencyKeys.map((o) => ({
                  label: o,
                  value: o,
                }))}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <span>{dayjs(orderDate).format("DD/MM/YYYY")}</span>
            <NumberFlow
              value={carriage}
              format={{ style: "currency", currency: currency }}
            />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="px-4 pb-4">
          <Button type="button" onClick={() => setIsEditing(false)}>
            Done
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SellFormFields;
