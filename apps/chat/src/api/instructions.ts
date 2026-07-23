import { supabase } from "@/lib/supabase";
import type { Platform } from "@/api/knowledge";
import type { PostType } from "@/constants/post-types";

export type InstructionMode = "generate" | "check" | "both";

export interface SavedSetting {
  id: string;
  name: string;
  platforms: Platform[];
  post_type: PostType;
  mode: InstructionMode;
  instructions: string;
  is_default: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export async function listSavedSettings(): Promise<SavedSetting[]> {
  const { data, error } = await supabase
    .from("assistant_instruction_sets")
    .select("*")
    .in("mode", ["both"])
    .order("name");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    ...row,
    platforms: (row.platforms ?? []) as Platform[],
  })) as SavedSetting[];
}

export async function saveSetting(input: {
  id?: string;
  name: string;
  platforms: Platform[];
  post_type: PostType;
  instructions: string;
  is_default?: boolean;
}): Promise<SavedSetting> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  const row = {
    name: input.name.trim(),
    platforms: input.platforms,
    post_type: input.post_type,
    mode: "both" as const,
    instructions: input.instructions,
    is_default: input.is_default ?? false,
    created_by: user.id,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { data, error } = await supabase
      .from("assistant_instruction_sets")
      .update(row)
      .eq("id", input.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { ...data, platforms: data.platforms as Platform[] } as SavedSetting;
  }

  const { data, error } = await supabase
    .from("assistant_instruction_sets")
    .insert(row)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { ...data, platforms: data.platforms as Platform[] } as SavedSetting;
}

export async function deleteSetting(id: string): Promise<void> {
  const { error } = await supabase
    .from("assistant_instruction_sets")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}
