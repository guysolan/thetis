import type { ImageMetadata } from "astro";

export type Review = {
    name: string;
    link: string;
    description: string;
    image: ImageMetadata;
    title: string;
    short?: string;
    body: string;
    country: string;
    clinics: string[];
    clinicImages: string[];
    date: string;
    stars?: number;
    is_pinned?: boolean;
};
import type { Lang } from "../../config/languages";

export type ReviewContent = {
    description: string;
    title: string;
    short?: string;
    body: string;
};

export type TranslatedReview =
    & Omit<Review, "description" | "title" | "short" | "body">
    & {
        content: Record<Lang, ReviewContent>;
    };
