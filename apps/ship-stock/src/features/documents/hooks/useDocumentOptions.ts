import { useSearch } from "@tanstack/react-router";
import type { DocumentOptions } from "../schema";
import { packingListSchema } from "../schema";

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
        shippingDetails: {
            show: search?.shippingDetails?.show ??
                defaults.shippingDetails.show,
            reasonForExport: search?.shippingDetails?.reasonForExport ??
                defaults.shippingDetails.reasonForExport,
            modeOfTransport: search?.shippingDetails?.modeOfTransport ??
                defaults.shippingDetails.modeOfTransport,
            incoterms: search?.shippingDetails?.incoterms ??
                defaults.shippingDetails.incoterms,
            unitOfMeasurement: search?.shippingDetails?.unitOfMeasurement ??
                defaults.shippingDetails.unitOfMeasurement,
            shipmentNumber: search?.shippingDetails?.shipmentNumber ??
                defaults.shippingDetails.shipmentNumber,
            airwaybill: search?.shippingDetails?.airwaybill ??
                defaults.shippingDetails.airwaybill,
            referenceNumber: search?.shippingDetails?.referenceNumber ??
                defaults.shippingDetails.referenceNumber,
        },
        from: {
            show: search?.from?.show ?? defaults.from.show,
            billing: search?.from?.billing ?? defaults.from.billing,
            shipping: search?.from?.shipping ?? defaults.from.shipping,
            contact: search?.from?.contact ?? defaults.from.contact,
        },
        to: {
            show: search?.to?.show ?? defaults.to.show,
            billing: search?.to?.billing ?? defaults.to.billing,
            shipping: search?.to?.shipping ?? defaults.to.shipping,
            contact: search?.to?.contact ?? defaults.to.contact,
        },
        payment: search?.payment ?? defaults.payment ?? false,
        total: search?.total ?? defaults.total ?? true,
        showSignature: search?.showSignature ?? true,
        showPackages: search?.showPackages ?? defaults.showPackages ?? false,
        showShippingItems: search?.showShippingItems ??
            defaults.showShippingItems ?? true,
        showExporterDetails: search?.showExporterDetails ??
            defaults.showExporterDetails ?? false,
        showFDADetails: search?.showFDADetails ?? defaults.showFDADetails ??
            false,
        showExchangeRates: search?.showExchangeRates ??
            defaults.showExchangeRates ?? false,
    };

    return documentOptions;
};
