import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
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
				<Separator
					className="bg-neutral-600 w-[1px] h-6"
					orientation="vertical"
				/>
				<Link
					to="/orders"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Orders
				</Link>
				<Link
					to="/items"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
Items
				</Link>
			
				<Link
					to="/warehouses"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Warehouses
				</Link>
				<Separator
					className="bg-neutral-600 w-[1px] h-6"
					orientation="vertical"
				/>
				<Link
					to="/settings"
					className={cn(buttonVariants({ variant: "link" }))}
					activeProps={{
						className: "underline underline-offset-6",
					}}
				>
					Settings
				</Link>
			</nav>
			<hr />
			<section className="p-4 md:p-8">
				<Outlet />
			</section>
		</>
	);
}
