import DatePicker from "../../../components/DatePicker";
import Select from "../../../components/Select";
import { currencyKeys } from "../../../constants/currencies";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import EditCard from "../../../components/EditCard";
import {
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  FileText,
  Globe2,
  Hash,
  Hash as HashIcon,
  PlaneTakeoff,
  Scale,
  Truck,
} from "lucide-react";
import { UnitOfMeasurementSelect } from "./UnitOfMeasurement";
import { ReasonForExportSelect } from "./ReasonForExportSelect";
import { IncotermsSelect } from "./IncotermsSelect";
import { ModeOfTransportSelect } from "./ModeOfTransportSelect";
import Input from "../../../components/Input";
import { useState } from "react";
import { Button } from "@thetis/ui/button";

const OrderDetails = () => {
  const { watch } = useFormContext();
  const [showShippingDetails, setShowShippingDetails] = useState(false);

  const orderDate = watch("order_date");
  const currency = watch("currency");
  const unitOfMeasurement = watch("unit_of_measurement");
  const reasonForExport = watch("reason_for_export");
  const modeOfTransport = watch("mode_of_transport");
  const incoterms = watch("incoterms");
  const shipmentNumber = watch("shipment_number");
  const airwaybill = watch("airwaybill");
  const referenceNumber = watch("reference_number");

  const getPlaceholder = (value: string | undefined) => {
    return value || "Not specified";
  };

  const editContent = (
    <div className="flex flex-col gap-4">
      <div className="gap-4 grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <DatePicker name="order_date" label="Order Date" />
          <Select
            name="currency"
            label="Currency"
            options={currencyKeys.map((o) => ({
              label: o,
              value: o,
            }))}
          />
          <UnitOfMeasurementSelect />
          <Input type="text" name="shipment_number" label="Shipment Number" />
        </div>
        <div className="flex flex-col gap-4">
          <ReasonForExportSelect />
          <ModeOfTransportSelect />
          <IncotermsSelect />
          <Input type="text" name="airwaybill" label="Air Waybill" />
        </div>
      </div>
      <div className="w-1/2">
        <Input type="text" name="reference_number" label="Reference Number" />
      </div>
    </div>
  );

  const previewContent = (
    <div className="flex flex-col gap-4">
      <div className="gap-4 grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-700">
            <Calendar size={20} />
            <div>
              <p className="text-gray-700 text-sm">Order Date</p>
              <p className="font-medium">
                {orderDate
                  ? dayjs(orderDate).format("DD/MM/YYYY")
                  : "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <DollarSign size={20} />
            <div>
              <p className="text-gray-700 text-sm">Currency</p>
              <p className="font-medium">{getPlaceholder(currency)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <Scale size={20} />
            <div>
              <p className="text-gray-700 text-sm">Unit of Measurement</p>
              <p className="font-medium">{getPlaceholder(unitOfMeasurement)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <Hash size={20} />
            <div>
              <p className="text-gray-700 text-sm">Shipment Number</p>
              <p className="font-medium">{getPlaceholder(shipmentNumber)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-gray-700">
            <FileText size={20} />
            <div>
              <p className="text-gray-700 text-sm">Reason for Export</p>
              <p className="font-medium">{getPlaceholder(reasonForExport)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <Truck size={20} />
            <div>
              <p className="text-gray-700 text-sm">Mode of Transport</p>
              <p className="font-medium">{getPlaceholder(modeOfTransport)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <Globe2 size={20} />
            <div>
              <p className="text-gray-700 text-sm">Incoterms</p>
              <p className="font-medium">{getPlaceholder(incoterms)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <PlaneTakeoff size={20} />
            <div>
              <p className="text-gray-700 text-sm">Air Waybill</p>
              <p className="font-medium">{getPlaceholder(airwaybill)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex items-center gap-4 text-gray-700">
          <HashIcon size={20} />
          <div>
            <p className="text-gray-700 text-sm">Reference Number</p>
            <p className="font-medium">{getPlaceholder(referenceNumber)}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <EditCard title="Order Details" previewContent={previewContent}>
      {editContent}
    </EditCard>
  );
};

export default OrderDetails;
