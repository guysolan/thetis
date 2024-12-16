import { type Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import React, { useState } from "react";
import {
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
  MdOutlineFormatStrikethrough,
} from "react-icons/md";
import type { Props as TippyOptions } from "tippy.js";
import { BubbleMenuItem } from "./bubble-item";
import { LinkItem } from "./link-item";

export function BubbleMenu({
  editor,
  tippyOptions,
}: {
  editor: Editor;
  tippyOptions?: TippyOptions;
}) {
  const [openLink, setOpenLink] = useState(false);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <TiptapBubbleMenu editor={editor} tippyOptions={tippyOptions}>
        <div className="flex bg-background border border-border rounded-full w-fit max-w-[90vw] font-regular text-mono overflow-hidden">
          <BubbleMenuItem
            editor={editor}
            action={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <MdOutlineFormatBold className="size-4" />
            <span className="sr-only">Bold</span>
          </BubbleMenuItem>

          <BubbleMenuItem
            editor={editor}
            action={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <MdOutlineFormatItalic className="size-4" />
            <span className="sr-only">Italic</span>
          </BubbleMenuItem>

          <BubbleMenuItem
            editor={editor}
            action={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <MdOutlineFormatStrikethrough className="size-4" />
            <span className="sr-only">Strike</span>
          </BubbleMenuItem>

          <LinkItem editor={editor} open={openLink} setOpen={setOpenLink} />
        </div>
      </TiptapBubbleMenu>
    </div>
  );
}
