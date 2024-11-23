import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCompanyForm } from "../hooks/useCompanyForm";
import { CompanySummaryView } from "./CompanySummaryView";
import { CompanyAddressContactSelect } from "./CompanyAddressContactSelect";
import { useCompanyAutoFill } from "../hooks/useCompanyAutoFill";
import { CompanyRow } from "../types";
import { CompanyAddressContactErrors } from './CompanyAddressContactErrors';

interface Props {
    direction: "to" | "from";
    title?: string;
    defaultExpanded?: boolean;
}

const CompanyAddressContact = ({
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
        <Card className="">
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
                    <Pencil size={20} />
                </Button>
            </CardHeader>
            <CardContent>
                {isExpanded
                    ? (
                        <CompanyAddressContactSelect
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
                            contact={getSelectedContact()}
                        />
                    )}
            </CardContent>
            <CardFooter>
                {isExpanded ?
                    (
                        <Button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                        >
                            Done
                        </Button>
                    ) :
                    <CompanyAddressContactErrors direction={direction} />
                }
            </CardFooter>
        </Card>
    );
};

export default CompanyAddressContact;
