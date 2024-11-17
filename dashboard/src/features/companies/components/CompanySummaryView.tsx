import { Clipboard, Package, User2 } from "lucide-react";
import { formatAddress } from "../utils/addressFormatters";

interface Props {
    selectedCompany: any;
    shippingAddress: any;
    billingAddress: any;
    contact: any;
}

export const CompanySummaryView = ({
    selectedCompany,
    shippingAddress,
    billingAddress,
    contact,
}: Props) => {
    if (!selectedCompany) return "No company selected";

    return (
        <div className="space-y-2 text-muted-foreground text-sm">
            <div className="font-medium">{selectedCompany.name}</div>
            <div className="flex flex-row items-center gap-2">
                <Package size={20} />
                {formatAddress(shippingAddress)}
            </div>
            <div className="flex flex-row items-center gap-2">
                <Clipboard size={20} />
                {formatAddress(billingAddress)}
            </div>
            <div className="flex flex-row items-center gap-2">
                <User2 size={20} />
                {contact}
                {/* {getContactOptions().map((c) => c.label).join(", ")} */}
            </div>
        </div>
    );
};
