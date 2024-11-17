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
			<section className="p-2 lg:p-6 max-w-screen-2xl container">
				<Outlet />
			</section>
		</>
	);
}
