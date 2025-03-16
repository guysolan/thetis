import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";

interface ExchangeRate {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
}

const accessKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

interface ExchangeRatesProps {
  date?: string; // ISO date string format (YYYY-MM-DD)
  baseCurrency?: string; // Default to GBP
}

const ExchangeRates = ({
  date = new Date().toISOString().split("T")[0],
  baseCurrency = "GBP",
}: ExchangeRatesProps) => {
  const targetCurrencies = ["USD", "AUD", "EUR", "CAD"];

  // Format date for API (YYYY-MM-DD)
  const formattedDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  // Determine if we need historical data
  const isHistorical =
    new Date(formattedDate) < new Date(new Date().toISOString().split("T")[0]);

  // Use react-query to fetch and cache exchange rates
  const { data, isLoading, error } = useQuery({
    queryKey: ["exchangeRates", formattedDate, baseCurrency],
    queryFn: async () => {
      // Use the appropriate endpoint based on whether we need historical data
      const endpoint = isHistorical
        ? `https://api.exchangerate.host/historical?date=${formattedDate}&access_key=${accessKey}`
        : `https://api.exchangerate.host/live?access_key=${accessKey}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.info || "API returned an error");
      }

      // The API always returns USD as the source, so we need to calculate our rates
      const quotes = data.quotes;

      // Calculate rates for our target currencies
      return targetCurrencies
        .filter((currency) => currency !== baseCurrency) // Don't include base currency in results
        .map((currency) => {
          let rate;

          if (baseCurrency === "USD") {
            // If base is USD, use the rate directly
            rate = quotes[`USD${currency}`];
          } else if (currency === "USD") {
            // If target is USD, use the inverse of USD to base
            rate = 1 / quotes[`USD${baseCurrency}`];
          } else {
            // For cross rates (e.g., GBP to EUR)
            // First convert USD to target, then adjust by USD to base
            // For example: 1 GBP = (1 / USDGBP) * USDEUR
            rate = quotes[`USD${currency}`] / quotes[`USD${baseCurrency}`];
          }

          return {
            baseCurrency,
            targetCurrency: currency,
            rate: rate,
          };
        });
    },
    // Fallback data if query fails
    placeholderData: targetCurrencies
      .filter((currency) => currency !== baseCurrency)
      .map((currency) => {
        const staticRates: Record<string, Record<string, number>> = {
          GBP: {
            USD: 1.3,
            AUD: 1.95,
            EUR: 1.17,
            CAD: 1.75,
          },
          USD: {
            GBP: 0.77,
            AUD: 1.5,
            EUR: 0.9,
            CAD: 1.35,
          },
          EUR: {
            GBP: 0.85,
            USD: 1.11,
            AUD: 1.67,
            CAD: 1.5,
          },
        };

        const baseRates = staticRates[baseCurrency] || {};

        return {
          baseCurrency,
          targetCurrency: currency,
          rate: baseRates[currency] || 1.0,
        };
      }),
    // Cache for 1 hour
    staleTime: 60 * 60 * 1000,
  });

  // Format the rate with 2 decimal places
  const formatRate = (rate: number) => rate.toFixed(2);

  return (
    <Table>
      <TableCaption>
        Exchange Rates {date && `(${new Date(date).toLocaleDateString()})`}
        {error ? (
          <span className="ml-2 text-red-500 text-sm">
            Using estimated rates ({(error as Error).message})
          </span>
        ) : null}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black dark:text-white">From</TableHead>
          <TableHead className="text-black dark:text-white">To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              Loading exchange rates...
            </TableCell>
          </TableRow>
        ) : (
          data?.map((rate) => (
            <TableRow key={rate.targetCurrency}>
              <TableCell>1 {rate.baseCurrency}</TableCell>
              <TableCell>
                {formatRate(rate.rate)} {rate.targetCurrency}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ExchangeRates;
