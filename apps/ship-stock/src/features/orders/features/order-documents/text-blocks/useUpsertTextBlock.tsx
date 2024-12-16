import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/database.types";
import { toast } from "sonner";
type TextBlock = Database["public"]["Tables"]["text_blocks"]["Row"];
type TextBlockInsert = Database["public"]["Tables"]["text_blocks"]["Insert"];

export function useUpsertTextBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (textBlock: TextBlockInsert) => {
      const { data, error } = await supabase.from("text_blocks").upsert(
        {
          ...textBlock,
          name: textBlock.name || "Untitled Block", // Provide default name
        },
        {
          onConflict: "id",
          returning: "minimal",
        },
      );

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Text Block Saved");
      queryClient.invalidateQueries({
        queryKey: ["text-blocks"],
      });
    },
  });
}
