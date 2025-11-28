import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/home/orders/$orderId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: `/home/orders/${orderId}/details` as any, replace: true });
  }, [orderId, navigate]);

  return null;
}
