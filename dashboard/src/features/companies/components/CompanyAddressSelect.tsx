import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompanyForm } from "../hooks/useCompanyForm";
import { CompanySummaryView } from "./CompanySummaryView";
import { CompanyAddressExpandedView } from "./CompanyAddressExpandedView";
import { useCompanyAutoFill } from "../hooks/useCompanyAutoFill";
import { CompanyRow } from "../types";
import { useUserCompany } from "../hooks/useUserCompany";
import { usePublicUser } from "../../auth/hooks/usePublicUser";

interface Props {
    direction: "to" | "from";
    title?: string;
    defaultExpanded?: boolean;
}

const CompanyAddressSelect = ({
    direction,
    title,
    defaultExpanded = true,
}: Props) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const {
        form,
        getFieldName,
        getSelectedCompany,
        getAddressOptions,
        getSelectedAddress,
        getContactOptions,
        getSelectedContact,
    } = useCompanyForm(direction);

    const companyId = form.watch(getFieldName("company"));
    const selectedCompany = getSelectedCompany() as CompanyRow & {
        addresses: Array<{
            address: {
                id: number;
                name: string;
                line_1: string;
                line_2: string | null;
                city: string;
                region: string;
                code: string;
                country: string;
            };
            is_default_shipping: boolean;
            is_default_billing: boolean;
        }>;
        contacts: Array<{
            contact: {
                id: number;
                name: string;
                email: string | null;
                phone: string | null;
            };
            is_default: boolean;
        }>;
    };

    useCompanyAutoFill(direction, getSelectedCompany, getFieldName);

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    {title ?? (direction === "to" ? "To" : "From")}
                </CardTitle>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {isExpanded
                    ? (
                        <CompanyAddressExpandedView
                            getFieldName={getFieldName}
                            getAddressOptions={getAddressOptions}
                            getSelectedAddress={getSelectedAddress}
                            getContactOptions={getContactOptions}
                            getSelectedContact={getSelectedContact}
                            form={form}
                            onDone={() => setIsExpanded(false)}
                        />
                    )
                    : (
                        <CompanySummaryView
                            selectedCompany={selectedCompany}
                            shippingAddress={getSelectedAddress("shipping")}
                            billingAddress={getSelectedAddress("billing")}
                            getContactOptions={getContactOptions}
                        />
                    )}
            </CardContent>
        </Card>
    );
};

export default CompanyAddressSelect;
