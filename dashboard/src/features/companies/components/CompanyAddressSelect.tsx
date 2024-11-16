import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import { useSelectCompanies } from "../api/selectCompanies";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CompanyForm from "./CompanyForm";
import { Button } from "../../../components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../components/ui/tooltip";
import TooltipDialog from "@/components/TooltipDialog";
import AddressForm from "../../stockpiles/components/AddressForm";

interface Props {
    direction: "to" | "from";
}

const CompanyAddressSelect = ({ direction }: Props) => {
    const form = useFormContext();
    const { data: companies = [] } = useSelectCompanies();

    // Helper function to get field names
    const getFieldName = (type: "company" | "shipping" | "billing") => {
        const prefix = direction === "to" ? "to" : "from";
        return `${prefix}_${type}_${type === "company" ? "id" : "address_id"}`;
    };

    // Get selected company's addresses
    const getAddressOptions = () => {
        const companyId = form.watch(getFieldName("company"));
        const selectedCompany = companies?.find((c) =>
            String(c.id) === companyId
        );
        const addresses = selectedCompany?.addresses || [];

        return addresses.map((addr) => ({
            label: `${addr.line_1 ? `${addr.line_1}, ` : ""} ${
                addr.line_2 ? `${addr.line_2}, ` : ""
            } ${addr.city ? `${addr.city}, ` : "Unknown City"} ${
                addr.state ? `${addr.state}, ` : ""
            } ${addr.code ? `${addr.code}, ` : ""} ${
                addr.country ?? "No Country"
            }`,
            value: String(addr.id),
        }));
    };

    // Auto-fill addresses when there's only one option
    useEffect(() => {
        const companyId = form.watch(getFieldName("company"));
        const selectedCompany = companies?.find((c) =>
            String(c.id) === companyId
        );
        const addresses = selectedCompany?.addresses || [];

        if (addresses.length === 1) {
            const addressId = String(addresses[0].id);
            form.setValue(getFieldName("shipping"), addressId);
            form.setValue(getFieldName("billing"), addressId);
        }
    }, [form.watch(getFieldName("company"))]);

    // Helper to get selected company
    const getSelectedCompany = () => {
        const companyId = form.watch(getFieldName("company"));
        return companies?.find((c) => String(c.id) === companyId);
    };

    // Helper to get selected address
    const getSelectedAddress = (type: "shipping" | "billing") => {
        const addressId = form.watch(getFieldName(type));
        const selectedCompany = getSelectedCompany();
        return selectedCompany?.addresses?.find((a) =>
            String(a.id) === addressId
        );
    };

    return (
        <>
            <div className="flex flex-row items-end gap-2 w-full">
                <Select
                    label="Company"
                    name={getFieldName("company")}
                    options={(companies || []).map((c) => ({
                        label: c.name,
                        value: String(c.id),
                    }))}
                />
                {getSelectedCompany() && (
                    <TooltipDialog
                        icon={<Pencil size={20} />}
                        tooltipText={"Edit Company"}
                    >
                        <CompanyForm
                            company={getSelectedCompany()}
                        />
                    </TooltipDialog>
                )}
                <TooltipDialog
                    icon={<Plus size={20} />}
                    tooltipText={"Add Company"}
                >
                    <CompanyForm />
                </TooltipDialog>
            </div>
            <div className="flex flex-row items-end gap-2 w-full">
                <Select
                    label="Shipping Address"
                    name={getFieldName("shipping")}
                    options={getAddressOptions()}
                />
                <div className="flex gap-2">
                    {getSelectedAddress("shipping") && (
                        <TooltipDialog
                            icon={<Pencil size={20} />}
                            tooltipText="Edit Address"
                        >
                            <AddressForm
                                operation="update"
                                companyId={form.watch(getFieldName("company"))}
                                address={getSelectedAddress("shipping")}
                            />
                        </TooltipDialog>
                    )}
                    <TooltipDialog
                        icon={<Plus size={20} />}
                        tooltipText="Add Address"
                    >
                        <AddressForm
                            operation="insert"
                            companyId={form.watch(getFieldName("company"))}
                            address={null}
                        />
                    </TooltipDialog>
                </div>
            </div>
            <div className="flex flex-row items-end gap-2 w-full">
                <Select
                    label="Billing Address"
                    name={getFieldName("billing")}
                    options={getAddressOptions()}
                />
                <div className="flex gap-2">
                    {getSelectedAddress("billing") && (
                        <TooltipDialog
                            icon={<Pencil size={20} />}
                            tooltipText="Edit Address"
                        >
                            <AddressForm
                                operation="upsert"
                                companyId={form.watch(getFieldName("company"))}
                                address={getSelectedAddress("billing")}
                            />
                        </TooltipDialog>
                    )}
                    <TooltipDialog
                        icon={<Plus size={20} />}
                        tooltipText="Add Address"
                    >
                        <AddressForm
                            operation="insert"
                            companyId={form.watch(getFieldName("company"))}
                            address={null}
                        />
                    </TooltipDialog>
                </div>
            </div>
        </>
    );
};

export default CompanyAddressSelect;
