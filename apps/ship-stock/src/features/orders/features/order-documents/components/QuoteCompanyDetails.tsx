import type { CompanyRow } from "@/features/companies/types";
import type { Address } from "@/features/stockpiles/types";
import type { ContactRow } from "@/features/contacts/types";

/** Thetis Medical Ltd – used as Seller/From on quote documents */
export const THETIS_QUOTE_FROM = {
  company: {
    id: 0,
    name: "Thetis Medical Ltd",
    company_number: "12926648",
    tax_number: "GB412039441",
    created_at: "",
    user_id: null,
  } as CompanyRow,
  address: {
    id: 0,
    name: "Thetis Medical Ltd",
    line_1: "15 LEOPOLD STREET",
    line_2: null,
    city: "BIRMINGHAM",
    region: null,
    code: "B12 0UP",
    country: "ENGLAND",
    company_id: null,
    created_at: "",
    updated_at: null,
    holds_stock: null,
    is_active: null,
    is_default_billing: null,
    is_default_shipping: null,
  } as Address["Row"],
  contact: {
    id: 0,
    name: "Guy Solan",
    email: "guy@thetismedical.com",
    phone: "+44 7561 788 783",
    company_id: null,
    created_at: "",
    updated_at: null,
  } as ContactRow,
};
