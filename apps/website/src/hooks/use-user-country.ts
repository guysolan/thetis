import { useEffect, useState } from "react";

export function useUserCountry() {
    const [country, setCountry] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((data) => {
                setCountry(data.country_code);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch country:", err);
                setIsLoading(false);
            });
    }, []);

    return { country, isLoading };
}
