import * as React from "react";
import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: DashboardComponent,
});

function DashboardComponent() {
	return (
		<>
			<nav className="flex flex-wrap justify-center items-center space-x-2 sm:space-x-4 lg:space-x-6 mx-auto px-4 py-2 max-w-screen-xl">
				<Link
					to="/"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>
				<Link
					to="/sales"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Sales
				</Link>
				<Link
					to="/purchases"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Purchases
				</Link>
				<Link
					to="/parts"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Parts
				</Link>
				<Link
					to="/products"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Products
				</Link>
			</nav>
			<hr />
			<section className="p-4 md:p-8">
				<Outlet />
			</section>
		</>
	);
}
