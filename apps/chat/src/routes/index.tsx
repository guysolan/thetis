import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import { Send, Settings2 } from "lucide-react";
import { type Platform, sendMessage } from "@/api/knowledge";
import { AssistantSettings } from "@/components/AssistantSettings";
import { ChatComposer } from "@/components/ChatComposer";
import { AssistantMessage, UserMessage } from "@/components/ChatMessage";
import { ChatResult } from "@/components/ChatResult";
import { type PostType } from "@/constants/post-types";
import { attachmentsForApi, type ImageAttachment } from "@/lib/images";

export const Route = createFileRoute("/")({
  component: ChatPage,
});

function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["linkedin"]);
  const [postType, setPostType] = useState<PostType>("clinical_tip");
  const [instructions, setInstructions] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [images, setImages] = useState<ImageAttachment[]>([]);
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null);
  const [submittedImages, setSubmittedImages] = useState<ImageAttachment[]>([]);

  const mutation = useMutation({
    mutationFn: (input: { text: string; images: ImageAttachment[] }) =>
      sendMessage(input.text, {
        platforms,
        post_type: postType,
        custom_instructions: instructions.trim() || undefined,
        instruction_set_id: instructions.trim()
          ? undefined
          : selectedId ?? undefined,
        images: attachmentsForApi(input.images),
      }),
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit() {
    if (!prompt.trim() || mutation.isPending) return;
    setSubmittedPrompt(prompt);
    setSubmittedImages(images);
    const text = prompt;
    const imgs = [...images];
    setPrompt("");
    setImages([]);
    mutation.mutate({ text, images: imgs });
  }

  const result = mutation.isPending ? undefined : mutation.data?.result;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-xl">Social assistant</h1>
        <p className="text-muted-foreground text-sm">
          Pick or configure settings, then chat — check a draft, write a post,
          or refine copy. The assistant infers what you need from your prompt.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Settings2 className="w-4 h-4" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {(submittedPrompt || mutation.isPending) && (
        <div className="space-y-4">
          {submittedPrompt && (
            <UserMessage text={submittedPrompt} images={submittedImages} />
          )}
          {mutation.isPending && (
            <AssistantMessage>
              <p className="text-muted-foreground text-sm animate-pulse">
                Thinking...
              </p>
            </AssistantMessage>
          )}
        </div>
      )}

      {result && (
        <AssistantMessage>
          <ChatResult
            result={result}
            sources={mutation.data?.retrieved_sources}
          />
        </AssistantMessage>
      )}

      <div className="space-y-2">
        <p className="font-medium text-sm">Chat</p>
        <ChatComposer
          value={prompt}
          onChange={setPrompt}
          images={images}
          onImagesChange={setImages}
          onSubmit={handleSubmit}
          placeholder='e.g. "Check this draft: ..." or "Write a LinkedIn post about wedge removal timing"'
          submitLabel="Send"
          submitIcon={<Send className="mr-2 w-4 h-4" />}
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
}
