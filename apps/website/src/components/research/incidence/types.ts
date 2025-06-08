export interface SurgicalRate {
    trend: string;
    evidence: string;
    direction: string;
    [key: string]: number | string | undefined;
}

export interface CountryData {
    country: string;
    code: string;
    source: string;
    sample_size: string;
    surgical_rate: {
        [key: string]: number | string;
        trend: string;
        evidence: string;
        direction: string;
    };
    incidence: {
        [key: string]: number | string;
    };
    demographics: {
        mean_age: number;
        male_percentage: number;
        sports_related: number;
    };
    key_finding: string;
    outcomes?: Record<string, string>;
}
