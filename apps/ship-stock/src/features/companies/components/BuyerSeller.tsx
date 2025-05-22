import React from "react";
import CompanyAddressContact from "./CompanyAddressContact";
import type { ExtendedOrder } from "../../orders/types";

interface BuyerSellerProps {
  isShipment?: boolean;
  order?: ExtendedOrder;
}

const BuyerSeller = ({ isShipment = false, order }: BuyerSellerProps) => {
  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
      <CompanyAddressContact
        title={isShipment ? "Receiver" : "Buyer"}
        direction="to"
        defaultExpanded={!order}
      />
      <CompanyAddressContact
        title={isShipment ? "Shipper" : "Seller"}
        direction="from"
        defaultExpanded={!order}
      />
    </div>
  );
};

export default BuyerSeller;
