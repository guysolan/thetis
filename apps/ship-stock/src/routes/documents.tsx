import { createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";
import { Button } from "@thetis/ui/button";

export const Route = createFileRoute("/documents")({
  component: () => (
    <div className="bg-white shadow-lg mx-auto p-8 max-w-4xl document">
      <Button
        onClick={() => window.print()}
        className="top-4 right-4 fixed print:hidden"
      >
        Print
      </Button>
      <style>
        {`
          @page {
            margin: 4mm 0mm;
            size: auto;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}
      </style>
      <Outlet />
    </div>
  ),
});
