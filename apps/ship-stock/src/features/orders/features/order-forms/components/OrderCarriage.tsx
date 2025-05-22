import Input from "../../../../../components/Input";
import Select from "../../../../../components/Select";
import { currencyKeys } from "../../../../../constants/currencies";
import { useFormContext } from "react-hook-form";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import EditCard from "../../../../../components/EditCard";
import DateRangePicker from "../../../../../components/DateRangePicker";

const OrderCarriage = () => {
  const { watch } = useFormContext();

  const currency = watch("currency");
  const carriage = watch("carriage");

  const editContent = (
    <div className="flex flex-col gap-4">
      <DateRangePicker name="delivery_date" label="Delivery Date" />
      <Input name="carriage" label="Carriage" type="number" step="0.01" />
    </div>
  );

  const previewContent = (
    <div className="flex flex-col gap-y-2">
      <NumberFlow
        value={carriage}
        format={{ style: "currency", currency: currency }}
      />
    </div>
  );

  return (
    <EditCard title="Order Carriage" previewContent={previewContent}>
      {editContent}
    </EditCard>
  );
};

export default OrderCarriage;
