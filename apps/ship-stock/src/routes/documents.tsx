import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/documents")({
  component: () => (
    <div className="bg-white mx-auto p-8 max-w-4xl document">
      <Outlet />
    </div>
  ),
});
