import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});

function RootComponent() {
	return (
    <body className="flex flex-col items-center gap-8 bg-slate-100 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] m-0 py-8 w-full min-h-screen font-raleway text-center text-slate-800">
			<Outlet />
			<Toaster />
			{/* <ReactQueryDevtools buttonPosition="top-right" /> */}
			{/* <TanStackRouterDevtools position="bottom-right" /> */}
		</body>
	);
}
