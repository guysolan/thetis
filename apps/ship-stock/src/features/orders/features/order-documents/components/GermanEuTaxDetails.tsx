import React from "react";
import { FileText, Receipt, LucideIcon } from "lucide-react";

const GERMAN_VAT_NUMBER = "DE357006516";
const GERMAN_EORI_NUMBER = "DE620417468327260";

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

const GermanEuTaxDetails = () => {
  return (
    <div className="mt-4 py-3 border-t text-neutral-800 dark:text-neutral-300 text-sm">
      <h3 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100 text-lg">
        Germany (EU customs)
      </h3>
      <p className="mb-3 text-muted-foreground text-xs">
        VAT ID and EORI for shipments to Europe where these identifiers are required.
      </p>
      <div className="flex flex-wrap gap-24">
        <DetailItem icon={Receipt} label="VAT Number" value={GERMAN_VAT_NUMBER} />
        <DetailItem icon={FileText} label="EORI Number" value={GERMAN_EORI_NUMBER} />
      </div>
    </div>
  );
};

export default GermanEuTaxDetails;
