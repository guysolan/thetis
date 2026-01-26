"use client";

import React, { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
    images: Array<{
        src: string;
        alt: string;
    }>;
    className?: string;
}

export function ProductImageGallery({
    images,
    className,
}: ProductImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!images || images.length === 0) return null;

    const mainImage = images[selectedIndex];

    return (
        <div className={cn("space-y-4", className)}>
            {/* Main Image with Zoom */}
            <div className="group relative">
                <div className="relative bg-neutral-100 rounded-xl aspect-square overflow-hidden">
                    <img
                        src={mainImage.src}
                        alt={mainImage.alt}
                        className={cn(
                            "w-full h-full object-cover transition-transform duration-300 cursor-zoom-in",
                            isZoomed && "scale-150",
                        )}
                        onClick={() => setIsZoomed(!isZoomed)}
                    />
                    {!isZoomed && (
                        <div className="top-4 right-4 absolute flex items-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg text-white transition-opacity">
                            <ZoomIn className="w-4 h-4" />
                            <span className="font-medium text-xs">
                                Click to zoom
                            </span>
                        </div>
                    )}
                </div>

                {/* Zoomed View Modal */}
                {isZoomed && (
                    <div
                        className="z-50 fixed inset-0 flex justify-center items-center bg-black/90 p-4"
                        onClick={() => setIsZoomed(false)}
                    >
                        <button
                            onClick={() => setIsZoomed(false)}
                            className="top-4 right-4 absolute text-white hover:text-neutral-300 transition-colors"
                            aria-label="Close zoom"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img
                            src={mainImage.src}
                            alt={mainImage.alt}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
                <div className="flex gap-2 pb-2 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedIndex(index);
                                setIsZoomed(false);
                            }}
                            className={cn(
                                "flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all",
                                selectedIndex === index
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-neutral-200 hover:border-neutral-300",
                            )}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-20 h-20 object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
