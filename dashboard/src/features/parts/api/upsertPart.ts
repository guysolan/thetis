import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { PartFormT } from "../components/PartForm";
import { toast } from "sonner";

const upsertPart = async (part: PartFormT) => {
  const { data, error } = await supabase
    .from("parts")
    .upsert(part)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const useUpsertPart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (part: PartFormT) => upsertPart(part),
    onError: (error) => {
      toast.error("Error creating part");
    },
    onSuccess: () => {
      toast.success("Part created successfully");
      queryClient.invalidateQueries({ queryKey: ["select-parts"] });
    },
  });
};
