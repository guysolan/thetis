import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompanyForm } from "../hooks/useCompanyForm";
import { CompanySummaryView } from "./CompanySummaryView";
import { CompanyAddressExpandedView } from "./CompanyAddressExpandedView";
import { useCompanyAutoFill } from "../hooks/useCompanyAutoFill";

interface Props {
    direction: "to" | "from";
    title?: string;
}

const CompanyAddressSelect = ({
    direction,
    title,
}: Props) => {
    const [isExpanded, setIsExpanded] = useState(true);
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

    useCompanyAutoFill(companyId, getSelectedCompany, getFieldName, form);

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
                            selectedCompany={getSelectedCompany()}
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
