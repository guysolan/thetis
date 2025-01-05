import AnimatedModal from "./AnimatedModal";
import FreeAndSecure from "./buy-button/FreeAndSecure";
import BulkOrders from "./buy-button/BulkOrders";
import BuyButtonVariants from "./products/buy-button/BuyButtonVariants";
import BuyNightSplint from "./BuyNightSplint";

export default function BuyModal() {
  return (
    <AnimatedModal
      triggerId="buy-modal-trigger"
      modalId="buy-modal"
      triggerClass=""
      size="lg"
      variant="default"
      triggerChildren={<span>Buy Now</span>}
    >
      <div className="space-y-4 w-full text-left">
        <h3 className="font-semibold text-2xl lg:text-3xl">
          Achilles Tendon Rupture Night Splint
        </h3>
        <BuyButtonVariants />
        <div className="flex flex-col justify-center items-center gap-4 md:gap-8">
          <FreeAndSecure />
          <BulkOrders />
        </div>
      </div>
    </AnimatedModal>
  );
}
