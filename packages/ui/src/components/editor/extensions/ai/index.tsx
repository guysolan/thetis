"use client";

import React from "react";
import type { Editor } from "@tiptap/react";
import { useClickAway } from "@uidotdev/usehooks";
import { readStreamableValue } from "ai/rsc";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  MdOutlineAutoAwesome,
  MdOutlineCloseFullscreen,
  MdOutlineSpellcheck,
  MdOutlineWrapText,
} from "react-icons/md";
import { BubbleMenuButton } from "../bubble-menu/bubble-menu-button";
import { generateEditorContent } from "./example-action";

const selectors = [
  {
    name: "Grammar",
    icon: MdOutlineSpellcheck,
    instructions:
      "Fix grammar: Rectify any grammatical errors while preserving the original meaning.",
  },
  {
    name: "Improve",
    icon: MdOutlineWrapText,
    instructions:
      "Improve text: Refine the text to improve clarity and professionalism.",
  },
  {
    name: "Condense",
    icon: MdOutlineCloseFullscreen,
    instructions:
      "Condense text: Remove any unnecessary text and only keep the invoice-related content and make it more concise.",
  },
];

interface AIMenuProps {
  editor: Editor;
  onOpenChange: (open: boolean) => void;
}

function formatEditorContent(content: string): string {
  return content.replace(/\n/g, "<br />");
}

export function AIMenu({ onOpenChange, editor }: AIMenuProps) {
  const [isTypingPrompt, setIsTypingPrompt] = useState(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    onOpenChange(false);
    setIsTypingPrompt(false);
  });

  const handleGenerate = async (instructions: string) => {
    const selectedText = editor?.state.doc.textBetween(
      editor?.state.selection?.from,
      editor?.state.selection?.to,
      "",
    );

    if (!selectedText) {
      return;
    }

    try {
      const { output } = await generateEditorContent({
        input: selectedText,
        context: instructions,
      });

      let generatedContent = "";
      for await (const delta of readStreamableValue(output)) {
        generatedContent += delta;
        editor?.commands.insertContent(formatEditorContent(delta ?? ""));
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <div ref={ref} className="flex divide-x whitespace-nowrap">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isTypingPrompt ? (
          <div className="relative">
            <input
              autoFocus
              placeholder="Type your prompt…"
              onBlur={() => setIsTypingPrompt(false)}
              className="bg-background px-4 border-none w-[280px] h-8 text-[11px] focus:outline-none"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onOpenChange(false);
                  handleGenerate(`Custom prompt: ${e.currentTarget.value}`);
                }
              }}
            />
            <kbd className="top-1/2 right-2 absolute items-center gap-1 px-1.5 h-5 font-medium font-mono text-[13px] -translate-y-1/2 pointer-events-none select-none">
              <span>↵</span>
            </kbd>
          </div>
        ) : (
          <BubbleMenuButton
            action={() => setIsTypingPrompt(true)}
            isActive={false}
          >
            <div className="flex items-center space-x-1">
              <MdOutlineAutoAwesome className="size-3" />
              <span className="font-mono text-[11px]">Ask AI</span>
            </div>
          </BubbleMenuButton>
        )}
      </motion.div>

      {!isTypingPrompt &&
        selectors.map((selector, index) => (
          <motion.div
            key={selector.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: (index + 1) * 0.05 }}
          >
            <BubbleMenuButton
              action={() => handleGenerate(selector.instructions)}
              isActive={false}
            >
              <div className="flex items-center space-x-1">
                <selector.icon className="size-3" />
                <span>{selector.name}</span>
              </div>
            </BubbleMenuButton>
          </motion.div>
        ))}
    </div>
  );
}
