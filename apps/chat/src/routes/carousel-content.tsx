import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/ChatPage";
import { CAROUSEL_CONTENT_ASSISTANT } from "@/constants/assistants";

export const Route = createFileRoute("/carousel-content")({
  component: CarouselContentPage,
});

function CarouselContentPage() {
  return <ChatPage preset={CAROUSEL_CONTENT_ASSISTANT} />;
}
