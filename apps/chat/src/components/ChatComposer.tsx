import { useRef } from "react";
import { Button } from "@thetis/ui/button";
import { ArrowUp, ImagePlus, Loader2, X } from "lucide-react";
import { addImageFiles, handleImagePaste } from "@/components/ImageAttachments";
import { AutoResizeTextarea } from "@/components/AutoResizeTextarea";
import type { ImageAttachment } from "@/lib/images";

interface Props {
  value: string;
  onChange: (value: string) => void;
  images: ImageAttachment[];
  onImagesChange: (images: ImageAttachment[]) => void;
  onSubmit: () => void;
  placeholder: string;
  isPending: boolean;
  disabled?: boolean;
}

export function ChatComposer({
  value,
  onChange,
  images,
  onImagesChange,
  onSubmit,
  placeholder,
  isPending,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function removeImage(id: string) {
    onImagesChange(images.filter((img) => img.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !isPending && value.trim()) onSubmit();
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-3xl"
      onPaste={(e) => handleImagePaste(e, images, onImagesChange)}
    >
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-1">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative border border-border rounded-lg w-14 h-14 overflow-hidden"
            >
              <img
                src={img.previewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="top-0.5 right-0.5 absolute flex justify-center items-center bg-background/90 opacity-0 group-hover:opacity-100 rounded-full w-5 h-5 transition-opacity"
                onClick={() => removeImage(img.id)}
                aria-label="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative flex items-end gap-2 bg-muted/40 shadow-sm px-4 py-3 border border-border rounded-[1.75rem]">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mb-0.5 rounded-full w-8 h-8 shrink-0"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
          aria-label="Add image"
        >
          <ImagePlus className="w-4 h-4" />
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              void addImageFiles(e.target.files, images, onImagesChange);
            }
            e.target.value = "";
          }}
        />

        <AutoResizeTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isPending}
          maxRows={8}
          className="flex-1 py-1.5 text-sm leading-relaxed"
        />

        <Button
          type="button"
          size="icon"
          className="mb-0.5 rounded-full w-8 h-8 shrink-0"
          onClick={onSubmit}
          disabled={disabled || isPending || !value.trim()}
          aria-label={isPending ? "Working" : "Send"}
        >
          {isPending
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <ArrowUp className="w-4 h-4" />}
        </Button>
      </div>

      <p className="mt-2 text-muted-foreground text-xs text-center">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
