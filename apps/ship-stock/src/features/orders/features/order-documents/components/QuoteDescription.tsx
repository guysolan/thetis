import React from "react";

const QuoteDescription = ({
	orderDate,
	quoteNumber,
	currency,
}: {
	orderDate: string;
	quoteNumber: number;
	currency: string;
}) => {
	return (
		<section className="mb-6">
			<p>
				<strong>Date:</strong> {new Date(orderDate).toLocaleDateString("en-GB")}
			</p>
			<p>
				<strong>Quote:</strong> {quoteNumber.toString().padStart(4, "0")}
			</p>
			<p>
				<strong>Currency:</strong> {currency}
			</p>
			<p className="mt-2 text-neutral-600 text-sm dark:text-neutral-400">
				This quote excludes Tax, Import and Shipping Costs
			</p>
		</section>
	);
};

export default QuoteDescription;
