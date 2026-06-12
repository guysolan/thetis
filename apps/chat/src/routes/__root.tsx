import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { Toaster } from "@thetis/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { Button } from "@thetis/ui/button";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { supabase } from "@/lib/supabase";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="mb-4">Page not found</p>
      <Button asChild variant="outline">
        <Link to="/">Back to start</Link>
      </Button>
    </div>
  ),
});

function RootComponent() {
  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user && window.location.pathname !== "/login") {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {user && (
        <header className="bg-background/80 backdrop-blur border-border border-b">
          <nav className="flex items-center gap-1 mx-auto px-4 py-2 max-w-5xl">
            <span className="mr-4 font-semibold text-foreground text-sm">
              Thetis Assistants
            </span>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              <LogOut className="mr-1 w-4 h-4" />
              Sign out
            </Button>
          </nav>
        </header>
      )}
      <main className="flex-1 mx-auto px-4 py-6 w-full max-w-5xl">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
