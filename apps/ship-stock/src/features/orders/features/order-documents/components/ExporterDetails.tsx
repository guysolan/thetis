import React from "react";
import { Building2, FileText, Receipt, LucideIcon } from "lucide-react";

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => (
  <div className="flex items-center gap-4">
    <Icon className="w-5 h-5 text-neutral-500" />
    <div className="!my-0 !py-0">
      <p className="text-neutral-500 text-xs dark:text-neutral-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const ExporterDetails = () => {
  return (
    <div className="mt-4 py-3 border-t text-neutral-700 text-sm dark:text-neutral-300">
      <h3 className="mb-2 font-medium text-lg text-neutral-900 dark:text-neutral-100">
        Exporter Details
      </h3>

      <div className="flex flex-col flex-wrap gap-2">
        <DetailItem icon={Building2} label="UTR Number" value="1202928437" />
        <DetailItem
          icon={FileText}
          label="EORI Number"
          value="GB087773850000"
        />
        <DetailItem icon={Receipt} label="VAT Number" value="GB412039441" />
      </div>
    </div>
  );
};

export default ExporterDetails;
