export const marketplaces = [
    {
        region: "NA",
        country: "CA",
        id: "A2EUQ1WTGCTBG2",
        name: "amazon.ca",
        currency: "CAD",
    }, // Canada
    {
        region: "NA",
        country: "US",
        id: "ATVPDKIKX0DER",
        name: "amazon.com",
        currency: "USD",
    }, // United States of America
    {
        region: "NA",
        country: "MX",
        id: "A1AM78C64UM0Y8",
        name: "amazon.com.mx",
        currency: "MXN",
    }, // Mexico
    {
        region: "NA",
        country: "BR",
        id: "A2Q3Y263D00KWC",
        name: "amazon.com.br",
        currency: "BRL",
    }, // Brazil
    {
        region: "EUR",
        country: "ES",
        id: "A1RKKUPIHCS9HS",
        name: "amazon.es",
        currency: "EUR",
    }, // Spain
    {
        region: "EUR",
        country: "UK",
        id: "A1F83G8C2ARO7P",
        name: "amazon.co.uk",
        currency: "GBP",
    }, // United Kingdom
    {
        region: "EUR",
        country: "FR",
        id: "A13V1IB3VIYZZH",
        name: "amazon.fr",
        currency: "EUR",
    }, // France
    {
        region: "EUR",
        country: "BE",
        id: "AMEN7PMS3EDWL",
        name: "amazon.be",
        currency: "EUR",
    }, // Belgium
    {
        region: "EUR",
        country: "NL",
        id: "A1805IZSGTT6HS",
        name: "amazon.nl",
        currency: "EUR",
    }, // Netherlands
    {
        region: "EUR",
        country: "DE",
        id: "A1PA6795UKMFR9",
        name: "amazon.de",
        currency: "EUR",
    }, // Germany
    {
        region: "EUR",
        country: "IT",
        id: "APJ6JRA9NG5V4",
        name: "amazon.it",
        currency: "EUR",
    }, // Italy
    {
        region: "EUR",
        country: "SE",
        id: "A2NODRKZP88ZB9",
        name: "amazon.se",
        currency: "SEK",
    }, // Sweden
    {
        region: "EUR",
        country: "ZA",
        id: "AE08WJ6YKNBMC",
        name: "amazon.za",
        currency: "ZAR",
    }, // South Africa
    {
        region: "EUR",
        country: "PL",
        id: "A1C3SOZRARQ6R3",
        name: "amazon.pl",
        currency: "PLN",
    }, // Poland
    {
        region: "EUR",
        country: "EG",
        id: "ARBP9OOSHTCHU",
        name: "amazon.eg",
        currency: "EGP",
    }, // Egypt
    {
        region: "EUR",
        country: "TR",
        id: "A33AVAJ2PDY3EV",
        name: "amazon.tr",
        currency: "TRY",
    }, // Turkey
    {
        region: "EUR",
        country: "SA",
        id: "A17E79C6D8DWNP",
        name: "amazon.sa",
        currency: "SAR",
    }, // Saudi Arabia
    {
        region: "EUR",
        country: "AE",
        id: "A2VIGQ35RCS4UG",
        name: "amazon.ae",
        currency: "AED",
    }, // United Arab Emirates
    {
        region: "EUR",
        country: "IN",
        id: "A21TJRUUN4KGV",
        name: "amazon.in",
        currency: "INR",
    }, // India
];

export type Region = "NA" | "EUR";
export type CountryCode = (typeof marketplaces)[number]["country"];
export type Marketplace = {
    region: Region;
    country: string;
    id: string;
    name: string;
    currency: string;
};
export type MarketplaceId = Marketplace["id"];

export function getMarketplaceId(countryCode: CountryCode): string {
    const marketplace = marketplaces.find(
        (marketplace) => marketplace.country === countryCode,
    );
    if (!marketplace) {
        throw new Error(
            `Marketplace not found for country code: ${countryCode}`,
        );
    }
    return marketplace.id;
}

export const marketplaceIds = marketplaces.map((marketplace) => marketplace.id);
