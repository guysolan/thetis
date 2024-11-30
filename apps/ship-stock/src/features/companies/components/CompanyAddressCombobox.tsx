"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@thetis/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@thetis/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@thetis/ui/popover"
import { cn } from "@/lib/utils"
import type { Address } from '../../stockpiles/types'
import { useSelectAddresses } from "../../stockpiles/api/selectAddresses"
import { Separator } from '@thetis/ui/separator'

interface CompanyAddressComboboxProps {
    value?: string
    onChange: (value: string) => void
    companyId: number
    placeholder?: string
    error?: string
    width?: string
}

export function CompanyAddressCombobox({
    value,
    onChange,
    companyId,
    placeholder = "Select address...",
    error,
    width = "w-[400px]",
}: CompanyAddressComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const { data: addresses = [] } = useSelectAddresses()

    const formatAddress = (addr: Address['Row']) => `${addr.line_1 ? `${addr.line_1}, ` : ""
        }${addr.line_2 ? `${addr.line_2}, ` : ""
        }${addr.city ? `${addr.city}, ` : "Unknown City"
        }${addr.region ? `${addr.region}, ` : ""
        }${addr.code ? `${addr.code}, ` : ""
        }${addr.country ?? "No Country"}`



    const allAddressOptions = {
        company: addresses.filter(addr => String(addr.company_id) === String(companyId))?.map((addr) => ({
            label: formatAddress(addr),
            value: String(addr.id),
            group: "Company Addresses"
        })),
        other: addresses.filter(addr => String(addr.company_id) !== String(companyId))?.map((addr) => ({
            label: formatAddress(addr),
            value: String(addr.id),
            group: "Other Addresses"
        }))
    }

    const selectedAddress =
        allAddressOptions.company?.find(opt => opt.value === value) ||
        allAddressOptions.other?.find(opt => opt.value === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        width,
                        "w-full font-normal",
                        "justify-between",
                        error && "border-red-500"
                    )}
                >
                    {selectedAddress ? (
                        <span className="truncate">{selectedAddress.label}</span>
                    ) : (
                        <span className="text-muted-foreground">
                            {placeholder}
                        </span>
                    )}
                    <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0", width, "max-w-full")} align="start">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No address found.</CommandEmpty>
                    {allAddressOptions.company?.length > 0 && (
                        <CommandGroup>
                            {allAddressOptions.company?.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.value}
                                    onSelect={() => {
                                        onChange(opt.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            opt.value === value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    <Separator />
                    {allAddressOptions.other?.length > 0 && (
                        <CommandGroup >
                            {allAddressOptions.other?.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.value}
                                    onSelect={() => {
                                        onChange(opt.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            opt.value === value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    )
} 