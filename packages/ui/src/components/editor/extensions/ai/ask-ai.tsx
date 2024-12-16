"use client";

import { MdOutlineAutoAwesome } from "react-icons/md";
import { BubbleMenuButton } from "../bubble-menu/bubble-menu-button";

type Props = {
  onSelect: () => void;
};

export function AskAI({ onSelect }: Props) {
  return (
    <BubbleMenuButton
      action={onSelect}
      isActive={false}
      className="flex items-center space-x-2"
    >
      <MdOutlineAutoAwesome className="size-4" />
    </BubbleMenuButton>
  );
}
