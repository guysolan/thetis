export interface Review {
    stars: number;
    body: string;
    name: string;
    title: string;
    date: string;
    is_pinned?: boolean;
}
