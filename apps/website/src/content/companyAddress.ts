/** Registered office — Thetis Medical Ltd */
export const THETIS_COMPANY_ADDRESS = {
  name: "Thetis Medical Ltd",
  streetAddress:
    "C/O The Accountancy Partnership, Suite 5, 5th Floor, City Reach, 5 Greenwich View Place",
  locality: "London",
  postalCode: "E14 9NN",
  country: "United Kingdom",
} as const;

export const THETIS_COMPANY_ADDRESS_LINE =
  `${THETIS_COMPANY_ADDRESS.streetAddress}, ${THETIS_COMPANY_ADDRESS.locality}, ${THETIS_COMPANY_ADDRESS.postalCode}, ${THETIS_COMPANY_ADDRESS.country}`;
