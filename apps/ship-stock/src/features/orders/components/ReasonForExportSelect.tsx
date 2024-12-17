import { SelectWithInfo } from "@/components/SelectWithInfo";

const reasonsForExport = [
  {
    name: "Against Sale",
    description:
      "Goods are being exported as part of a sales transaction with a buyer in another country.",
  },
  {
    name: "Return/Exchange",
    description:
      "Goods are sent back to the supplier for an exchange or credit.",
  },
  {
    name: "Repair/Service",
    description:
      "Items are exported for repair or servicing with plans for return after the work is completed.",
  },
  {
    name: "Temporary Export",
    description:
      "Goods are temporarily exported for purposes such as demonstration, exhibition, or trial.",
  },
  {
    name: "Gift",
    description:
      "Items are sent as a gift without a commercial transaction involved.",
  },
  {
    name: "Sample",
    description:
      "Goods are sent as samples for demonstration purposes to encourage future sales.",
  },
  {
    name: "Replacement",
    description:
      "Products are sent to replace items that were previously damaged or defective.",
  },
  {
    name: "Donation",
    description:
      "Items are being exported as a charitable contribution without a commercial transaction.",
  },
  {
    name: "Transfer of Ownership",
    description:
      "Goods are moved between branches or subsidiaries of the same company as an internal transfer.",
  },
];

export function ReasonForExportSelect() {
  return (
    <SelectWithInfo
      name="reason_for_export"
      label="Reason for Export"
      options={reasonsForExport}
    />
  );
}
