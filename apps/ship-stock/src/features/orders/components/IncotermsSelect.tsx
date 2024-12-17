import { SelectWithInfo } from "@/components/SelectWithInfo";

const incoterms = [
  {
    name: "Ex Works (EXW)",
    description:
      "The seller makes the goods available at their premises. Buyer is responsible for all transportation costs and risks.",
  },
  {
    name: "Free Carrier (FCA)",
    description:
      "Seller delivers goods to carrier nominated by buyer. Risk transfers when goods are delivered to carrier.",
  },
  {
    name: "Carriage Paid To (CPT)",
    description:
      "Seller pays for carriage to destination. Risk transfers when goods are handed to first carrier.",
  },
  {
    name: "Carriage and Insurance Paid To (CIP)",
    description:
      "Like CPT, but seller also provides insurance against loss/damage during transport.",
  },
  {
    name: "Delivered at Terminal (DAT)",
    description:
      "Seller delivers and unloads goods at specified terminal. Risk transfers after unloading.",
  },
  {
    name: "Delivered at Place (DAP)",
    description:
      "Seller delivers goods to specified destination. Buyer handles import duties and unloading.",
  },
  {
    name: "Free Alongside Ship (FAS)",
    description:
      "Seller delivers goods alongside ship at port. Buyer assumes risk and costs thereafter.",
  },
  {
    name: "Free On Board (FOB)",
    description:
      "Seller loads goods onto ship. Risk transfers when goods pass ship's rail.",
  },
  {
    name: "Cost and Freight (CFR)",
    description:
      "Seller pays transport costs to destination port. Risk transfers upon loading onto ship.",
  },
  {
    name: "Cost, Insurance and Freight (CIF)",
    description: "Like CFR plus seller provides insurance during transport.",
  },
];

export function IncotermsSelect() {
  return (
    <SelectWithInfo name="incoterms" label="Incoterms" options={incoterms} />
  );
}
