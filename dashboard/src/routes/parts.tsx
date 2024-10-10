import { createFileRoute } from "@tanstack/react-router";
import { useSelectParts } from "../features/parts/api/selectParts";

const PartsPage = () => {
	const { data: parts } = useSelectParts();
	return (
		<div>
			{parts.map((part) => (
				<div key={part.id}>{part.name}</div>
			))}
		</div>
	);
};
export const Route = createFileRoute("/parts")({
	component: PartsPage,
});
