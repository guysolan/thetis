import { cn } from "@thetis/ui/cn";
import type { ImageAttachment } from "@/lib/images";

interface UserMessageProps {
  text: string;
  images?: ImageAttachment[];
}

export function UserMessage({ text, images = [] }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-muted px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%]">
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.previewUrl}
                alt=""
                className="border border-border rounded-md w-20 h-20 object-cover"
              />
            ))}
          </div>
        )}
        <p className="whitespace-pre-wrap text-sm">{text}</p>
      </div>
    </div>
  );
}

export function AssistantMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex justify-start">
      <div
        className={cn(
          "bg-background px-4 py-3 border border-border rounded-2xl rounded-tl-sm max-w-[95%] w-full",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
