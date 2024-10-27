import {
	Link,
	Outlet,
	createRootRouteWithContext,
	useRouterState,
} from "@tanstack/react-router";
import Navigation from '../features/navigation/Navigation';
import { Toaster } from "@/components/ui/sonner";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Button } from '../components/ui/button';

import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  return <Loader2 size={40} className={cn("fixed top-1/2 left-1/2 animate-spin", isLoading ? "block" : "hidden")} />
}

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Button asChild variant="outline"><Link to="/">Start Over</Link></Button>
			</div>
		);
	},
});

function RootComponent() {
	return (
    <body className="w-full min-h-screen font-raleway text-left text-zinc-800">
			<RouterSpinner />
			<Outlet />
			<Toaster />
			{/* <ReactQueryDevtools buttonPosition="top-right" /> */}
			{/* <TanStackRouterDevtools position="bottom-right" /> */}
		</body>
	);
}
