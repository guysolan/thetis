import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/ChatPage";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <ChatPage />;
}
