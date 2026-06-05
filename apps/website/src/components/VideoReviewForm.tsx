"use client";

import { useState } from "react";
import type { Lang } from "@/config/languages";
import { getSplintCustomerPath } from "@/lib/splint-customer-paths";
import {
  formatCopy,
  getSplintCustomerCopy,
} from "@/features/splint-customer/splintCustomerCopy";
import { Button } from "@/components/ui/button";
import { useLocationCurrency } from "@/hooks/use-location-currency";
import { AlertCircle, Check, Loader2, Star, Upload, Video } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjpalkk";
const MAX_FILE_MB = 10;

const REVIEW_CASHBACK = {
  GBP: "£20",
  EUR: "€20",
  USD: "$25",
} as const;

export function VideoReviewForm({ lang = "en" }: { lang?: Lang }) {
  const t = getSplintCustomerCopy(lang).form;
  const currency = useLocationCurrency();
  const cashbackAmount = REVIEW_CASHBACK[currency];
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
      if (!isVideo) {
        setError(t.errors.videoOnly);
        return;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setError(formatCopy(t.errors.fileSize, { max: MAX_FILE_MB }));
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
      setError(t.errors.rating);
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
        `[Rating: ${starRating}/5]${reviewText ? `\n\n${reviewText}` : ""}`
          .trim(),
      );
      files.forEach((file, i) => formData.set(`file_${i + 1}`, file));

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(t.errors.submitFailed);
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.errors.generic,
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
          {t.thankYou}
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">
          {t.submitted}
        </p>
        <p className="mb-6 text-neutral-600 dark:text-neutral-400 text-sm">
          {formatCopy(t.submittedDetail, { amount: cashbackAmount })}
        </p>
        <div className="flex sm:flex-row flex-col justify-center items-center gap-3">
          <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
            <a href={getSplintCustomerPath("course", lang)}>{t.courseCta}</a>
          </Button>
          <a
            href={getSplintCustomerPath("index", lang)}
            className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 text-sm"
          >
            {t.backToOffers}
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
          {t.name} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder={t.namePlaceholder}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.email} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder={t.emailPlaceholder}
        />
        <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">
          {t.emailHint}
        </p>
      </div>

      <div>
        <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
          {t.starRating} <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStarRating(n)}
              className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
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
          {t.starHint}
        </p>
      </div>

      <div>
        <label
          htmlFor="review"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.reviewOptional}
        </label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder={t.reviewPlaceholder}
        />
      </div>

      <div>
        <label
          htmlFor="files"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.videoOptional}
        </label>
        <p className="mb-2 font-medium text-amber-700 dark:text-amber-400 text-sm">
          {formatCopy(t.videoRequired, { amount: cashbackAmount })}
        </p>
        <div className="relative">
          <input
            id="files"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          <div className="flex justify-center items-center bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-8 border-2 border-neutral-300 focus-within:border-primary dark:border-neutral-700 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-primary transition-colors">
            {files.length > 0
              ? (
                <div className="text-center">
                  <div className="flex justify-center gap-2 mb-2">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {formatCopy(t.filesSelected, { count: files.length })}
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                    {files.map((f) => f.name).join(", ")}
                  </p>
                  <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
                    {t.total}{" "}
                    {(files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024))
                      .toFixed(2)} MB
                  </p>
                </div>
              )
              : (
                <div className="text-center">
                  <Upload className="mx-auto mb-2 w-8 h-8 text-neutral-400" />
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {t.uploadVideo}
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                    {formatCopy(t.uploadHint, { max: MAX_FILE_MB })}
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
        {isSubmitting
          ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.submitting}
            </>
          )
          : (
            <>
              <Upload className="w-4 h-4" />
              {t.submit}
            </>
          )}
      </Button>

      <p className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
        {formatCopy(t.footer, { amount: cashbackAmount })}
      </p>
    </form>
  );
}
