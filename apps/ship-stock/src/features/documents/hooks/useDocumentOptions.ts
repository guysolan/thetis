import { useSearch } from "@tanstack/react-router";
import type { DocumentOptions } from "../schema";

type DocumentType =
    | "commercialInvoice"
    | "purchaseOrder"
    | "invoice"
    | "packingList"
    | "shippingLabel";

export const useDocumentOptions = (documentType: DocumentType) => {
    const search = useSearch({ from: "/documents" }) as Partial<
        DocumentOptions
    >;

    // Get default values based on document type
    const getDefaults = () => {
        switch (documentType) {
            case "packingList":
                return {
                    shippingDetails: {
                        show: true,
                        reasonForExport: true,
                        modeOfTransport: true,
                        incoterms: true,
                        unitOfMeasurement: true,
                        shipmentNumber: true,
                        airwaybill: true,
                        referenceNumber: true,
                    },
                    from: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    to: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    total: false,
                    payment: false,
                    showPackages: true,
                    showShippingItems: false,
                    showExporterDetails: false,
                    showFDADetails: false,
                    showExchangeRates: false,
                };
            case "commercialInvoice":
                return {
                    shippingDetails: {
                        show: true,
                        reasonForExport: true,
                        modeOfTransport: true,
                        incoterms: true,
                        unitOfMeasurement: true,
                        shipmentNumber: true,
                        airwaybill: true,
                        referenceNumber: true,
                    },
                    from: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    to: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    payment: false,
                    showExporterDetails: true,
                    showFDADetails: true,
                    showExchangeRates: true,
                };
            case "invoice":
                return {
                    shippingDetails: {
                        show: true,
                        reasonForExport: true,
                        modeOfTransport: true,
                        incoterms: true,
                        unitOfMeasurement: true,
                        shipmentNumber: true,
                        airwaybill: true,
                        referenceNumber: true,
                    },
                    from: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    to: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    payment: true,
                    showExporterDetails: false,
                    showFDADetails: false,
                    showExchangeRates: false,
                };
            default:
                return {
                    shippingDetails: {
                        show: true,
                        reasonForExport: true,
                        modeOfTransport: true,
                        incoterms: true,
                        unitOfMeasurement: true,
                        shipmentNumber: true,
                        airwaybill: true,
                        referenceNumber: true,
                    },
                    from: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                    to: {
                        show: true,
                        billing: true,
                        shipping: true,
                        contact: true,
                    },
                };
        }
    };

    const defaults = getDefaults();

    // Extract only the base DocumentOptions from the extended search params
    const documentOptions: DocumentOptions = {
        shippingDetails: defaults.shippingDetails,
        from: defaults.from,
        to: defaults.to,
        payment: search.payment ?? defaults.payment ?? false,
        total: search.total ?? defaults.total ?? true,
        showSignature: search.showSignature ?? true,
        showPackages: search.showPackages ?? defaults.showPackages ?? false,
        showShippingItems: search.showShippingItems ??
            defaults.showShippingItems ?? true,
        showExporterDetails: search.showExporterDetails ??
            defaults.showExporterDetails ?? false,
        showFDADetails: search.showFDADetails ?? defaults.showFDADetails ??
            false,
        showExchangeRates: search.showExchangeRates ??
            defaults.showExchangeRates ?? false,
    };

    return documentOptions;
};
