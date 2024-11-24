import { Company } from "../types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSetDefaultBilling, useSetDefaultShipping } from '../api/defaultMutations';

interface DefaultAddressSelectProps {
    company: Company['Row'];
    type: 'shipping' | 'billing';
    showLabel?: boolean;
}

const DefaultAddressSelect = ({ company, type, showLabel = true }: DefaultAddressSelectProps) => {
    const { mutate: setDefaultShipping } = useSetDefaultShipping();
    const { mutate: setDefaultBilling } = useSetDefaultBilling();
    const onSetDefault = (companyId: number, addressId: number) => type === 'shipping' ? setDefaultShipping({ companyId, addressId }) : setDefaultBilling({ companyId, addressId });
    return <div className="flex flex-col flex-grow gap-2">
        {showLabel && <Label>Default {type === 'shipping' ? 'Shipping' : 'Billing'} Address</Label>}
        <Select
            value={company.addresses.find((a) =>
                type === 'shipping' ? a.is_default_shipping : a.is_default_billing
            )?.id?.toString()}
            onValueChange={(value) => onSetDefault(company.id, parseInt(value))}
        >
            <SelectTrigger>
                <SelectValue placeholder={`Select default ${type}`} />
            </SelectTrigger>
            <SelectContent>
                {company.addresses.map((addr) => (
                    <SelectItem key={addr.id} value={addr.id.toString()}>
                        {addr.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
};

export default DefaultAddressSelect; 