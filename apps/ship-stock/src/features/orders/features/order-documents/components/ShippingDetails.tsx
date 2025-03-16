import {
  FileText,
  Truck,
  Globe2,
  Scale,
  Hash,
  PlaneTakeoff,
} from "lucide-react";

interface ShippingDetails {
  reasonForExport: string;
  modeOfTransport: string;
  incoterms: string;
  unitOfMeasurement: string;
  shipmentNumber: string;
  airwaybill: string;
}

interface ShippingDetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}

const ShippingDetailItem: React.FC<ShippingDetailItemProps> = ({
  icon,
  label,
  value,
  valueClassName = "capitalize",
}) => (
  <div className="flex items-center gap-4 text-gray-700">
    <div>{icon}</div>
    <div className="!my-0 !py-0">
      <p className="text-gray-700 text-sm">{label}</p>
      <p className={`font-medium ${valueClassName}`}>{value}</p>
    </div>
  </div>
);

const ShippingDetails: React.FC<ShippingDetails> = ({
  reasonForExport,
  modeOfTransport,
  incoterms,
  unitOfMeasurement,
  shipmentNumber,
  airwaybill,
}) => (
  <div className="mt-6 p-4">
    <h3 className="mb-4 font-bold text-lg">Shipping Details</h3>
    <div className="gap-4 grid grid-cols-2">
      <div className="space-y-3">
        <ShippingDetailItem
          icon={<FileText size={20} />}
          label="Reason for Export"
          value={reasonForExport}
        />
        <ShippingDetailItem
          icon={<Truck size={20} />}
          label="Mode of Transport"
          value={modeOfTransport}
        />
        <ShippingDetailItem
          icon={<Globe2 size={20} />}
          label="Incoterms"
          value={incoterms}
          valueClassName="uppercase"
        />
      </div>
      <div className="space-y-3">
        <ShippingDetailItem
          icon={<Scale size={20} />}
          label="Unit of Measurement"
          value={unitOfMeasurement}
        />
        <ShippingDetailItem
          icon={<Hash size={20} />}
          label="Shipment Number"
          value={shipmentNumber}
          valueClassName=""
        />
        <ShippingDetailItem
          icon={<PlaneTakeoff size={20} />}
          label="Airway Bill"
          value={airwaybill}
          valueClassName=""
        />
      </div>
    </div>
  </div>
);

export default ShippingDetails;
