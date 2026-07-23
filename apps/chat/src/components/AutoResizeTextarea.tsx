import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
}

export function AutoResizeTextarea({
  maxRows = 10,
  className,
  value,
  onChange,
  ...props
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "0px";
    const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight) || 24;
    const maxHeight = lineHeight * maxRows;
    const next = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, maxRows]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={onChange}
      className={cn(
        "bg-transparent outline-none w-full placeholder:text-muted-foreground resize-none",
        className,
      )}
      {...props}
    />
  );
}
