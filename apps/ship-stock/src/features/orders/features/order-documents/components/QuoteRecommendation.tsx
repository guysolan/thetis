import React from "react";

const QuoteRecommendation = () => {
	return (
		<section className="mb-6 rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-800/50">
			<p className="font-medium text-neutral-900 dark:text-neutral-50">
				Ordering recommendation
			</p>
			<p className="mt-1 text-neutral-700 dark:text-neutral-300">
				We recommend ordering 2× large for each 1× small. For example: 50 LL, 50
				LR, 25 SL, 25 SR.
			</p>
		</section>
	);
};

export default QuoteRecommendation;
