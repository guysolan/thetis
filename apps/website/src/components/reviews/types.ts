export interface Review {
    name: string;
    description?: string;
    date?: string;
    image?: string | { src: string; [key: string]: any };
    link?: string;
    stars?: number;
    title: string;
    body: string;
    short?: string;
    is_pinned?: boolean;
    type?: "athlete" | "clinician" | "patient";
    country:
        | "US"
        | "CA"
        | "GB"
        | "DE"
        | "IT"
        | "FR"
        | "WLS"
        | "SCT"
        | "IRL"
        | "SE";
}
