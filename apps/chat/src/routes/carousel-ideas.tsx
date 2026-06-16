import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/ChatPage";
import { CAROUSEL_IDEAS_ASSISTANT } from "@/constants/assistants";

export const Route = createFileRoute("/carousel-ideas")({
  component: CarouselIdeasPage,
});

function CarouselIdeasPage() {
  return <ChatPage preset={CAROUSEL_IDEAS_ASSISTANT} />;
}
