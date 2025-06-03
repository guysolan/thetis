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
};
