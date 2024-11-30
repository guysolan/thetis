export const marketplaces = [
    { region: "NA", country: "CA", id: "A2EUQ1WTGCTBG2" }, // Canada
    { region: "NA", country: "US", id: "ATVPDKIKX0DER" }, // United States of America
    { region: "NA", country: "MX", id: "A1AM78C64UM0Y8" }, // Mexico
    { region: "NA", country: "BR", id: "A2Q3Y263D00KWC" }, // Brazil
    { region: "EUR", country: "ES", id: "A1RKKUPIHCS9HS" }, // Spain
    { region: "EUR", country: "UK", id: "A1F83G8C2ARO7P" }, // United Kingdom
    { region: "EUR", country: "FR", id: "A13V1IB3VIYZZH" }, // France
    { region: "EUR", country: "BE", id: "AMEN7PMS3EDWL" }, // Belgium
    { region: "EUR", country: "NL", id: "A1805IZSGTT6HS" }, // Netherlands
    { region: "EUR", country: "DE", id: "A1PA6795UKMFR9" }, // Germany
    { region: "EUR", country: "IT", id: "APJ6JRA9NG5V4" }, // Italy
    { region: "EUR", country: "SE", id: "A2NODRKZP88ZB9" }, // Sweden
    { region: "EUR", country: "ZA", id: "AE08WJ6YKNBMC" }, // South Africa
    { region: "EUR", country: "PL", id: "A1C3SOZRARQ6R3" }, // Poland
    { region: "EUR", country: "EG", id: "ARBP9OOSHTCHU" }, // Egypt
    { region: "EUR", country: "TR", id: "A33AVAJ2PDY3EV" }, // Turkey
    { region: "EUR", country: "SA", id: "A17E79C6D8DWNP" }, // Saudi Arabia
    { region: "EUR", country: "AE", id: "A2VIGQ35RCS4UG" }, // United Arab Emirates
    { region: "EUR", country: "IN", id: "A21TJRUUN4KGV" }, // India
];

export type Region = "NA" | "EUR";
export type CountryCode = typeof marketplaces[number]["country"];
export type Marketplace = typeof marketplaces[number];
export type MarketplaceId = Marketplace["id"];

export function getMarketplaceId(
    countryCode: CountryCode,
): string {
    const marketplace = marketplaces.find((marketplace) =>
        marketplace.country === countryCode
    );
    if (!marketplace) {
        throw new Error(
            `Marketplace not found for country code: ${countryCode}`,
        );
    }
    return marketplace.id;
}

export const marketplaceIds = marketplaces.map((marketplace) => marketplace.id);
