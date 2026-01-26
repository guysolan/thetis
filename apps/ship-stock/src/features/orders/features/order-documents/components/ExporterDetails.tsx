import React from "react";
import { Building2, FileText, Receipt, LucideIcon } from "lucide-react";

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => (
  <div className="flex items-center gap-4">
    <Icon className="w-5 h-5 text-neutral-800" />
    <div className="!my-0 !py-0">
      <p className="text-neutral-800 dark:text-neutral-200 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const ExporterDetails = () => {
  return (
    <div className="mt-4 py-3 border-t text-neutral-800 dark:text-neutral-300 text-sm">
      <h3 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100 text-lg">
        Exporter Details
      </h3>

      <div className="flex flex-wrap gap-24">
        <DetailItem icon={Building2} label="UTR Number" value="1202928437" />
        <DetailItem
          icon={FileText}
          label="EORI Number"
          value="GB087773860000"
        />
        <DetailItem icon={Receipt} label="VAT Number" value="GB412039441" />
      </div>
    </div>
  );
};

export default ExporterDetails;
