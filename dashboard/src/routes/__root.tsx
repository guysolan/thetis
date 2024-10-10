import * as React from "react";
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
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
		<>
			<div className="flex gap-2 p-2 text-lg">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>{" "}
				<Link
					to="/sales"
					activeProps={{
						className: "font-bold",
					}}
				>
					Sales
				</Link>{" "}
				<Link
					to="/purchases"
					activeProps={{
						className: "font-bold",
					}}
				>
					Purchases
				</Link>{" "}
				<Link
					to="/parts"
					activeProps={{
						className: "font-bold",
					}}
				>
					Parts
				</Link>{" "}
				<Link
					to="/products"
					activeProps={{
						className: "font-bold",
					}}
				>
					Products
				</Link>{" "}
				<Link
					// @ts-expect-error
					to="/this-route-does-not-exist"
					activeProps={{
						className: "font-bold",
					}}
				>
					This Route Does Not Exist
				</Link>
			</div>
			<hr />
			<Outlet />
			<ReactQueryDevtools buttonPosition="top-right" />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
