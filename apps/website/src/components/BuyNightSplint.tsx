import { type FC } from "react";
import StarRating from "@/components/reviews/StarRating";
import BuyButtonVariants from "./products/buy-button/BuyButtonVariants";
import nightSplint from "@/components/products/images/night-splint/night_splint_bed_top.jpg";
// import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
interface Props {
  showImage?: boolean;
}

const BuyNightSplint: FC<Props> = ({ showImage = true }) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-8 my-2">
      {showImage && (
        <div className="relative w-full max-w-[600px] h-[600px] group">
          <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
          <img
            height={1200}
            width={800}
            className="group-hover:scale-[102%] relative shadow-lg group-hover:shadow-xl rounded-lg w-full h-full transition-all duration-300 object-cover"
            src={nightSplint.src}
            alt="Night Splint Render"
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
          Achilles Tendon Rupture Night Splint
        </h3>
        {/* <StarRating /> */}
        {/* <StarRating /> */}
        <BuyButtonVariants />
        <div className="flex flex-col gap-4 md:gap-8">
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

          <Button asChild variant="ghost" size="lg">
            <a className="flex flex-row items-center gap-2" href="/bulk-orders">
              <span>Bulk Orders & Special Pricing</span>
              <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyNightSplint;
