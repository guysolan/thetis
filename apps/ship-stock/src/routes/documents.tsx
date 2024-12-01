import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";
import DocumentHeader from "../features/documents/components/DocumentHeader";

export const Route = createFileRoute("/documents")({
  component: () => (
    <div className="bg-white shadow-lg mx-auto p-8 max-w-4xl document">
      <DocumentHeader />
      <Outlet />
    </div>
  ),
});
