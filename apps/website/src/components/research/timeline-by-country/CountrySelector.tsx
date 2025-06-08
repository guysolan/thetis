// CountrySelector.tsx
import React from "react";
import type { Country } from "./types";
import { getUnicodeFlagIcon } from "./utils";

interface CountrySelectorProps {
  countries: Country[];
  selectedCountries: string[];
  onSelectionChange: (selectedCountries: string[]) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountries,
  onSelectionChange,
}) => {
  const toggleCountry = (countryId: string) => {
    console.log("toggleCountry", countryId);
    if (selectedCountries.includes(countryId)) {
      // Don't allow deselecting if it's the only country selected
      if (selectedCountries.length > 1) {
        onSelectionChange(selectedCountries.filter((id) => id !== countryId));
      }
    } else {
      onSelectionChange([...selectedCountries, countryId]);
    }
  };

  const selectAll = () => {
    onSelectionChange(countries.map((country) => country.id));
  };

  const clearAll = () => {
    onSelectionChange(["usa"]); // Default to USA
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {countries.map((country) => (
          <button
            type="button"
            key={country.id}
            className={`flex items-center gap-2 px-4 py-2 border-2 rounded-full transition-colors ${
              selectedCountries.includes(country.id)
                ? "border-primary bg-primary/10"
                : "border-gray-300"
            }`}
            onClick={() => toggleCountry(country.id)}
          >
            <span className="flag-icon">
              {getUnicodeFlagIcon(country.flagCode)}
            </span>
            <span>{country.name}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="font-medium">{selectedCountries.length}</span>
          <span>countries selected</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm"
            onClick={selectAll}
          >
            Select All
          </button>
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm"
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};
