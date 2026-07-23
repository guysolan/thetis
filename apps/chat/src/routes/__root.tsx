import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "@thetis/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { Button } from "@thetis/ui/button";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/carousel-ideas" as const, label: "Carousel ideas" },
  { to: "/carousel-content" as const, label: "Carousel content" },
  { to: "/" as const, label: "Social" },
];

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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isLoading && !user && window.location.pathname !== "/login") {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  return (
    <div className="flex flex-col h-svh overflow-hidden">
      {user && (
        <header className="z-10 bg-background/80 backdrop-blur border-border border-b shrink-0">
          <nav className="flex items-center gap-1 mx-auto px-4 py-2 max-w-3xl">
            <span className="mr-2 font-semibold text-foreground text-sm shrink-0">
              Thetis
            </span>
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "px-2.5 py-1 rounded-md text-sm transition-colors",
                  pathname === to
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </Link>
            ))}
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
      <main className="flex flex-col flex-1 mx-auto px-4 py-3 w-full max-w-3xl min-h-0 overflow-hidden">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
