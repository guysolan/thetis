import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@thetis/ui/button";
import { Input } from "@thetis/ui/input";
import { Label } from "@thetis/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@thetis/ui/select";
import { Textarea } from "@thetis/ui/textarea";
import { Loader2, Save, Trash2 } from "lucide-react";
import type { Platform } from "@/api/knowledge";
import {
  deleteSetting,
  listSavedSettings,
  type SavedSetting,
  saveSetting,
} from "@/api/instructions";
import { formatPlatforms, PLATFORM_AUDIENCE_NOTE } from "@/constants/platforms";
import { POST_TYPES, type PostType } from "@/constants/post-types";
import { PlatformMultiSelect } from "@/components/PlatformMultiSelect";

interface Props {
  postType: PostType;
  onPostTypeChange: (postType: PostType) => void;
  platforms: Platform[];
  onPlatformsChange: (platforms: Platform[]) => void;
  instructions: string;
  onInstructionsChange: (instructions: string) => void;
  selectedId: string | null;
  onSelectedIdChange: (id: string | null) => void;
}

function postTypeLabel(value: PostType): string {
  return POST_TYPES.find((p) => p.value === value)?.label ?? value;
}

export function AssistantSettings({
  postType,
  onPostTypeChange,
  platforms,
  onPlatformsChange,
  instructions,
  onInstructionsChange,
  selectedId,
  onSelectedIdChange,
}: Props) {
  const queryClient = useQueryClient();
  const [saveName, setSaveName] = useState("");
  const [showSave, setShowSave] = useState(false);

  const { data: saved = [], isLoading } = useQuery({
    queryKey: ["saved-settings"],
    queryFn: listSavedSettings,
  });

  const selected = saved.find((s) => s.id === selectedId) ?? null;

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!platforms.length) throw new Error("Select at least one platform");
      return saveSetting({
        name: saveName.trim(),
        platforms,
        post_type: postType,
        instructions,
      });
    },
    onSuccess: (savedSetting) => {
      queryClient.invalidateQueries({ queryKey: ["saved-settings"] });
      onSelectedIdChange(savedSetting.id);
      setShowSave(false);
      setSaveName("");
      toast.success("Settings saved");
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: () => {
      if (!selected) throw new Error("No saved settings selected");
      if (!platforms.length) throw new Error("Select at least one platform");
      return saveSetting({
        id: selected.id,
        name: selected.name,
        platforms,
        post_type: postType,
        instructions,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-settings"] });
      toast.success("Settings updated");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!selected) throw new Error("No saved settings selected");
      return deleteSetting(selected.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-settings"] });
      onSelectedIdChange(null);
      toast.success("Settings deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  function loadSetting(setting: SavedSetting) {
    onSelectedIdChange(setting.id);
    onPostTypeChange(setting.post_type);
    onPlatformsChange(setting.platforms);
    onInstructionsChange(setting.instructions);
  }

  function handleSelect(id: string) {
    const setting = saved.find((s) => s.id === id);
    if (setting) loadSetting(setting);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Saved settings</Label>
        <Select
          value={selectedId ?? ""}
          onValueChange={handleSelect}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={isLoading
                ? "Loading..."
                : "Choose saved settings..."}
            />
          </SelectTrigger>
          <SelectContent>
            {saved.map((setting) => (
              <SelectItem key={setting.id} value={setting.id}>
                {setting.name} — {postTypeLabel(setting.post_type)} ·{" "}
                {formatPlatforms(setting.platforms)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!isLoading && saved.length === 0 && (
          <p className="text-muted-foreground text-xs">
            No saved settings yet. Configure below and save.
          </p>
        )}
      </div>

      <div className="gap-4 grid sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Post type</Label>
          <Select
            value={postType}
            onValueChange={(v) => onPostTypeChange(v as PostType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POST_TYPES.map((pt) => (
                <SelectItem key={pt.value} value={pt.value}>
                  {pt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Platforms</Label>
          <p className="text-muted-foreground text-xs">
            {PLATFORM_AUDIENCE_NOTE}
          </p>
          <PlatformMultiSelect
            values={platforms}
            onChange={onPlatformsChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          id="instructions"
          className="min-h-32 font-mono text-sm"
          placeholder="Instructions for this template — tone, structure, audience, things to mention or avoid..."
          value={instructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {selected && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={updateMutation.isPending}
            onClick={() => updateMutation.mutate()}
          >
            {updateMutation.isPending
              ? <Loader2 className="mr-1 w-3.5 h-3.5 animate-spin" />
              : <Save className="mr-1 w-3.5 h-3.5" />}
            Update “{selected.name}”
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setSaveName(selected?.name ?? "");
            setShowSave(true);
          }}
        >
          <Save className="mr-1 w-3.5 h-3.5" />
          Save as new
        </Button>
        {selected && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate()}
          >
            <Trash2 className="mr-1 w-3.5 h-3.5" />
            Delete
          </Button>
        )}
      </div>

      {showSave && (
        <div className="flex flex-wrap items-end gap-2 p-3 border border-border rounded-md">
          <div className="flex-1 space-y-1 min-w-48">
            <Label htmlFor="settings-name">Name</Label>
            <Input
              id="settings-name"
              placeholder="e.g. LinkedIn clinical tip — surgeon audience"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            disabled={!saveName.trim() || saveMutation.isPending}
            onClick={() => saveMutation.mutate()}
          >
            {saveMutation.isPending
              ? <Loader2 className="mr-1 w-3.5 h-3.5 animate-spin" />
              : null}
            Save
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSave(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
