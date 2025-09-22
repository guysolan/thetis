import React from "react";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import FDADetails from "../components/FDADetails";
import ExporterDetails from "../components/ExporterDetails";
import ItemsWithPricing from "../components/ItemsWithPricing";
import { prepareOrderItems } from "../utils/utils";
import PackageSummary from "../components/PackageSummary";
import BuyerSeller from "../components/BuyerSeller";
import ExchangeRates from "../components/ExchangeRates";
import { DocumentOptions } from "../../../../documents/schema";
import Signature from "../components/signature";
import ShippingDetails from "../components/ShippingDetails";
import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import PaymentDetails, {
  type PaymentMethodKey,
} from "../components/PaymentDetails";
import Heading from "../components/Heading";
import ServicesTable from "../components/ServicesTable";
import type { Currency } from "../../../../../constants/currencies";
import OrderItems from "../components/OrderItems";
import ItemsManifest from "../components/ItemsManifest";

type DocumentType =
  | "commercialInvoice"
  | "purchaseOrder"
  | "invoice"
  | "packingList"
  | "shippingLabel";

interface DocumentProps {
  order: OrderView & {
    reason_for_export?: string;
    mode_of_transport?: string;
    incoterms?: string;
    unit_of_measurement?: string;
    shipment_number?: string;
    airwaybill?: string;
    reference_number?: string;
  };
  options: DocumentOptions;
  title: string;
  documentType: DocumentType;
}

const Document = ({ order, options, title }: DocumentProps) => {
  return (
    <>
      <Heading />

      <OrderTitle title={title} />

      <OrderDescription
        currency={order.currency}
        orderId={order.order_id}
        orderDate={order.order_date as string}
      />

      {options.shippingDetails?.show && (
        <ShippingDetails
          reasonForExport={order.reason_for_export || ""}
          modeOfTransport={order.mode_of_transport || ""}
          incoterms={order.incoterms || ""}
          unitOfMeasurement={order.unit_of_measurement || "metric"}
          shipmentNumber={order.shipment_number || ""}
          airwaybill={order.airwaybill || ""}
          referenceNumber={order.reference_number || ""}
          options={options.shippingDetails}
        />
      )}

      {options.showShippingItems && (
        <ItemsWithPricing
          currency={order.currency as Currency}
          orderItems={prepareOrderItems(order)}
          order={order}
        />
      )}

      <ServicesTable order={order} currency={order.currency as Currency} />

      {(options as any).showItemsManifest && (
        <ItemsManifest orderItems={prepareOrderItems(order)} />
      )}

      {options.showPackages && <PackageSummary items={order.items} />}

      {(options.from.show || options.to.show) && (
        <BuyerSeller
          fromOptions={options.from}
          toOptions={options.to}
          order={order}
        />
      )}

      {options.payment.show && (
        <PaymentDetails
          orderId={order.order_id}
          currency={order.currency}
          enabledPaymentMethods={options.payment.paymentMethods as Record<
            PaymentMethodKey,
            boolean
          >}
        />
      )}

      {options.showExporterDetails && <ExporterDetails />}

      {options.showFDADetails && <FDADetails />}

      {options.showExchangeRates && <ExchangeRates date={order.order_date} />}

      {options.showSignature && <Signature />}
    </>
  );
};

export default Document;
