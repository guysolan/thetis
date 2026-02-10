import { Button } from "@thetis/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
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
          className="dark:text-neutral-100"
          type="button"
          variant="ghost"
          size="icon"
        >
          <MoreVertical size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="z-30 flex flex-col gap-0.5 p-1.5 min-w-[11rem]"
      >
        {editForm && (
          <Sheet
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 px-3 py-2 w-full font-normal text-sm"
              >
                <Edit size={16} />
                Edit
              </Button>
            }
            title={`Edit ${title}`}
            description={description || `Edit the details for ${title}`}
          >
            {editForm}
          </Sheet>
        )}

        {onDuplicate && (
          <Button
            variant="ghost"
            size="sm"
            className="justify-start gap-2 px-3 py-2 w-full font-normal text-sm"
            onClick={onDuplicate}
          >
            <Copy size={16} />
            Duplicate
          </Button>
        )}
        {children}
        {deleteFunction && (
          <DeleteDialog
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 hover:bg-red-50 dark:hover:bg-red-950/30 px-2 w-full font-normal text-red-600 hover:text-red-700 text-sm"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            }
            deleteFunction={deleteFunction}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ActionPopover;
