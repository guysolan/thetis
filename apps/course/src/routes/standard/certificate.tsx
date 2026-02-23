import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import CertificatePage from "@/components/course/CertificatePage";

export const Route = createFileRoute("/standard/certificate")({
  component: () => (
    <ProtectedRoute requiredCourse="standard">
      <CertificatePage />
    </ProtectedRoute>
  ),
});
