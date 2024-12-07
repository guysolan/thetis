import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@thetis/ui/hover-card";
import { Document, Page } from "react-pdf";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { File } from "lucide-react";
import { Skeleton } from "@thetis/ui/skeleton";

interface FilePreviewProps {
  fileName: string;
  className?: string;
  thumbnailSize?: number;
  previewSize?: number;
}

export function FilePreview({
  fileName,
  className,
  thumbnailSize = 40,
  previewSize = 400,
}: FilePreviewProps) {
  const [isHovering, setIsHovering] = React.useState(false);

  const { data: signedUrl } = useQuery({
    queryKey: ["signedUrl", fileName],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("amazon-reports")
        .createSignedUrl(fileName, 60);

      if (error) {
        throw new Error(`Failed to get signed URL: ${error.message}`);
      }

      return data.signedUrl;
    },
    enabled: isHovering,
  });

  return (
    <HoverCard onOpenChange={setIsHovering}>
      <HoverCardTrigger className="flex items-center gap-2">
        <File size={16} /> {fileName}
      </HoverCardTrigger>

      <HoverCardContent className="p-2 w-fit">
        {!signedUrl ? (
          <Skeleton className="w-[400px] h-[400px]" />
        ) : (
          <Document
            file={signedUrl}
            loading={<Skeleton className="w-[400px] h-[400px]" />}
            className="w-fit"
          >
            <Page
              pageNumber={1}
              width={previewSize}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
