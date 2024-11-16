import { useFormContext } from "react-hook-form";
import { useSelectCompanies } from "../api/selectCompanies";
import { useEffect, useState } from "react";
import { Clipboard, Package, Pencil, Settings2, User2 } from "lucide-react";
import CompanySelect from "./CompanySelect";
import AddressSelect from "./AddressSelect";
import ContactSelect from "./ContactSelect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { create } from "zustand";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FieldVisibility {
    shipping: boolean;
    billing: boolean;
    contacts: boolean;
}

interface FieldVisibilityStore {
    visibility: FieldVisibility;
    toggleField: (field: keyof FieldVisibility, value: boolean) => void;
}

const useFieldVisibilityStore = create<FieldVisibilityStore>((set) => ({
    visibility: {
        shipping: true,
        billing: true,
        contacts: true,
    },
    toggleField: (field, value) =>
        set((state) => ({
            visibility: {
                ...state.visibility,
                [field]: value,
            },
        })),
}));

interface Props {
    direction: "to" | "from";
    title?: string;
    defaultVisibility?: {
        shipping?: boolean;
        billing?: boolean;
        contacts?: boolean;
    };
}

const formatAddress = (address: any) => {
    if (!address) return "";
    return [
        address.line_1,
        address.line_2,
        address.city,
        address.state,
        address.code,
        address.country,
    ]
        .filter(Boolean)
        .join(", ");
};

const CompanyAddressSelect = ({
    direction,
    title,
    defaultVisibility,
}: Props) => {
    const form = useFormContext();
    const { data: companies = [] } = useSelectCompanies();
    const { visibility, toggleField } = useFieldVisibilityStore();
    const [isExpanded, setIsExpanded] = useState(false);

    // Initialize visibility based on props
    useEffect(() => {
        if (defaultVisibility) {
            if (defaultVisibility.shipping !== undefined) {
                toggleField("shipping", defaultVisibility.shipping);
            }
            if (defaultVisibility.billing !== undefined) {
                toggleField("billing", defaultVisibility.billing);
            }
            if (defaultVisibility.contacts !== undefined) {
                toggleField("contacts", defaultVisibility.contacts);
            }
        }
    }, [defaultVisibility]);

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

    // Add contact-related helper functions
    const getContactOptions = () => {
        const companyId = form.watch(getFieldName("company"));
        const selectedCompany = companies?.find((c) =>
            String(c.id) === companyId
        );
        const contacts = selectedCompany?.contacts || [];

        return contacts.map((contact) => ({
            label: `${contact.name}`,
            value: String(contact.id),
        }));
    };

    const getSelectedContact = (type: "primary" | "secondary") => {
        const contactId = form.watch(getFieldName(type));
        const selectedCompany = getSelectedCompany();
        return selectedCompany?.contacts?.find((c) =>
            String(c.id) === contactId
        );
    };

    // Extract visibility settings UI into a separate component
    const VisibilitySettings = () => (
        <div className="space-y-4">
            <h4 className="font-medium">Show Fields</h4>
            <div className="space-y-2">
                <VisibilityToggle
                    id="shipping"
                    label="Shipping Address"
                    checked={visibility.shipping}
                    onCheckedChange={(checked) =>
                        toggleField("shipping", checked)}
                />
                <VisibilityToggle
                    id="billing"
                    label="Billing Address"
                    checked={visibility.billing}
                    onCheckedChange={(checked) =>
                        toggleField("billing", checked)}
                />
                <VisibilityToggle
                    id="contacts"
                    label="Contacts"
                    checked={visibility.contacts}
                    onCheckedChange={(checked) =>
                        toggleField("contacts", checked)}
                />
            </div>
        </div>
    );

    // Add summary view helper
    const SummaryView = () => {
        const selectedCompany = getSelectedCompany();
        const shippingAddress = getSelectedAddress("shipping");
        const billingAddress = getSelectedAddress("billing");

        if (!selectedCompany) return "No company selected";

        return (
            <div className="space-y-2 text-muted-foreground text-sm">
                <div className="font-medium">{selectedCompany.name}</div>
                {visibility.shipping && (
                    <div className="flex flex-row items-center gap-2">
                        <Package size={20} />
                        {formatAddress(shippingAddress)}
                    </div>
                )}
                {visibility.billing && (
                    <div className="flex flex-row items-center gap-2">
                        <Clipboard size={20} />
                        {formatAddress(billingAddress)}
                    </div>
                )}
                {visibility.contacts && (
                    <div className="flex flex-row items-center gap-2">
                        <User2 size={20} />
                        {getContactOptions().map((c) => c.label).join(", ")}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-base">
                    {title ?? (direction === "to" ? "To" : "From")}
                </CardTitle>
                <div className="flex flex-row-reverse gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    {isExpanded &&
                        (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Settings2 className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    side="bottom"
                                    className="w-80"
                                >
                                    <VisibilitySettings />
                                </PopoverContent>
                            </Popover>
                        )}
                </div>
            </CardHeader>
            <CardContent>
                {isExpanded
                    ? (
                        <div className="space-y-4">
                            <CompanySelect name={getFieldName("company")} />

                            <div className="space-y-4">
                                {visibility.shipping && (
                                    <AddressSelect
                                        label="Shipping Address"
                                        type="shipping"
                                        getFieldName={getFieldName}
                                        getAddressOptions={getAddressOptions}
                                        getSelectedAddress={getSelectedAddress}
                                        form={form}
                                    />
                                )}

                                {visibility.billing && (
                                    <AddressSelect
                                        label="Billing Address"
                                        type="billing"
                                        getFieldName={getFieldName}
                                        getAddressOptions={getAddressOptions}
                                        getSelectedAddress={getSelectedAddress}
                                        form={form}
                                    />
                                )}

                                {visibility.contacts && (
                                    <ContactSelect
                                        label="Primary Contact"
                                        type="primary"
                                        getFieldName={getFieldName}
                                        getContactOptions={getContactOptions}
                                        getSelectedContact={getSelectedContact}
                                        form={form}
                                    />
                                )}
                            </div>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => setIsExpanded(false)}
                            >
                                Done
                            </Button>
                        </div>
                    )
                    : <SummaryView />}
            </CardContent>
        </Card>
    );
};

// New helper component for visibility toggles
const VisibilityToggle = ({
    id,
    label,
    checked,
    onCheckedChange,
}: {
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}) => (
    <div className="flex justify-between items-center">
        <Label htmlFor={id}>{label}</Label>
        <Switch
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
        />
    </div>
);

export default CompanyAddressSelect;
