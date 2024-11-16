DROP TABLE IF EXISTS contact_addresses;

CREATE TABLE company_contacts(
    contact_id bigint REFERENCES contacts(id),
    company_id bigint REFERENCES companies(id),
    PRIMARY KEY (contact_id, company_id)
);

