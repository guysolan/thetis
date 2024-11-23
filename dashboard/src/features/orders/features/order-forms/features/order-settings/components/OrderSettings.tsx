import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useOrderSettings } from '../stores/orderSettingsStore';



const yesNoOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
];

export const OrderSettings = () => {
    const { settings, updateSettings } = useOrderSettings();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Settings2 size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <div className="gap-4 grid">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Order Settings</h4>
                        <p className="text-muted-foreground text-sm">
                            Configure how orders are displayed and processed
                        </p>
                    </div>

                    <div className="gap-2 grid">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="packaged">Package Items</Label>
                            <Select
                                value={settings.packaged.toString()}
                                onValueChange={(value) =>
                                    updateSettings({ packaged: value === "true" })
                                }
                            >
                                <SelectTrigger className="w-[110px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {yesNoOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};