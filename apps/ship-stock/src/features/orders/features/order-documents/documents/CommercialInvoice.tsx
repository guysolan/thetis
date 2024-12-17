import React from "react";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import FDADetails from "../components/FDADetails";
import ExporterDetails from "../components/ExporterDetails";
import ShippingItems from "../components/ShippingItems";

import PackageSummary from "../components/PackageSummary";
import BuyerSeller from "../components/BuyerSeller";
import ExchangeRates from "../components/ExchangeRates";
import {
  CommercialInvoiceOptions,
  DocumentOptions,
} from "../../../../documents/schema";

interface ShippingDetails {
  reasonForExport: string;
  modeOfTransport: string;
  incoterms: string;
  unitOfMeasurement: string;
  shipmentNumber: string;
  airwaybill: string;
}

const ShippingDetails: React.FC<ShippingDetails> = ({
  reasonForExport,
  modeOfTransport,
  incoterms,
  unitOfMeasurement,
  shipmentNumber,
  airwaybill,
}) => (
  <div className="gap-4 grid grid-cols-2 mt-4">
    <div>
      <h3 className="font-bold">Shipping Details</h3>
      <p className="capitalize">Reason for Export: {reasonForExport}</p>
      <p className="capitalize">Mode of Transport: {modeOfTransport}</p>
      <p className="capitalize">Incoterms: {incoterms}</p>
      <p className="capitalize">Unit of Measurement: {unitOfMeasurement}</p>
      <p className="capitalize">Shipment Number: {shipmentNumber}</p>
      <p className="capitalize">Airway Bill: {airwaybill}</p>
    </div>
  </div>
);

const CommercialInvoice = ({
  order,
  options,
}: { order: OrderView; options: CommercialInvoiceOptions }) => {
  const prepareOrderItems = (order: OrderView) => {
    const noPackages = order.items.filter(
      (item) => item.item_type !== "package",
    );
    const noNegatives = noPackages.filter((item) => item.quantity > 0);
    if (order.order_type === "sale") {
      return noPackages.map((item) => ({
        ...item,
        quantity: Math.abs(item.quantity),
      }));
    }
    if (order.order_type === "purchase") {
      return noNegatives;
    }
    return noPackages;
  };
  return (
    <>
      <OrderTitle title="Commercial Invoice" />
      <OrderDescription
        currency={order.currency}
        orderId={order.order_id}
        orderDate={order.order_date as string}
      />

      <ShippingDetails
        reasonForExport={order.reason_for_export}
        modeOfTransport={order.mode_of_transport}
        incoterms={order.incoterms}
        unitOfMeasurement={order.unit_of_measurement}
        shipmentNumber={order.shipment_number}
        airwaybill={order.airwaybill}
      />

      {options.showShippingItems && (
        <ShippingItems
          currency={order.currency}
          orderItems={prepareOrderItems(order)}
        />
      )}

      {options.showPackages && <PackageSummary items={order.items} />}

      <BuyerSeller
        fromOptions={options.from}
        toOptions={options.to}
        order={order}
      />

      {options.showFDA && <FDADetails />}
      {options.showExporter && <ExporterDetails />}
      {options.showExchangeRates && <ExchangeRates />}
    </>
  );
};

export default CommercialInvoice;
