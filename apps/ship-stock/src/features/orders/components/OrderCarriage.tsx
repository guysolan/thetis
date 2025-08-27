import Input from "../../../components/Input";
import { useFormContext } from "react-hook-form";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import EditCard from "../../../components/EditCard";
import DateRangePicker from "../../../components/DateRangePicker";

const OrderCarriage = () => {
  const { watch } = useFormContext();

  const currency = watch("currency");
  const carriage = watch("carriage");
  const deliveryDates = watch("delivery_dates") || [null, null];

  const editContent = (
    <div className="flex flex-col gap-4">
      <DateRangePicker name="delivery_dates" label="Delivery Date" />
      <Input name="carriage" label="Carriage" type="number" step="0.01" />
    </div>
  );

  const previewContent = (
    <div className="flex flex-col gap-y-2">
      <p>
        {deliveryDates[0]
          ? dayjs(deliveryDates[0]).format("DD/MM/YYYY")
          : "Not set"} - {deliveryDates[1]
          ? dayjs(deliveryDates[1]).format("DD/MM/YYYY")
          : "Not set"}
      </p>
      <NumberFlow
        value={carriage || 0}
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
