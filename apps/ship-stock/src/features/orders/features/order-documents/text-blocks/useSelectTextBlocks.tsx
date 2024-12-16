import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/database.types";

type TextBlock = Database["public"]["Tables"]["text_blocks"]["Row"];

export function useSelectTextBlocks() {
  return useQuery({
    queryKey: ["text-blocks"],
    queryFn: async (): Promise<TextBlock[]> => {
      const { data, error } = await supabase
        .from("text_blocks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
