"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@thetis/ui/select";
import { cn } from "@/lib/utils";
import type { Address } from "../../stockpiles/types";
import { useSelectAddresses } from "../../stockpiles/api/selectAddresses";
import { Separator } from "@thetis/ui/separator";

interface CompanyAddressSelectProps {
  value?: string;
  onChange: (value: string) => void;
  companyId: number;
  placeholder?: string;
  error?: string;
  width?: string;
}

export function CompanyAddressSelect({
  value,
  onChange,
  companyId,
  placeholder = "Select address...",
  error,
  width = "w-[400px]",
}: CompanyAddressSelectProps) {
  const { data: addresses = [] } = useSelectAddresses();

  const formatAddress = (addr: Address["Row"]) =>
    `${addr.line_1 ? `${addr.line_1}, ` : ""}${
      addr.line_2 ? `${addr.line_2}, ` : ""
    }${addr.city ? `${addr.city}, ` : "Unknown City"}${
      addr.region ? `${addr.region}, ` : ""
    }${addr.code ? `${addr.code}, ` : ""}${addr.country ?? "No Country"}`;

  const allAddressOptions = {
    company: addresses
      .filter((addr) => String(addr.company_id) === String(companyId))
      ?.map((addr) => ({
        label: formatAddress(addr),
        value: String(addr.id),
      })),
    other: addresses
      .filter((addr) => String(addr.company_id) !== String(companyId))
      ?.map((addr) => ({
        label: formatAddress(addr),
        value: String(addr.id),
      })),
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full min-w-0",
          error && "border-destructive",
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allAddressOptions.company?.length > 0 && (
          <>
            <SelectGroup>
              <SelectLabel>Company Addresses</SelectLabel>
              {allAddressOptions.company?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <Separator />
          </>
        )}
        {allAddressOptions.other?.length > 0 && (
          <SelectGroup>
            <SelectLabel>Other Addresses</SelectLabel>
            {allAddressOptions.other?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
