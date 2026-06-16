import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, RotateCcw } from "lucide-react";
import {
  type AssistResult,
  type ChatTurn,
  type Platform,
  type ProgressUpdate,
  type RetrievedSource,
  sendMessage,
  type WebSource,
} from "@/api/knowledge";
import { listSavedSettings } from "@/api/instructions";
import { AssistantSettings } from "@/components/AssistantSettings";
import { ChatComposer } from "@/components/ChatComposer";
import { AssistantMessage, UserMessage } from "@/components/ChatMessage";
import { ChatProgress } from "@/components/ChatProgress";
import { ChatResult } from "@/components/ChatResult";
import type { AssistantPreset } from "@/constants/assistants";
import { type PostType } from "@/constants/post-types";
import { attachmentsForApi, type ImageAttachment } from "@/lib/images";
import { postText } from "@/lib/post-text";
import { cn } from "@/lib/utils";
import { Button } from "@thetis/ui/button";

type UserTurn = {
  id: string;
  role: "user";
  text: string;
  images: ImageAttachment[];
};

type AssistantTurn = {
  id: string;
  role: "assistant";
  result: AssistResult;
  sources?: RetrievedSource[];
  webSources?: WebSource[];
};

type ThreadTurn = UserTurn | AssistantTurn;

function buildHistory(turns: ThreadTurn[]): ChatTurn[] {
  return turns
    .map((turn) => {
      if (turn.role === "user") {
        return { role: "user" as const, content: turn.text };
      }
      const content = postText(turn.result.post) ?? turn.result.notes ?? "";
      return { role: "assistant" as const, content };
    })
    .filter((t) => t.content.trim());
}

type Props = {
  preset?: AssistantPreset;
  title?: string;
};

export function ChatPage({ preset, title = "Social assistant" }: Props) {
  const [prompt, setPrompt] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(
    preset?.platforms ?? ["linkedin"],
  );
  const [postType, setPostType] = useState<PostType>(
    preset?.postType ?? "clinical_tip",
  );
  const [instructions, setInstructions] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [images, setImages] = useState<ImageAttachment[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [thread, setThread] = useState<ThreadTurn[]>([]);
  const [progress, setProgress] = useState<ProgressUpdate[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const presetApplied = useRef<string | null>(null);

  const { data: savedSettings = [] } = useQuery({
    queryKey: ["saved-settings"],
    queryFn: listSavedSettings,
  });

  useEffect(() => {
    if (!preset) return;
    const key = preset.slug;
    if (presetApplied.current === key) return;

    setPlatforms(preset.platforms);
    setPostType(preset.postType);
    setInstructions("");
    presetApplied.current = key;

    const match = savedSettings.find((s) => s.name === preset.settingName);
    if (match) {
      setSelectedId(match.id);
      setInstructions("");
    } else {
      setSelectedId(null);
      setInstructions("");
    }
  }, [preset, savedSettings]);

  const mutation = useMutation({
    mutationFn: (input: {
      text: string;
      images: ImageAttachment[];
      history: ChatTurn[];
    }) => {
      setProgress([]);
      return sendMessage(input.text, {
        platforms,
        post_type: postType,
        custom_instructions: instructions.trim() || undefined,
        instruction_set_id: instructions.trim()
          ? undefined
          : selectedId ?? undefined,
        images: attachmentsForApi(input.images),
        history: input.history,
        onProgress: (update) => {
          setProgress((prev) => {
            const idx = prev.findIndex((p) => p.step === update.step);
            if (idx >= 0) {
              const next = [...prev];
              next[idx] = update;
              return next;
            }
            return [...prev, update];
          });
        },
      });
    },
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread, mutation.isPending, progress]);

  function handleSubmit() {
    if (!prompt.trim() || mutation.isPending) return;

    const text = prompt;
    const imgs = [...images];
    const history = buildHistory(thread);

    const userTurn: UserTurn = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      images: imgs,
    };
    setThread((prev) => [...prev, userTurn]);
    setPrompt("");
    setImages([]);

    mutation.mutate(
      { text, images: imgs, history },
      {
        onSuccess: (data) => {
          setThread((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              result: data.result,
              sources: data.retrieved_sources,
              webSources: data.web_sources,
            },
          ]);
        },
      },
    );
  }

  function newChat() {
    setThread([]);
    setProgress([]);
    mutation.reset();
  }

  const isEmpty = thread.length === 0 && !mutation.isPending;
  const pageTitle = preset?.title ?? title;
  const subtitle = preset?.subtitle;

  return (
    <div className="flex flex-col mx-auto w-full max-w-3xl h-full min-h-0">
      <div className="space-y-3 pb-3 shrink-0">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="font-semibold text-base">{pageTitle}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-xs">{subtitle}</p>
            )}
          </div>
          {thread.length > 0 && (
            <Button variant="ghost" size="sm" onClick={newChat}>
              <RotateCcw className="mr-1 w-3.5 h-3.5" />
              New chat
            </Button>
          )}
        </div>

        <details
          open={settingsOpen}
          onToggle={(e) => setSettingsOpen(e.currentTarget.open)}
          className="border border-border rounded-xl"
        >
          <summary className="[&::-webkit-details-marker]:hidden flex items-center gap-2 hover:bg-muted/40 px-3 py-2.5 text-sm cursor-pointer list-none">
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                settingsOpen && "rotate-180",
              )}
            />
            <span className="font-medium">Settings</span>
            <span className="text-muted-foreground text-xs">
              {postType.replace(/_/g, " ")} · {platforms.join(", ")}
            </span>
          </summary>
          <div className="px-3 pb-3 border-border border-t">
            <AssistantSettings
              postType={postType}
              onPostTypeChange={setPostType}
              platforms={platforms}
              onPlatformsChange={setPlatforms}
              instructions={instructions}
              onInstructionsChange={setInstructions}
              selectedId={selectedId}
              onSelectedIdChange={setSelectedId}
            />
          </div>
        </details>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="space-y-6 mx-auto py-2 max-w-3xl">
          {isEmpty && (
            <p className="px-2 text-muted-foreground text-sm text-center">
              {preset?.emptyHint ??
                "Ask for a post, paste a draft, or follow up to refine."}
            </p>
          )}

          {thread.map((turn) =>
            turn.role === "user"
              ? (
                <UserMessage
                  key={turn.id}
                  text={turn.text}
                  images={turn.images}
                />
              )
              : (
                <AssistantMessage key={turn.id}>
                  <ChatResult
                    result={turn.result}
                    sources={turn.sources}
                    webSources={turn.webSources}
                  />
                </AssistantMessage>
              )
          )}

          {mutation.isPending && (
            <AssistantMessage>
              <ChatProgress updates={progress} />
            </AssistantMessage>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      <div className="bg-background pt-3 pb-1 shrink-0">
        <ChatComposer
          value={prompt}
          onChange={setPrompt}
          images={images}
          onImagesChange={setImages}
          onSubmit={handleSubmit}
          placeholder={preset?.placeholder ?? "Message…"}
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
}
