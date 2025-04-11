import { Button } from "@thetis/ui/button";
import { Banknote, ExternalLink, FileText, Receipt, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { OrderType } from "../types";

interface DocumentLinksProps {
  orderId: string;
  orderType: OrderType;
}

type DocumentConfig = {
  path: string;
  label: string;
  icon: React.ReactNode;
  showFor: OrderType[];
};

const documents: DocumentConfig[] = [
  {
    path: "commercial-invoice",
    label: "Commercial Invoice",
    icon: <Receipt size={20} />,
    showFor: ["shipment", "sale"],
  },
  {
    path: "packing-list",
    label: "Packing List",
    icon: <Tag size={20} />,
    showFor: ["shipment", "sale"],
  },
  {
    path: "shipping-label",
    label: "Shipping Label",
    icon: <Tag size={20} />,
    showFor: ["shipment", "sale"],
  },
  {
    path: "purchase-order",
    label: "Purchase Order",
    icon: <FileText size={20} />,
    showFor: ["purchase"],
  },
  {
    path: "invoice",
    label: "Invoice",
    icon: <Banknote size={20} />,
    showFor: ["sale"],
  },
];

export const DocumentLinks = ({ orderId, orderType }: DocumentLinksProps) => {
  return (
    <>
      {documents
        .filter((doc) => doc.showFor.includes(orderType))
        .map((doc) => (
          <Button
            key={doc.path}
            asChild
            variant="ghost"
            className="justify-between px-2 w-full"
          >
            <Link
              to={`/documents/orders/$orderId/${doc.path}`}
              params={{ orderId }}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="flex flex-row items-center gap-2">
                {doc.icon} {doc.label}
              </span>
              <ExternalLink size={20} />
            </Link>
          </Button>
        ))}
    </>
  );
};
