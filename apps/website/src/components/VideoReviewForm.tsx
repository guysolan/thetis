"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Image, Loader2, Star, Upload, Video } from "lucide-react";

// Formspree form for splint-customer review (same pattern as LeaveReviewForm – no server code)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjpalkk";

const MAX_FILE_MB = 10; // Formspree-friendly limit

export function VideoReviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [starRating, setStarRating] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isVideo && !isImage) {
        setError("Please upload video or image files only");
        return;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`Each file must be less than ${MAX_FILE_MB}MB`);
        return;
      }
    }

    setFiles(selectedFiles);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (starRating == null || starRating < 1) {
      setError("Please select a star rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.set("_subject", "Splint customer review (cashback)");
      formData.set("name", name);
      formData.set("email", email);
      formData.set("rating", String(starRating));
      formData.set(
        "review",
        `[Rating: ${starRating}/5]${reviewText ? `\n\n${reviewText}` : ""}`.trim(),
      );
      files.forEach((file, i) => formData.set(`file_${i + 1}`, file));

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to submit review. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
          Thank You!
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          Your review has been submitted successfully.
        </p>
        <p className="mb-6 text-neutral-600 dark:text-neutral-400 text-sm">
          If you included a video or photos, we'll review within 3-5 business days and, once
          approved, you'll receive an email to claim your cashback (£10 / $15). If you didn't add a
          video or photos, add one later via the same form to be eligible for cashback.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
            <a href="/splint-customer/claim-cashback">Claim Your Cashback →</a>
          </Button>
          <a
            href="/splint-customer/share-doctor"
            className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 text-sm"
          >
            ← Back to Special Offers
          </a>
        </div>
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
        <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
          Star rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStarRating(n)}
              className="p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
            >
              <Star
                className={`w-8 h-8 ${
                  starRating !== null && n <= starRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-300 dark:text-neutral-600"
                }`}
              />
            </button>
          ))}
        </div>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
          1 = poor, 5 = excellent
        </p>
      </div>

      <div>
        <label
          htmlFor="review"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          Your Review <span className="text-neutral-500">(optional)</span>
        </label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder="Share any additional feedback about your experience with the night splint..."
        />
      </div>

      <div>
        <label
          htmlFor="files"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          Video or photos <span className="text-neutral-500">(optional)</span>
        </label>
        <p className="mb-2 text-amber-700 dark:text-amber-400 text-sm font-medium">
          Required for cashback — we need a video (or photos) to approve your review and send
          £10/$15. You can submit your rating now and add a video later.
        </p>
        <div className="relative">
          <input
            id="files"
            type="file"
            accept="video/*,image/*"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          <div className="flex justify-center items-center bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-8 border-2 border-neutral-300 focus-within:border-primary dark:border-neutral-700 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-primary transition-colors">
            {files.length > 0 ? (
              <div className="text-center">
                <div className="flex justify-center gap-2 mb-2">
                  <Video className="w-6 h-6 text-primary" />
                  <Image className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {files.length} file{files.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {files.map((f) => f.name).join(", ")}
                </p>
                <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
                  Total: {(files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-2 w-8 h-8 text-neutral-400" />
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  Click to upload video or photos
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  Max {MAX_FILE_MB}MB per file • MP4, MOV, JPG, PNG, etc.
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
        disabled={isSubmitting || starRating == null}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Submit Review
          </>
        )}
      </Button>

      <p className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
        By submitting, you agree that your review may be featured on our website (with your
        permission). Cashback (£10 / $15) will be processed within 7-10 business days after
        approval.
      </p>
    </form>
  );
}
