import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useMatchRoute,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "@thetis/ui/sonner";
import { Button } from "@thetis/ui/button";
import { Logo } from "@thetis/ui/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@thetis/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@thetis/ui/dropdown-menu";
import type { QueryClient } from "@tanstack/react-query";
import { ExternalLink, Loader2, LogOut, Menu, User } from "lucide-react";
import { cn } from "../lib/utils.js";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useEnrollment } from "@/hooks/use-enrollment";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <Loader2
      size={32}
      className={cn(
        "top-1/2 left-1/2 fixed text-primary -translate-x-1/2 -translate-y-1/2 animate-spin",
        isLoading ? "block" : "hidden",
      )}
    />
  );
}

function DesktopNav() {
  return (
    <nav className="flex items-center gap-1">
      <a
        href="https://thetismedical.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 hover:bg-muted px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        Thetis Medical
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </nav>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Menu className="mr-2 w-4 h-4" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 w-[85vw]">
        <SheetHeader className="flex flex-row justify-between items-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-primary p-1.5 rounded-xl w-9 h-9">
              <Logo className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-lg">
              Recovery Guide
            </span>
          </Link>
        </SheetHeader>

        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <a
              href="https://thetismedical.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 bg-muted p-3 rounded-lg font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Visit Thetis Medical
              <ExternalLink className="w-4 h-4" />
            </a>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Header() {
  const { email, loading: authLoading, signOut } = useSimpleAuth();
  const { enrollments } = useEnrollment();

  return (
    <header className="top-0 z-50 sticky bg-background/80 backdrop-blur-lg border-border border-b w-full">
      <div className="mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-primary shadow-sm p-1.5 rounded-xl w-9 h-9">
              <Logo className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-xl">
              Recovery Guide
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <DesktopNav />
            </nav>

            {/* Auth Status */}
            {!authLoading && (
              <div className="flex items-center gap-2">
                {email
                  ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <User className="w-4 h-4" />
                          <span className="hidden sm:inline">{email}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                          <div className="flex flex-col space-y-1">
                            <p className="font-medium text-sm">{email}</p>
                            {enrollments.length > 0 && (
                              <p className="text-muted-foreground text-xs">
                                {enrollments.length}{" "}
                                course{enrollments.length > 1 ? "s" : ""}{" "}
                                enrolled
                              </p>
                            )}
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {enrollments.length > 0 && (
                          <>
                            <DropdownMenuLabel className="text-muted-foreground text-xs">
                              Your Courses
                            </DropdownMenuLabel>
                            {enrollments.map((e) => (
                              <DropdownMenuItem key={e.id} disabled>
                                {e.course_type === "standard"
                                  ? "Standard"
                                  : e.course_type === "essentials"
                                  ? "Essentials"
                                  : "Professionals"}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            signOut();
                            window.location.href = "/";
                          }}
                          className="text-destructive"
                        >
                          <LogOut className="mr-2 w-4 h-4" />
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                  : (
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/claim" search={{ email: "", order: "" }}>
                        Sign In
                      </Link>
                    </Button>
                  )}
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-muted/30 mt-auto border-border border-t">
      <div className="mx-auto px-4 sm:px-6 py-8 max-w-5xl">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-primary p-1.5 rounded-lg w-8 h-8">
              <Logo className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-lg">
              Thetis Medical
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 justify-center items-center">
        <div className="text-center">
          <h1 className="mb-4 font-semibold text-foreground text-4xl">
            Page Not Found
          </h1>
          <p className="mb-6 text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  ),
});

function RootComponent() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <RouterSpinner />
      <Toaster />
    </>
  );
}
