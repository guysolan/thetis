"use client";

import { cn } from "@thetis/ui/cn";
import { Button } from "@thetis/ui/button";

import { Editor } from "./Editor";
import type { JSONContent } from "@tiptap/react";
import { useCallback, useState } from "react";
import { useSelectTextBlocks } from "./useSelectTextBlocks";
import { useUpsertTextBlock } from "./useUpsertTextBlock";
import { useUpdateOrderTextBlock } from "./useUpdateOrderTextBlock";
import { useDeleteOrderTextBlock } from "./useDeleteOrderTextBlock";
import { Input } from "@thetis/ui/input";
import { X } from "lucide-react";

type Props = {
  orderId: number;
  blockId?: string;
  position: number;
  initialContent?: JSONContent;
  initialName?: string;
  className?: string;
  placeholder?: string;
  disablePlaceholder?: boolean;
  tabIndex?: number;
};

export function EditTextBlock({
  orderId,
  blockId,
  position,
  initialContent,
  initialName = "",
  className,
  placeholder,
  disablePlaceholder = false,
  tabIndex,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState<JSONContent | null | undefined>(
    initialContent,
  );
  const [name, setName] = useState(initialName);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  // Hooks
  const { mutate: upsertTextBlock, isPending: isUpsertPending } =
    useUpsertTextBlock();
  const { mutate: updateOrderTextBlock, isPending: isUpdatePending } =
    useUpdateOrderTextBlock();
  const { mutate: deleteOrderTextBlock, isPending: isDeletePending } =
    useDeleteOrderTextBlock();

  const handleChange = useCallback((newContent?: JSONContent | null) => {
    setContent(newContent);
  }, []);

  const handleSave = useCallback(async () => {
    if (!content) return;

    // First upsert the text block
    upsertTextBlock({
      id: blockId ? parseInt(blockId) : undefined,
      content: content,
      name: name,
    });

    // Then update the order text block relation
    if (blockId) {
      updateOrderTextBlock({
        orderId,
        textBlockId: parseInt(blockId),
        position,
      });
    }
  }, [
    content,
    name,
    blockId,
    orderId,
    position,
    upsertTextBlock,
    updateOrderTextBlock,
  ]);

  const handleDelete = useCallback(() => {
    if (!blockId) return;

    deleteOrderTextBlock({
      in_orderId: orderId,
      in_textBlockId: parseInt(blockId),
    });
  }, [blockId, orderId, deleteOrderTextBlock]);

  const isSaving = isUpsertPending || isUpdatePending;

  // Combine both states to determine when to show the buttons
  const showButtons = isFocused || isEditing;

  const closeEditor = useCallback(() => {
    setIsEditing(false);
    setIsFocused(false);
  }, []);

  return (
    <>
      <div className="relative">
        {showButtons && (
          <div className="-top-12 right-0 left-0 z-10 absolute flex items-center gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Block name"
              className="flex-1"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsSelectModalOpen(true)}
            >
              Select Existing
            </Button>
            {blockId && (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeletePending}
              >
                Delete
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                handleSave();
                closeEditor();
              }}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              size="icon"
              className="w-8 h-8"
              variant="ghost"
              onClick={closeEditor}
            >
              <X size={16} />
            </Button>
          </div>
        )}
        <Editor
          initialContent={initialContent}
          className={cn(
            "min-h-[100px]",
            !showButtons && "bg-secondary/20",
            className,
          )}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            setIsEditing(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder={placeholder}
          disablePlaceholder={disablePlaceholder}
          tabIndex={tabIndex}
        />
      </div>
    </>
  );
}
