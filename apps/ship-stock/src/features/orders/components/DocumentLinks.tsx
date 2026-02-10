import { Button } from "@thetis/ui/button";
import {
  Banknote,
  Clipboard,
  ExternalLink,
  FileText,
  Receipt,
  Tag,
} from "lucide-react";
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
    icon: <Receipt size={16} />,
    showFor: ["ship", "sell"],
  },
  {
    path: "packing-list",
    label: "Packing List",
    icon: <Clipboard size={16} />,
    showFor: ["ship", "sell"],
  },
  {
    path: "shipping-label",
    label: "Shipping Label",
    icon: <Tag size={16} />,
    showFor: ["ship", "sell"],
  },
  {
    path: "purchase-order",
    label: "Purchase Order",
    icon: <FileText size={16} />,
    showFor: ["build"],
  },
  {
    path: "invoice",
    label: "Invoice",
    icon: <Banknote size={16} />,
    showFor: ["sell"],
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
            size="sm"
            className="justify-start gap-2 px-3 py-2 w-full font-normal text-sm"
          >
            <Link
              className="flex items-center gap-2 w-full px-3 py-2"
              to={`/documents/orders/$orderId/${doc.path}`}
              params={{ orderId }}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="flex items-center gap-2 shrink-0">
                {doc.icon} {doc.label}
              </span>
              <ExternalLink size={14} className="opacity-70 ml-auto shrink-0" />
            </Link>
          </Button>
        ))}
    </>
  );
};
