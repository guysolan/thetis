import { Link } from "@tanstack/react-router";
import { marketplaces } from "../constants/marketplace-ids";
import { cn } from "@thetis/ui/cn";

export function CountryTabs({ country }: { country: string }) {
  console.log(country);

  return (
    <nav className="flex gap-2 border-gray-200 p-4 border-b">
      {marketplaces
        .filter((m) => m.hide !== true)
        .map((marketplace) => (
          <Link
            key={marketplace.id}
            to={`/settlements/${marketplace.region}/${marketplace.country}`}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              marketplace.country === country
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            {marketplace.country}
          </Link>
        ))}
    </nav>
  );
}
