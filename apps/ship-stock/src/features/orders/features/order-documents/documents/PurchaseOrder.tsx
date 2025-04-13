import FinancialTransactions from "../../order-history/components/FinancialTransactions";
import { OrderView } from "../../../types";
import OrderDescription from "../components/OrderDescription";
import OrderTitle from "../components/OrderTitle";
import OrderTotal from "../components/OrderTotal";
import PaymentDetails from "../components/PaymentDetails";
import BuyerSeller from "../components/BuyerSeller";
import { PurchaseOrderOptions } from "../../../../documents/schema";
import PackageSummary from "../components/PackageSummary";
import { prepareOrderItems } from "../utils/utils";
import OrderItems from "../components/OrderItems";

const PurchaseOrder = ({
  order,
  options,
}: {
  order: OrderView;
  options: PurchaseOrderOptions;
}) => {
  return (
    <>
      <OrderTitle title="Purchase Order" />

      <OrderDescription
        orderId={order.order_id}
        orderDate={order.order_date as string}
        currency={order.currency}
      />
      <BuyerSeller
        order={order}
        fromOptions={options.from}
        toOptions={options.to}
      />
      {options.showShippingItems && (
        <OrderItems
          currency={
            order.currency as
              | "AUD"
              | "CAD"
              | "EUR"
              | "GBP"
              | "JPY"
              | "NZD"
              | "USD"
          }
          orderItems={prepareOrderItems(order)}
        />
      )}

      {options.showPackages && <PackageSummary items={order.items} />}

      <FinancialTransactions
        currency={order.currency}
        orderItems={order.items}
        orderType={order.order_type}
      />
      {options.total && (
        <OrderTotal showCarriage={options.carriage} order={order} />
      )}
      {options.payment && <PaymentDetails order={order} />}
    </>
  );
};

export default PurchaseOrder;
