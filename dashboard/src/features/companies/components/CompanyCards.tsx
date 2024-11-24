import { useSelectCompanies } from "../api/selectCompanies";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useDeleteCompany } from "../api/deleteCompany";
import {
    useSetDefaultBilling,
    useSetDefaultContact,
    useSetDefaultShipping,
} from "../api/defaultMutations";

import CompanyHeader from "./CompanyHeader";
import CompanyDefaultsSection from "./CompanyDefaultsSection";
import CompanyActions from "./CompanyActions";

const CompanyCards = () => {
    const { data: companies = [] } = useSelectCompanies();
    const { mutate: setDefaultShipping } = useSetDefaultShipping();
    const { mutate: setDefaultBilling } = useSetDefaultBilling();
    const { mutate: setDefaultContact } = useSetDefaultContact();

    return (
        <section className="flex flex-col gap-4">
            {companies?.map((company) => (
                <Card key={company?.id}>
                    <CardHeader>
                        <CompanyHeader
                            company={company}
                        />
                    </CardHeader>
                    <CardContent>
                        <CompanyDefaultsSection
                            company={company}
                            onSetDefaultContact={(companyId, contactId) =>
                                setDefaultContact({ companyId, contactId })}
                            onSetDefaultShipping={(companyId, addressId) =>
                                setDefaultShipping({ companyId, addressId })}
                            onSetDefaultBilling={(companyId, addressId) =>
                                setDefaultBilling({ companyId, addressId })}
                        />
                    </CardContent>
                    <CardFooter>
                        <CompanyActions company={company} />
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
};

export default CompanyCards;
