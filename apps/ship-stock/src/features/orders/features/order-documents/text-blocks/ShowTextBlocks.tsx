"use client";

import { EditTextBlock } from "./EditTextBlock";

type TextBlock = {
  id: number;
  content: string;
  name: string;
};

type Props = {
  orderId: number;
  textBlocks: TextBlock[];
};

export function ShowTextBlocks({ orderId, textBlocks }: Props) {
  return (
    <div className="space-y-8">
      {textBlocks?.map((block, index) => (
        <EditTextBlock
          key={block.id}
          orderId={orderId}
          blockId={block.id.toString()}
          position={index}
          initialContent={block.content}
          initialName={block.name}
        />
      ))}

      {/* Add new block button at the end */}
      <EditTextBlock
        orderId={orderId}
        position={textBlocks.length}
        placeholder="Add new text block..."
      />
    </div>
  );
}
