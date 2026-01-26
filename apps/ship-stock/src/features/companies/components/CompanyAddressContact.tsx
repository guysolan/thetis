import { useCompanyForm } from "../hooks/useCompanyForm";
import { CompanySummaryView } from "./CompanySummaryView";
import { CompanyAddressContactSelect } from "./CompanyAddressContactSelect";
import { useCompanyAutoFill } from "../hooks/useCompanyAutoFill";
import type { CompanyRow } from "../types";
import { CompanyAddressContactErrors } from "./CompanyAddressContactErrors";
import EditCard from "../../../components/EditCard";

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

  const companyId = form.watch(`${direction}_company_id`);

  return (
    <EditCard
      title={title ?? (direction === "to" ? "To" : "From")}
      previewContent={
        <>
          <CompanySummaryView
            selectedCompany={selectedCompany}
            shippingAddress={getSelectedAddress("shipping")}
            billingAddress={getSelectedAddress("billing")}
            contact={getSelectedContact()}
          />
          <CompanyAddressContactErrors direction={direction} />
        </>
      }
    >
      <CompanyAddressContactSelect
        companyId={companyId}
        getFieldName={getFieldName}
        getAddressOptions={getAddressOptions}
        getSelectedAddress={getSelectedAddress}
        getContactOptions={getContactOptions}
        getSelectedContact={getSelectedContact}
        form={form}
      />
    </EditCard>
  );
};

export default CompanyAddressContact;
