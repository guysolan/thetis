import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@thetis/ui/hover-card";
import { File } from "lucide-react";
import { Skeleton } from "@thetis/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Badge } from "@thetis/ui/badge";

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
        <Badge className="gap-1 hover:bg-opacity-70 px-2 py-1 transition-colors cursor-pointer">
          <File size={16} /> Preview PDF
        </Badge>
      </HoverCardTrigger>

      <HoverCardContent className="p-2 w-fit">
        {!signedUrl ? (
          <Skeleton className="w-[400px] h-[400px]" />
        ) : (
          <iframe
            title={fileName}
            src={signedUrl}
            width={previewSize}
            height={previewSize}
            className="border-0"
          />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
