"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Loader2, Upload, Video } from "lucide-react";

export function VideoReviewForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("video/")) {
                setError("Please upload a video file");
                return;
            }
            // Validate file size (max 100MB)
            if (file.size > 100 * 1024 * 1024) {
                setError("Video file must be less than 100MB");
                return;
            }
            setVideoFile(file);
            setError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!videoFile) {
            setError("Please select a video file");
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("review", reviewText);
            formData.append("video", videoFile);

            // Simulate upload progress
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setUploadProgress(percentComplete);
                }
            });

            // For now, submit to Formspree or a similar service
            // TODO: Replace with actual API endpoint
            const response = await fetch("https://formspree.io/f/xrgwkooy", {
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
            setUploadProgress(0);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-primary/10 dark:bg-primary/20 p-8 border border-primary/20 dark:border-primary/30 rounded-lg text-center">
                <Check className="mx-auto mb-4 w-12 h-12 text-primary" />
                <p className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                    Thank You!
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                    Your video review has been submitted successfully. We'll
                    review it within 3-5 business days. If approved, you'll
                    receive an email with instructions to claim your $10
                    cashback.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Share your honest feedback about your experience with the night splint..."
                />
            </div>

            <div>
                <label
                    htmlFor="video"
                    className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
                >
                    Video File <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="flex justify-center items-center bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-8 border-2 border-neutral-300 focus-within:border-primary dark:border-neutral-700 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-primary transition-colors">
                        {videoFile
                            ? (
                                <div className="text-center">
                                    <Video className="mx-auto mb-2 w-8 h-8 text-primary" />
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                        {videoFile.name}
                                    </p>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        {(videoFile.size / (1024 * 1024))
                                            .toFixed(2)} MB
                                    </p>
                                </div>
                            )
                            : (
                                <div className="text-center">
                                    <Upload className="mx-auto mb-2 w-8 h-8 text-neutral-400" />
                                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                        Click to upload video
                                    </p>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        Max 100MB • MP4, MOV, AVI, etc.
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-2">
                        <div className="bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm text-center">
                            Uploading... {Math.round(uploadProgress)}%
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="mt-0.5 w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                    <p className="text-red-800 dark:text-red-200 text-sm">
                        {error}
                    </p>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="gap-2 w-full"
                disabled={isSubmitting || !videoFile}
            >
                {isSubmitting
                    ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                        </>
                    )
                    : (
                        <>
                            <Upload className="w-4 h-4" />
                            Submit Review
                        </>
                    )}
            </Button>

            <p className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
                By submitting, you agree that your review may be featured on our
                website (with your permission). Cashback will be processed
                within 7-10 business days after approval.
            </p>
        </form>
    );
}
