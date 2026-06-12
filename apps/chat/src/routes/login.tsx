import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import Authentication from "@/features/auth/Authentication";
import { useAuth } from "@/features/auth/useAuth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  return <Authentication />;
}
