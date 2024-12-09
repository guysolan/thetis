import React from "react";
import CompanyAddressContact from "./CompanyAddressContact";
const BuyerSeller = ({ isShipment = false }: { isShipment?: boolean }) => {
  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
      <CompanyAddressContact
        title={isShipment ? "Receiver" : "Buyer"}
        direction="to"
      />
      <CompanyAddressContact
        title={isShipment ? "Shipper" : "Seller"}
        direction="from"
      />
    </div>
  );
};

export default BuyerSeller;
