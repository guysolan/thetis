import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@thetis/ui/dialog";
import { useSelectTextBlocks } from "./useSelectTextBlocks";
import { useUpdateOrderTextBlock } from "./useUpdateOrderTextBlock";
import type { JSONContent } from "@tiptap/react";
import { Button } from "@thetis/ui/button";

type Props = {
  orderId: number;
  position: number;
  onSelect: (content: JSONContent) => void;
};

function getTextPreview(content: JSONContent, maxLength: number = 100): string {
  if (!content) return "";

  const extractText = (node: JSONContent): string => {
    if (typeof node.text === "string") {
      return node.text;
    }

    if (Array.isArray(node.content)) {
      return node.content
        .map((child) => extractText(child))
        .filter(Boolean)
        .join(" ");
    }

    return "";
  };

  const text = extractText(content);
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function AddTextBlock({ orderId, position, onSelect }: Props) {
  const { data: textBlocks } = useSelectTextBlocks();
  const { mutate: updateOrderTextBlock } = useUpdateOrderTextBlock();

  const handleSelectExisting = (block: (typeof textBlocks)[0]) => {
    onSelect(block.content as JSONContent);
    updateOrderTextBlock({
      orderId,
      textBlockId: block.id,
      position,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Text Block</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Text Block</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {textBlocks?.map((block) => (
            <div
              key={block.id}
              className="hover:bg-secondary/20 p-4 border-b cursor-pointer"
              onClick={() => handleSelectExisting(block)}
            >
              <div className="mb-1 font-medium">{block.name}</div>
              <div className="text-muted-foreground text-sm">
                {getTextPreview(block.content as JSONContent)}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
