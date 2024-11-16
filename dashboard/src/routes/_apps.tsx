import { createFileRoute } from "@tanstack/react-router";
import Navigation from "../features/navigation/Navigation";
import { Outlet } from "@tanstack/react-router";
import Authentication from "../features/auth/Authentication";

export const Route = createFileRoute("/_apps")({
    component: () => (
        <>
            <Navigation />
            <Authentication />
        </>
    ),
});
