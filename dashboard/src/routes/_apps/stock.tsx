import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: DashboardComponent,
});

function DashboardComponent() {
	return (
		<>
			<section className="container p-6 max-w-screen-2xl">
				<Outlet />
			</section>
		</>
	);
}
