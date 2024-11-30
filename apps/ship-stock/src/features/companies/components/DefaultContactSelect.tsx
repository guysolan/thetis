import { Company } from "../types";
import { Label } from "@thetis/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@thetis/ui/select";
import { useSetDefaultContact } from '../api/defaultMutations';

interface DefaultContactSelectProps {
    company: Company['Row'];
    showLabel?: boolean;
}

const DefaultContactSelect = ({ company, showLabel = true }: DefaultContactSelectProps) => {
    const { mutate: setDefaultContact } = useSetDefaultContact();

    return <div className="flex flex-col flex-grow gap-2">
        {showLabel && <Label>Default Contact</Label>}
        <Select
            value={company.contacts.find((c) => c.is_default)?.id?.toString()}
            onValueChange={(value) => setDefaultContact({ companyId: company.id, contactId: parseInt(value) })}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select default contact" />
            </SelectTrigger>
            <SelectContent>
                {company.contacts.map((cont) => (
                    <SelectItem key={cont.id} value={cont.id.toString()}>
                        {cont.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
};

export default DefaultContactSelect; 