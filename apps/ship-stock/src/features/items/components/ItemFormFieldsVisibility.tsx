import { Settings2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@thetis/ui/popover";
import { Switch } from "@thetis/ui/switch";
import { Label } from "@thetis/ui/label";
import { Button } from "@thetis/ui/button";
import { useFieldVisibilityStore } from "../stores/fieldVisibilityStore";

export const ItemFormFieldsVisibility = () => {
    const { visibility, toggleField } = useFieldVisibilityStore();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <Settings2 className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                side="bottom"
                className="w-80"
            >
                <div className="space-y-4">
                    <h4 className="font-medium">Show Optional Fields</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="sku">SKU</Label>
                            <Switch
                                id="sku"
                                checked={visibility.sku}
                                onCheckedChange={(checked) =>
                                    toggleField("sku", checked)}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <Label htmlFor="country">Country of Origin</Label>
                            <Switch
                                id="country"
                                checked={visibility.countryOfOrigin}
                                onCheckedChange={(checked) =>
                                    toggleField("countryOfOrigin", checked)}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <Label htmlFor="dimensions">
                                Dimensions & Weight
                            </Label>
                            <Switch
                                id="dimensions"
                                checked={visibility.dimensions}
                                onCheckedChange={(checked) =>
                                    toggleField("dimensions", checked)}
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
