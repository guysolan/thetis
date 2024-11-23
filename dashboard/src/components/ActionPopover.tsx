import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import Sheet from "./Sheet";
import DeleteDialog from "./DeleteDialog";

interface ActionPopoverProps {
    title: string;
    description?: string;
    editForm?: React.ReactNode;
    deleteFunction?: () => void;
    onDuplicate?: () => void;
    children?: React.ReactNode;
}

const ActionPopover = ({
    title,
    description,
    editForm,
    deleteFunction,
    onDuplicate,
    children,
}: ActionPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    variant="ghost"
                    size="icon"
                >
                    <MoreVertical size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                side="bottom"
                className="flex flex-col gap-1 p-1"
            >
                {editForm && <Sheet
                    trigger={
                        <Button
                            className="justify-start gap-2 px-2"
                            variant="ghost"
                        >
                            <Edit size={20} />Edit
                        </Button>
                    }
                    title={`Edit ${title}`}
                    description={description || `Edit the details for ${title}`}
                >
                    {editForm}
                </Sheet>}

                {onDuplicate && (
                    <Button
                        onClick={onDuplicate}
                        className="justify-start gap-2 px-2"
                        variant="ghost"
                    >
                        <Copy size={20} />Duplicate
                    </Button>
                )}
                {children}
                {deleteFunction && <DeleteDialog
                    trigger={
                        <Button
                            variant="ghost"
                            className="justify-start gap-2 px-2 text-red-500 hover:text-red-600"
                        >
                            <Trash2 size={20} />Delete
                        </Button>
                    }
                    deleteFunction={deleteFunction}
                />}
            </PopoverContent>
        </Popover>
    );
};

export default ActionPopover;
