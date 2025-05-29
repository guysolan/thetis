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

interface DocumentProps {
  order: OrderView;
  options: DocumentOptions;
  title: string;
}

const Document = ({ order, options, title }: DocumentProps) => {
  // Get order form values which contain the additional shipping details
  const orderFormValues = order.order_form_value;

  // Check if we should show financial sections (for invoices, commercial invoices, purchase orders)
  const showFinancialSections =
    title.toLowerCase().includes("invoice") ||
    title.toLowerCase().includes("purchase");

  // Check if we should show shipping sections (for commercial invoices, packing lists)
  const showShippingSections =
    title.toLowerCase().includes("commercial") ||
    title.toLowerCase().includes("packing");

  // Check if we should show extended sections (for commercial invoices)
  const showExtendedSections = title.toLowerCase().includes("commercial");

  return (
    <>
      <Heading />

      <OrderTitle title={title} />

      <OrderDescription
        currency={order.currency}
        orderId={order.order_id}
        orderDate={order.order_date as string}
      />

      {showShippingSections && (
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
        <ShippingItems
          currency={order.currency as Currency}
          orderItems={prepareOrderItems(order)}
        />
      )}

      {options.showPackages && <PackageSummary items={order.items} />}

      {(options.from.show || options.to.show) && (
        <BuyerSeller
          fromOptions={options.from}
          toOptions={options.to}
          order={order}
        />
      )}

      {options.total && showFinancialSections && (
        <OrderTotal order={order} showCarriage={options.carriage} />
      )}

      {options.payment && (
        <PaymentDetails orderId={order.order_id} currency={order.currency} />
      )}

      {showExtendedSections && <ExporterDetails />}

      {showExtendedSections && <FDADetails />}

      {showExtendedSections && <ExchangeRates date={order.order_date} />}

      {options.showSignature && <Signature />}
    </>
  );
};

export default Document;
