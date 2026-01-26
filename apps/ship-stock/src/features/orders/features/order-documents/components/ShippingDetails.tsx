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
  referenceNumber: string;
}

type ShippingDetailsOptions = {
  show: boolean;
  reasonForExport: boolean;
  modeOfTransport: boolean;
  incoterms: boolean;
  unitOfMeasurement: boolean;
  shipmentNumber: boolean;
  airwaybill: boolean;
  referenceNumber: boolean;
};

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

const ShippingDetails: React.FC<
  ShippingDetails & { options?: ShippingDetailsOptions }
> = ({
  reasonForExport,
  modeOfTransport,
  incoterms,
  unitOfMeasurement,
  shipmentNumber,
  airwaybill,
  referenceNumber,
  options = {
    show: true,
    reasonForExport: true,
    modeOfTransport: true,
    incoterms: true,
    unitOfMeasurement: true,
    shipmentNumber: true,
    airwaybill: true,
    referenceNumber: true,
  },
}) => {
  if (!options.show) {
    return null;
  }

  return (
    <div className="gap-4 grid grid-cols-2">
      <div className="space-y-3">
        {options.reasonForExport && (
          <ShippingDetailItem
            icon={<FileText size={20} />}
            label="Reason for Export"
            value={reasonForExport}
          />
        )}
        {options.modeOfTransport && (
          <ShippingDetailItem
            icon={<Truck size={20} />}
            label="Mode of Transport"
            value={modeOfTransport}
          />
        )}
        {options.incoterms && (
          <ShippingDetailItem
            icon={<Globe2 size={20} />}
            label="Incoterms"
            value={incoterms}
            valueClassName="uppercase"
          />
        )}
        {options.unitOfMeasurement && (
          <ShippingDetailItem
            icon={<Scale size={20} />}
            label="Unit of Measurement"
            value={unitOfMeasurement}
          />
        )}
      </div>
      <div className="space-y-3">
        {options.shipmentNumber && (
          <ShippingDetailItem
            icon={<Hash size={20} />}
            label="Shipment Number"
            value={shipmentNumber}
            valueClassName=""
          />
        )}
        {options.airwaybill && (
          <ShippingDetailItem
            icon={<PlaneTakeoff size={20} />}
            label="Airway Bill"
            value={airwaybill}
            valueClassName=""
          />
        )}
        {options.referenceNumber && (
          <ShippingDetailItem
            icon={<Hash size={20} />}
            label="Reference Number"
            value={referenceNumber}
            valueClassName=""
          />
        )}
      </div>
    </div>
  );
};

export default ShippingDetails;
