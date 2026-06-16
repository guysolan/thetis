import { cn } from "@thetis/ui/cn";
import type { ImageAttachment } from "@/lib/images";

interface UserMessageProps {
  text: string;
  images?: ImageAttachment[];
}

export function UserMessage({ text, images = [] }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-muted/80 px-4 py-3 rounded-[1.25rem] rounded-tr-md max-w-[85%]">
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
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
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
    <div className="flex justify-start w-full">
      <div className={cn("py-1 w-full max-w-full text-foreground", className)}>
        {children}
      </div>
    </div>
  );
}
