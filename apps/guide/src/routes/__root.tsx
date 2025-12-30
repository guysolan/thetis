import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "@thetis/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { Loader2, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <Loader2
      size={32}
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-blue-500",
        isLoading ? "block" : "hidden"
      )}
    />
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="font-serif text-xl font-semibold text-slate-900">
              Recovery Guide
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/essentials"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Essentials Course
            </Link>
            <a
              href="https://thetismedical.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Thetis Medical
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-4">
              <Link
                to="/essentials"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Essentials Course
              </Link>
              <a
                href="https://thetismedical.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Thetis Medical
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <span className="font-serif text-lg font-semibold text-slate-900">
              Thetis Medical
            </span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Thetis Medical. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  ),
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RouterSpinner />
      <Toaster />
    </div>
  );
}

