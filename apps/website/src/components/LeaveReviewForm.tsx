"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Loader2, Upload, Video, Image, Star } from "lucide-react";

// Currency detection
const getCurrency = async () => {
    try {
        const geoResponse = await fetch("https://ipapi.co/json/");
        if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            const country = geoData.country_code || "GB";
            if (country === "US") {
                return { symbol: "$", amount: "15" };
            }
        }
    } catch (error) {
        console.error("Failed to detect location:", error);
    }
    return { symbol: "£", amount: "10" };
};

type ProductType = "splint" | "course";

const PRODUCTS = {
    splint: {
        name: "Achilles Night Splint",
        description: "Share your experience using the night splint for recovery",
    },
    course: {
        name: "Achilles Recovery Course",
        description: "Share your experience with the recovery course content",
    },
};

export function LeaveReviewForm() {
    const [product, setProduct] = useState<ProductType>("splint");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [currency, setCurrency] = useState({ symbol: "£", amount: "10" });

    // Check URL params for product selection and detect currency
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const productParam = params.get("product");
        if (productParam === "course" || productParam === "splint") {
            setProduct(productParam);
        }
        
        // Detect currency
        getCurrency().then(curr => {
            setCurrency(curr);
            const cashbackLabel = document.getElementById("cashback-label");
            if (cashbackLabel) {
                cashbackLabel.textContent = `(cashback for videos with spoken review only)`;
            }
            const uploadText = document.getElementById("upload-cashback-text");
            if (uploadText) {
                uploadText.textContent = `Cashback only for videos with spoken review (${curr.symbol}${curr.amount})`;
            }
        });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        // Validate files - accept both photos and videos
        for (const file of selectedFiles) {
            const isVideo = file.type.startsWith("video/");
            const isImage = file.type.startsWith("image/");
            
            if (!isVideo && !isImage) {
                setError("Please upload only photos or videos");
                return;
            }
            
            if (file.size > 100 * 1024 * 1024) {
                setError("Each file must be less than 100MB");
                return;
            }
        }

        setFiles(selectedFiles);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!reviewText.trim()) {
            setError("Please write a review");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("_subject", `New ${PRODUCTS[product].name} Review from ${name}`);
            formData.append("product", PRODUCTS[product].name);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("rating", rating.toString());
            formData.append("review", reviewText);
            
            // Determine media type and cashback eligibility
            const hasVideos = files.some(f => f.type.startsWith("video/"));
            const hasPhotos = files.some(f => f.type.startsWith("image/"));
            let mediaStatus = "No media";
            if (hasVideos && hasPhotos) {
                mediaStatus = "Videos and photos - cashback eligible if video has spoken review";
            } else if (hasVideos) {
                mediaStatus = "Videos only - cashback eligible if video has spoken review";
            } else if (hasPhotos) {
                mediaStatus = "Photos only - not eligible for cashback";
            }
            formData.append("has_media", mediaStatus);
            
            // Attach files to the form
            files.forEach((file, index) => {
                formData.append(`file_${index + 1}`, file);
            });

            const response = await fetch("https://formspree.io/f/mnjpalkk", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
            console.error("Error submitting review:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-primary/10 dark:bg-primary/20 p-8 border border-primary/20 dark:border-primary/30 rounded-lg text-center">
                <Check className="mx-auto mb-4 w-12 h-12 text-primary" />
                <p className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                    Thank You for Your Review!
                </p>
                <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                    Your review of the {PRODUCTS[product].name} has been submitted successfully.
                </p>
                {files.some(f => f.type.startsWith("video/")) ? (
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        We'll review your submission within 3-5 business days. If your video includes a spoken review (30+ seconds), you'll receive an email with instructions to claim your <strong>{currency.symbol}{currency.amount} cashback</strong> once approved.
                    </p>
                ) : files.length > 0 ? (
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Thank you for your photos! Note that cashback is only available for video reviews with spoken content. We'll review your submission within 3-5 business days.
                    </p>
                ) : (
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Thank you for your feedback! To earn cashback, make sure to include a video with spoken review (30+ seconds) in future submissions.
                    </p>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Selector */}
            <div>
                <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
                    What are you reviewing? <span className="text-red-500">*</span>
                </label>
                <div className="gap-4 grid grid-cols-2">
                    <button
                        type="button"
                        onClick={() => setProduct("splint")}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                            product === "splint"
                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                        }`}
                    >
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            🦶 Night Splint
                        </div>
                        <div className="mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
                            Achilles recovery splint
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => setProduct("course")}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                            product === "course"
                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                        }`}
                    >
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            📚 Recovery Course
                        </div>
                        <div className="mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
                            Online recovery guide
                        </div>
                    </button>
                </div>
            </div>

            {/* Name */}
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                    placeholder="Your name"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                    placeholder="your@email.com"
                />
                <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
                    We'll use this to contact you about your cashback
                </p>
            </div>

            {/* Rating */}
            <div>
                <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
                    Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                        >
                            <Star
                                className={`w-8 h-8 ${
                                    star <= rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-neutral-300 dark:text-neutral-600"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Review Text */}
            <div>
                <label
                    htmlFor="review"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    rows={5}
                    className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
                    placeholder={`Share your experience with the ${PRODUCTS[product].name}...`}
                />
            </div>

            {/* File Upload */}
            <div>
                <label
                    htmlFor="files"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Photos or Videos{" "}
                    <span className="font-normal text-primary" id="cashback-label">(cashback for videos with spoken review only)</span>
                </label>
                <p className="mb-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    You can upload <strong>photos or videos</strong>. <strong>Cashback is only available for video reviews with spoken content</strong> (minimum 30 seconds of speaking). Photo-only reviews do not qualify for cashback.
                </p>
                <div className="relative">
                    <input
                        id="files"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        multiple
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="flex justify-center items-center bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-8 border-2 border-neutral-300 focus-within:border-primary dark:border-neutral-700 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-primary transition-colors">
                        {files.length > 0 ? (
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    {files.some(f => f.type.startsWith("video/")) ? (
                                        <Video className="w-6 h-6 text-primary" />
                                    ) : (
                                        <Image className="w-6 h-6 text-primary" />
                                    )}
                                </div>
                                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                    {files.length} file{files.length > 1 ? "s" : ""} selected
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    {files.map((f) => f.name).join(", ")}
                                </p>
                                {files.some(f => f.type.startsWith("video/")) ? (
                                    <p className="mt-2 font-medium text-primary text-xs">
                                        ✓ Video may be eligible for cashback (if it includes spoken review)
                                    </p>
                                ) : (
                                    <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400 text-xs">
                                        ⚠️ Photos do not qualify for cashback
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="flex justify-center gap-3 mb-2">
                                    <Image className="w-8 h-8 text-neutral-400" />
                                    <Video className="w-8 h-8 text-neutral-400" />
                                </div>
                                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Click to upload photos or videos
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Photos: JPG, PNG • Videos: MP4, MOV (30+ sec for cashback) • Max 100MB each
                                </p>
                                <p className="mt-2 font-medium text-primary text-xs" id="upload-cashback-text">
                                    Cashback only for videos with spoken review
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="mt-0.5 w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                    <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="gap-2 w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Star className="w-4 h-4" />
                        Submit Review
                    </>
                )}
            </Button>

            <p className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
                By submitting, you agree that your review may be featured on our website
                (with your permission). Cashback ({currency.symbol}{currency.amount}) is only available for approved
                video reviews with spoken content and will be processed within 7-10 business days.
            </p>
        </form>
    );
}
