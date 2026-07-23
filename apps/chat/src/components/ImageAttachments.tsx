import { useRef } from "react";
import { Button } from "@thetis/ui/button";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { filesToAttachments, type ImageAttachment } from "@/lib/images";

interface Props {
  images: ImageAttachment[];
  onChange: (images: ImageAttachment[]) => void;
}

export async function addImageFiles(
  files: FileList | File[],
  images: ImageAttachment[],
  onChange: (images: ImageAttachment[]) => void,
) {
  try {
    onChange(await filesToAttachments(files, images));
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to add image");
  }
}

export function handleImagePaste(
  e: React.ClipboardEvent,
  images: ImageAttachment[],
  onChange: (images: ImageAttachment[]) => void,
) {
  const pasted = Array.from(e.clipboardData.files).filter((f) =>
    f.type.startsWith("image/")
  );
  if (!pasted.length) return;
  e.preventDefault();
  void addImageFiles(pasted, images, onChange);
}

export function ImageAttachments({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function remove(id: string) {
    onChange(images.filter((img) => img.id !== id));
  }

  return (
    <div
      className="space-y-2"
      onPaste={(e) => handleImagePaste(e, images, onChange)}
    >
      <div className="flex flex-wrap items-center gap-2">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative border border-border rounded-md w-20 h-20 overflow-hidden"
          >
            <img
              src={img.previewUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="top-1 right-1 absolute flex justify-center items-center bg-background/90 opacity-0 group-hover:opacity-100 rounded-full w-5 h-5 transition-opacity"
              onClick={() => remove(img.id)}
              aria-label="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus className="mr-1 w-4 h-4" />
          Upload
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              void addImageFiles(e.target.files, images, onChange);
            }
            e.target.value = "";
          }}
        />
      </div>
      <p className="text-muted-foreground text-xs">
        Paste images here (Ctrl+V) or upload. Up to 6 images — sent to the AI as
        visual context, not generated.
      </p>
    </div>
  );
}
