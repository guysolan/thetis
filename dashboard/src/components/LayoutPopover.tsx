import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid, List, Settings2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLayoutStore } from "@/store/useLayoutStore";

const LayoutPopover = () => {
    const { view, setView } = useLayoutStore();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                >
                    <Settings2 size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                side="bottom"
                className="p-3 w-[200px]"
            >
                <RadioGroup
                    value={view}
                    onValueChange={(value) => setView(value as 'table' | 'cards')}
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="table" id="table" />
                        <Label htmlFor="table" className="flex items-center gap-2">
                            <List size={16} />
                            Table View
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cards" id="cards" />
                        <Label htmlFor="cards" className="flex items-center gap-2">
                            <LayoutGrid size={16} />
                            Cards View
                        </Label>
                    </div>
                </RadioGroup>
            </PopoverContent>
        </Popover>
    );
};

export default LayoutPopover;