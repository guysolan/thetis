import {
	createRootRouteWithContext,
	Link,
	Outlet,
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
			<section className="space-y-2 md:space-y-4 p-2 md:p-4 max-w-screen-2xl container">
				<Outlet />
			</section>
		</>
	);
}
