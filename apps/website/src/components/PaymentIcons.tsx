import React from "react";

export function PaymentIcons({ className }: { className?: string }) {
    return (
        <div className={`flex flex-wrap items-center gap-2 ${className || ""}`}>
            {/* Visa */}
            <div className="flex justify-center items-center bg-white px-2 py-1 border border-neutral-200 rounded h-6">
                <span className="font-bold text-[#1434CB] text-[10px]">
                    VISA
                </span>
            </div>
            {/* Mastercard */}
            <div className="flex justify-center items-center bg-white px-2 py-1 border border-neutral-200 rounded h-6">
                <div className="flex items-center gap-0.5">
                    <div className="bg-[#EB001B] rounded-full w-3 h-3" />
                    <div className="bg-[#F79E1B] -ml-1.5 rounded-full w-3 h-3" />
                </div>
            </div>
            {/* American Express */}
            <div className="flex justify-center items-center bg-[#006FCF] px-2 py-1 rounded h-6">
                <span className="font-bold text-[9px] text-white">AMEX</span>
            </div>
            {/* PayPal */}
            <div className="flex justify-center items-center bg-white px-2 py-1 border border-neutral-200 rounded h-6">
                <span className="font-bold text-[#003087] text-[10px]">
                    PayPal
                </span>
            </div>
            {/* Google Pay */}
            <div className="flex justify-center items-center bg-[#4285F4] px-2 py-1 rounded h-6">
                <span className="font-bold text-[9px] text-white">G Pay</span>
            </div>
            {/* Shop Pay */}
            <div className="flex justify-center items-center bg-[#5A31F4] px-2 py-1 rounded h-6">
                <span className="font-bold text-[9px] text-white">Shop</span>
            </div>
        </div>
    );
}
