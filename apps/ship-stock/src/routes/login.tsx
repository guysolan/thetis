import { createFileRoute } from "@tanstack/react-router";
import Authentication from "../features/auth/Authentication";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Authentication />;
}
