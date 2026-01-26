import { createRootRouteWithContext, createFileRoute } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import AuthOutlet from "../features/auth/AuthOutlet";
import Navigation from "../features/navigation/Navigation";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>("/home")({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="w-full min-h-screen font-raleway text-left text-zinc-800">
      <Navigation />
      <AuthOutlet />
    </main>
  );
}
