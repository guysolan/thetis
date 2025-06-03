import { type FC } from "react";
import StarRating from "@/components/reviews/StarRating";
import BuyButtonVariants from "./products/buy-button/BuyButtonVariants";
import nightSplint from "@/components/products/images/night-splint/night_splint_bed_top.jpg";
// import Image from "next/image";

import BulkOrders from "./buy-button/BulkOrders";
import FreeAndSecure from "./buy-button/FreeAndSecure";
interface Props {
  showImage?: boolean;
}

const BuyNightSplint: FC<Props> = ({ showImage = true }) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-8 my-2">
      {showImage && (
        <div className="group relative w-full max-w-[600px] h-[600px]">
          <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
          <img
            height={1200}
            width={800}
            className="relative shadow-lg group-hover:shadow-xl rounded-lg w-full h-full object-cover group-hover:scale-[102%] transition-all duration-300"
            src={nightSplint.src}
            alt="Splint Render"
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              target.previousElementSibling?.setAttribute(
                "style",
                "display: none",
              );
            }}
          />
        </div>
      )}

      <div className="space-y-4 w-full text-left">
        <h3 className="font-semibold text-2xl lg:text-3xl">
          Achilles Tendon Rupture Splint
        </h3>
        <BuyButtonVariants />
        <div className="flex flex-col gap-4 md:gap-8">
          <FreeAndSecure />
          <BulkOrders />
        </div>
      </div>
    </div>
  );
};

export default BuyNightSplint;
