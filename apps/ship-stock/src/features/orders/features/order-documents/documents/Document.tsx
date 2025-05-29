import React from "react";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import FDADetails from "../components/FDADetails";
import ExporterDetails from "../components/ExporterDetails";
import ShippingItems from "../components/ShippingItems";
import { prepareOrderItems } from "../utils/utils";
import PackageSummary from "../components/PackageSummary";
import BuyerSeller from "../components/BuyerSeller";
import ExchangeRates from "../components/ExchangeRates";
import { DocumentOptions } from "../../../../documents/schema";
import Signature from "../components/signature";
import ShippingDetails from "../components/ShippingDetails";
import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import OrderTotal from "../components/OrderTotal";
import PaymentDetails from "../components/PaymentDetails";
import Heading from "../components/Heading";
import type { Currency } from "../../../../../constants/currencies";

type DocumentType =
  | "commercialInvoice"
  | "purchaseOrder"
  | "invoice"
  | "packingList"
  | "shippingLabel";

interface DocumentProps {
  order: OrderView;
  options: DocumentOptions;
  title: string;
  documentType: DocumentType;
}

const Document = ({ order, options, title, documentType }: DocumentProps) => {
  // Get default values based on document type
  const getDefaults = () => {
    switch (documentType) {
      case "packingList":
        return {
          total: false,
          payment: false,
          showPackages: true,
          showShippingItems: false,
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
          payment: true,
          showExporterDetails: false,
          showFDADetails: false,
          showExchangeRates: false,
        };
      default:
        return {};
    }
  };

  const defaults = getDefaults();

  // Merge options with defaults
  const mergedOptions = {
    ...options,
    total: options.total ?? defaults.total ?? true,
    payment: options.payment ?? defaults.payment ?? false,
    showPackages: options.showPackages ?? defaults.showPackages ?? false,
    showShippingItems:
      options.showShippingItems ?? defaults.showShippingItems ?? true,
    showExporterDetails:
      options.showExporterDetails ?? defaults.showExporterDetails ?? false,
    showFDADetails: options.showFDADetails ?? defaults.showFDADetails ?? false,
    showExchangeRates:
      options.showExchangeRates ?? defaults.showExchangeRates ?? false,
    shippingDetails: {
      show:
        options.shippingDetails?.show ??
        defaults.shippingDetails?.show ??
        false,
      reasonForExport:
        options.shippingDetails?.reasonForExport ??
        defaults.shippingDetails?.reasonForExport ??
        false,
      modeOfTransport:
        options.shippingDetails?.modeOfTransport ??
        defaults.shippingDetails?.modeOfTransport ??
        false,
      incoterms:
        options.shippingDetails?.incoterms ??
        defaults.shippingDetails?.incoterms ??
        false,
      unitOfMeasurement:
        options.shippingDetails?.unitOfMeasurement ??
        defaults.shippingDetails?.unitOfMeasurement ??
        false,
      shipmentNumber:
        options.shippingDetails?.shipmentNumber ??
        defaults.shippingDetails?.shipmentNumber ??
        false,
      airwaybill:
        options.shippingDetails?.airwaybill ??
        defaults.shippingDetails?.airwaybill ??
        false,
      referenceNumber:
        options.shippingDetails?.referenceNumber ??
        defaults.shippingDetails?.referenceNumber ??
        false,
    },
  };

  return (
    <>
      <Heading />

      <OrderTitle title={title} />

      <OrderDescription
        currency={order.currency}
        orderId={order.order_id}
        orderDate={order.order_date as string}
      />

      {mergedOptions.shippingDetails.show && (
        <ShippingDetails
          reasonForExport={order.reason_for_export || ""}
          modeOfTransport={order.mode_of_transport || ""}
          incoterms={order.incoterms || ""}
          unitOfMeasurement={order.unit_of_measurement || "metric"}
          shipmentNumber={order.shipment_number || ""}
          airwaybill={order.airwaybill || ""}
          referenceNumber={order.reference_number || ""}
          options={mergedOptions.shippingDetails}
        />
      )}

      {mergedOptions.showShippingItems && (
        <ShippingItems
          currency={order.currency as Currency}
          orderItems={prepareOrderItems(order)}
        />
      )}

      {mergedOptions.total && (
        <OrderTotal order={order} showCarriage={mergedOptions.carriage} />
      )}

      {mergedOptions.showPackages && <PackageSummary items={order.items} />}

      {(mergedOptions.from.show || mergedOptions.to.show) && (
        <BuyerSeller
          fromOptions={mergedOptions.from}
          toOptions={mergedOptions.to}
          order={order}
        />
      )}

      {mergedOptions.payment && (
        <PaymentDetails orderId={order.order_id} currency={order.currency} />
      )}

      {mergedOptions.showExporterDetails && <ExporterDetails />}

      {mergedOptions.showFDADetails && <FDADetails />}

      {mergedOptions.showExchangeRates && (
        <ExchangeRates date={order.order_date} />
      )}

      {mergedOptions.showSignature && <Signature />}
    </>
  );
};

export default Document;
