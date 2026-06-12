import { useRef } from "react";
import { Button } from "@thetis/ui/button";
import { Textarea } from "@thetis/ui/textarea";
import { ImagePlus, Loader2, X } from "lucide-react";
import {
  addImageFiles,
  handleImagePaste,
} from "@/components/ImageAttachments";
import type { ImageAttachment } from "@/lib/images";

interface Props {
  value: string;
  onChange: (value: string) => void;
  images: ImageAttachment[];
  onImagesChange: (images: ImageAttachment[]) => void;
  onSubmit: () => void;
  placeholder: string;
  submitLabel: string;
  submitIcon: React.ReactNode;
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
  submitLabel,
  submitIcon,
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
      className="bg-background border border-border rounded-lg overflow-hidden"
      onPaste={(e) => handleImagePaste(e, images, onImagesChange)}
    >
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 border-border border-b">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative border border-border rounded-md w-16 h-16 overflow-hidden"
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

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="border-0 focus-visible:ring-0 shadow-none min-h-28 resize-none"
        disabled={isPending}
      />

      <div className="flex justify-between items-center gap-2 px-3 py-2 border-border border-t">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isPending}
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus className="mr-1 w-4 h-4" />
            Add image
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
          <span className="hidden sm:inline text-muted-foreground text-xs">
            Paste images or attach for visual context
          </span>
        </div>
        <Button
          onClick={onSubmit}
          disabled={disabled || isPending || !value.trim()}
          size="sm"
        >
          {isPending
            ? <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            : submitIcon}
          {isPending ? "Working..." : submitLabel}
        </Button>
      </div>
    </div>
  );
}
