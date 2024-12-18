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
import { Editor } from "@thetis/ui/editor";
import { EditTextBlock } from "../text-blocks/EditTextBlock";
import { AddTextBlock } from "../text-blocks/AddTextBlock";
import { ShowTextBlocks } from "../text-blocks/ShowTextBlocks";

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

      {/* <ShowTextBlocks textBlocks={order.text_blocks} /> */}

      {/* <AddTextBlock orderId={order.order_id} position={0} onSelect={() => {}} /> */}
    </>
  );
};

export default Invoice;
