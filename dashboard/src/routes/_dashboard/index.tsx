import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "../../components/PageTitle";

export const Route = createFileRoute("/_dashboard/")({
	component: () => (
		<>
			<PageTitle title="Home">
			</PageTitle>
		</>
	),
});
