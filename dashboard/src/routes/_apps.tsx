import { createFileRoute } from "@tanstack/react-router";
import Navigation from "../features/navigation/Navigation";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_apps")({
    component: () => (
        <>
            <Navigation />
            <Outlet />
        </>
    ),
});
