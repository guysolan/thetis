import React from "react";
import { CheckCircle, Shield } from "lucide-react";
const FreeAndSecure = () => {
  return (
    <div className="justify-center gap-2 md:gap-4 grid grid-cols-2 text-primary text-sm">
      <div className="flex justify-center md:justify-start items-center gap-2">
        <CheckCircle size={20} />
        <span className="text-left text-neutral-800">Free Shipping</span>
      </div>
      <div className="flex justify-center md:justify-start items-center gap-2">
        <Shield size={20} />
        <span className="text-left text-neutral-800">Secure Payment</span>
      </div>
    </div>
  );
};

export default FreeAndSecure;
