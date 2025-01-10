export interface Review {
    name: string;
    description?: string;
    date?: string;
    image?: ImageMetadata;
    link?: string;
    stars?: number;
    title: string;
    body: string;
    short?: string;
    is_pinned?: boolean;
    country: "US" | "CA" | "GB" | "DE" | "IT" | "FR";
}
