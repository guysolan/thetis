import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@thetis/ui/select";

const LocationSelect = ({ finalRegion }: { finalRegion: string }) => {
    return (
        <Select
            value={finalRegion}
            onValueChange={(value: string) => {
                const newUrl = new URL(
                    window.location.href,
                );
                newUrl.searchParams.set(
                    "region",
                    value,
                );
                window.location.href = newUrl.pathname + newUrl.search;
            }}
        >
            <SelectTrigger className="bg-white px-3 py-1 border-2 border-slate-300 rounded-md w-48">
                <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="us">United States (USD)</SelectItem>
                <SelectItem value="uk">United Kingdom (GBP)</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default LocationSelect;
