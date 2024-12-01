import React from "react";
import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import OrderTotal from "../components/OrderTotal";
import PaymentDetails from "../components/PaymentDetails";
import BuyerSeller from "../components/BuyerSeller";
import Heading from "../components/Heading";
import { DocumentOptions } from "../../../../documents/schema";

const Invoice = ({
  order,
  options,
}: { order: OrderView; options: DocumentOptions }) => {
  return (
    <>
      <Heading />
      <OrderTitle title="Invoice" />
      <OrderDescription
        currency={order.currency}
        orderId={order.order_id}
        orderDate={order.order_date as string}
      />

      <BuyerSeller
        order={order}
        fromOptions={options.from}
        toOptions={options.to}
      />

      <FinancialTransactions
        orderItems={order.items}
        orderType={order.order_type}
        currency={order.currency}
      />

      {options.total && (
        <OrderTotal order={order} showCarriage={options.carriage} />
      )}

      {options.payment && (
        <PaymentDetails orderId={order.order_id} currency={order.currency} />
      )}
    </>
  );
};

export default Invoice;
