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
import PaymentDetails, {
  type PaymentMethodKey,
} from "../components/PaymentDetails";
import Heading from "../components/Heading";
import type { Currency } from "../../../../../constants/currencies";
import OrderItems from "../components/OrderItems";
import ItemsManifest from "../components/ItemsManifest";
import Financials from "../components/Financials";
import { THETIS_QUOTE_FROM } from "../components/QuoteCompanyDetails";
import QuoteDescription from "../components/QuoteDescription";
import QuotePriceBands from "../components/QuotePriceBands";
import QuoteRecommendation from "../components/QuoteRecommendation";
import QuoteTerms from "../components/QuoteTerms";

type DocumentType =
  | "commercialInvoice"
  | "purchaseOrder"
  | "invoice"
  | "packingList"
  | "shippingLabel"
  | "quote";

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

const Document = ({ order, options, title, documentType }: DocumentProps) => {
  if (documentType === "quote") {
    const quoteData = order.quote;
    const currency = (quoteData?.currency ?? order.currency ?? "GBP") as Currency;
    const priceBands = quoteData?.price_bands ?? {};

    return (
      <>
        <Heading />
        <OrderTitle title={title} />
        <QuoteDescription
          orderDate={order.order_date as string}
          quoteNumber={order.order_id}
          currency={currency}
        />
        <BuyerSeller
          order={{
            ...order,
            from_company: THETIS_QUOTE_FROM.company,
            from_billing_address: THETIS_QUOTE_FROM.address,
            from_shipping_address: THETIS_QUOTE_FROM.address,
            from_contact: THETIS_QUOTE_FROM.contact,
          }}
          fromOptions={{
            show: true,
            billing: true,
            shipping: true,
            contact: true,
          }}
          toOptions={{
            show: true,
            billing: true,
            shipping: true,
            contact: true,
          }}
        />
        <QuotePriceBands priceBands={priceBands} currency={currency} />
        <QuoteRecommendation />
        <QuoteTerms />
      </>
    );
  }

  return (
    <>
      <Heading />

      <OrderTitle title={title} />

      <OrderDescription
        currency={order.currency}
        orderId={order.order_id}
        orderDate={order.order_date as string}
        deliveryDates={order.delivery_dates}
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

      {(options as any).showFinancials && (
        <Financials
          order={order}
          currency={order.currency as Currency}
        />
      )}

      {options.showShippingItems && (
        <ItemsWithPricing
          currency={order.currency as Currency}
          orderItems={prepareOrderItems(order)}
          order={order}
        />
      )}

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
