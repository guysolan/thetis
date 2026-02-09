/**
 * Reorder plan: 6 orders per year based on combined MPD + Park House stock
 * and seasonal monthly demand.
 *
 * Seasonal demand pattern (derived from annual target):
 * - Low season (Oct–Feb): 5 months at base X
 * - Mid season (Mar, Aug, Sep): 3 months at X × 1.5
 * - High season (Apr–Jul): 4 months at X × 2
 *
 * Annual = 5X + 3(1.5X) + 4(2X) = 17.5X
 * With annual target of 2,200: X = 2200 / 17.5 ≈ 126
 */

// Target annual demand
export const ANNUAL_DEMAND_TOTAL = 2200;

// Seasonal multipliers: Low = 1, Mid = 1.5, High = 2
// Total "weight" = 5×1 + 3×1.5 + 4×2 = 17.5
const SEASONAL_WEIGHT = 5 * 1 + 3 * 1.5 + 4 * 2; // 17.5
const LOW_SEASON_DEMAND = Math.round(ANNUAL_DEMAND_TOTAL / SEASONAL_WEIGHT);

// Monthly demand (units). Index 0 = January.
// Low: Jan, Feb, Oct, Nov, Dec | Mid: Mar, Aug, Sep | High: Apr, May, Jun, Jul
export const MONTHLY_DEMAND = [
	LOW_SEASON_DEMAND,                    // Jan (low)
	LOW_SEASON_DEMAND,                    // Feb (low)
	Math.round(LOW_SEASON_DEMAND * 1.5),  // Mar (mid)
	Math.round(LOW_SEASON_DEMAND * 2),    // Apr (high)
	Math.round(LOW_SEASON_DEMAND * 2),    // May (high)
	Math.round(LOW_SEASON_DEMAND * 2),    // Jun (high)
	Math.round(LOW_SEASON_DEMAND * 2),    // Jul (high)
	Math.round(LOW_SEASON_DEMAND * 1.5),  // Aug (mid)
	Math.round(LOW_SEASON_DEMAND * 1.5),  // Sep (mid)
	LOW_SEASON_DEMAND,                    // Oct (low)
	LOW_SEASON_DEMAND,                    // Nov (low)
	LOW_SEASON_DEMAND,                    // Dec (low)
] as const;

export const LEAD_TIME_WEEKS = 10;
export const LEAD_TIME_MONTHS = LEAD_TIME_WEEKS / 4.33;
export const BUFFER_MONTHS = 1;

/** Orders are placed in multiples of 25 (round up). */
export const ORDER_QUANTITY_MULTIPLE = 25;

function roundOrderQuantity(raw: number): number {
	if (raw <= 0) return 0;
	return Math.ceil(raw / ORDER_QUANTITY_MULTIPLE) * ORDER_QUANTITY_MULTIPLE;
}

const MONTH_NAMES = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function getDemandForMonth(monthIndex: number): number {
	return MONTHLY_DEMAND[monthIndex % 12] ?? 0;
}

export function getMonthName(monthIndex: number): string {
	return MONTH_NAMES[monthIndex % 12] ?? "";
}

/** Product names that are part of the reorder plan (Night Splints at MPD + Park House). */
export const REORDER_PLAN_PRODUCT_NAMES = [
	"Night Splint - Small Right (Bag)",
	"Night Splint - Small Left (Bag)",
	"Night Splint - Large Right (Bag)",
	"Night Splint - Large Left (Bag)",
] as const;

/** 3:1 large to small: each Large SKU 3/8 of demand, each Small SKU 1/8. */
export function getDemandMultiplierForProduct(productName: string): number {
	return productName.includes("Large") ? 3 / 8 : 1 / 8;
}

export interface MonthDemand {
	month: number;
	year: number;
	monthName: string;
	demand: number;
}

/** Next 12 months demand from a given start (for display). */
export function getUpcomingMonthsDemand(
	startMonth: number,
	startYear: number,
	months: number = 12,
): MonthDemand[] {
	const result: MonthDemand[] = [];
	for (let i = 0; i < months; i++) {
		const m = (startMonth + i) % 12;
		const y = startYear + Math.floor((startMonth + i) / 12);
		result.push({
			month: m,
			year: y,
			monthName: getMonthName(m),
			demand: getDemandForMonth(m),
		});
	}
	return result;
}

export interface ReorderRow {
	orderIndex: number;
	placeOrderBy: { month: number; year: number };
	deliversBy: { month: number; year: number };
	quantity: number;
	isNextOrder: boolean;
}

export interface ReorderPlanResult {
	orders: ReorderRow[];
	projectedStockByMonth: { month: number; year: number; stock: number }[];
}

/**
 * Compute the next 6 reorder dates and quantities so stock never runs out.
 * Uses: current combined stock, monthly demand curve, 6 deliveries per year (delivery months 2,4,6,8,10,0).
 * Order is placed ~2 months before delivery (lead time).
 * demandMultiplier: scale monthly demand (e.g. 3/8 for one Large SKU, 1/8 for one Small SKU).
 */
export function computeReorderPlan(
	currentStock: number,
	startMonth: number,
	startYear: number,
	options: {
		leadTimeMonths?: number;
		bufferMonths?: number;
		numOrders?: number;
		demandMultiplier?: number;
	} = {},
): ReorderPlanResult {
	const demandMultiplier = options.demandMultiplier ?? 1;
	const leadTimeMonths = Math.round(options.leadTimeMonths ?? LEAD_TIME_MONTHS);
	const bufferMonths = options.bufferMonths ?? BUFFER_MONTHS;
	const numOrders = options.numOrders ?? 6;

	// Delivery months in calendar order: 2,4,6,8,10, then 0 (next year)
	const deliveryMonthValues = [2, 4, 6, 8, 10, 0];

	// Build list of (month, year) for the next `numOrders` deliveries from (startMonth, startYear)
	const deliveries: { month: number; year: number }[] = [];
	let y = startYear;
	let dIdx = deliveryMonthValues.findIndex((d) => d >= startMonth);
	if (dIdx < 0) {
		dIdx = 0;
		y = startYear + 1;
	}
	for (let i = 0; i < numOrders; i++) {
		const m = deliveryMonthValues[dIdx % 6];
		deliveries.push({ month: m, year: m === 0 ? y + 1 : y });
		if (m === 0) y += 1;
		dIdx += 1;
	}

	// Place-order date = delivery - leadTimeMonths (simplified: 2 months before)
	const placeOrderMonths = deliveries.map((d) => {
		let pm = d.month - 2;
		let py = d.year;
		if (pm < 0) {
			pm += 12;
			py -= 1;
		}
		return { month: pm, year: py };
	});

	// Simulate month-by-month from start; at each delivery month, add order qty
	let stock = currentStock;
	const projectedStockByMonth: { month: number; year: number; stock: number }[] = [];
	const orderQuantities: number[] = [];

	const totalMonths = 12;
	for (let i = 0; i < totalMonths; i++) {
		const m = (startMonth + i) % 12;
		const y = startYear + Math.floor((startMonth + i) / 12);

		// Subtract this month's demand
		const monthDemand = getDemandForMonth(m) * demandMultiplier;
		stock -= monthDemand;
		stock = Math.max(0, stock);

		const deliveryIdx = deliveries.findIndex((d) => d.month === m && d.year === y);
		if (deliveryIdx >= 0) {
			const nextDelivery = deliveries[deliveryIdx + 1];
			let demandUntilNext = 0;
			if (nextDelivery) {
				let mm = (m + 1) % 12;
				let yy = mm === 0 ? y + 1 : y;
				while (mm !== nextDelivery.month || yy !== nextDelivery.year) {
					demandUntilNext += getDemandForMonth(mm) * demandMultiplier;
					mm = (mm + 1) % 12;
					if (mm === 0) yy += 1;
				}
			} else {
				demandUntilNext =
					(getDemandForMonth((m + 1) % 12) + getDemandForMonth((m + 2) % 12)) *
					demandMultiplier;
			}
			const bufferDemand = bufferMonths * (ANNUAL_DEMAND_TOTAL / 12) * demandMultiplier;
			const rawQty = Math.max(0, Math.round(demandUntilNext + bufferDemand - stock));
			const orderQty = roundOrderQuantity(rawQty);
			orderQuantities[deliveryIdx] = orderQty;
			stock += orderQty;
		}

		projectedStockByMonth.push({ month: m, year: y, stock });
	}

	// Build order rows (place by, delivers by, quantity)
	const now = new Date();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	const orders: ReorderRow[] = deliveries.slice(0, orderQuantities.length).map((d, idx) => {
		const place = placeOrderMonths[idx];
		return {
			orderIndex: idx + 1,
			placeOrderBy: place,
			deliversBy: d,
			quantity: orderQuantities[idx] ?? 0,
			isNextOrder: false,
		};
	});

	// Mark the first order whose place-by is in the future (or current month) as "next"
	for (let i = 0; i < orders.length; i++) {
		const p = orders[i].placeOrderBy;
		if (p.year > currentYear || (p.year === currentYear && p.month >= currentMonth)) {
			orders[i].isNextOrder = true;
			break;
		}
	}
	if (!orders.some((o) => o.isNextOrder) && orders.length > 0) {
		orders[0].isNextOrder = true;
	}

	return { orders, projectedStockByMonth };
}

export interface RunOutResult {
	projectedStockByMonth: {
		month: number;
		year: number;
		monthLabel: string;
		stock: number;
	}[];
	runOutMonth: number | null;
	runOutYear: number | null;
	placeOrderByMonth: number | null;
	placeOrderByYear: number | null;
}

/**
 * Simulate stock with no orders (demand only). Find when stock runs out and when to place order so delivery arrives before run-out.
 */
export function computeRunOutAndOrderBy(
	currentStock: number,
	startMonth: number,
	startYear: number,
	options: { demandMultiplier?: number } = {},
): RunOutResult {
	const demandMultiplier = options.demandMultiplier ?? 1;
	const leadTimeMonths = Math.round(LEAD_TIME_MONTHS);

	let stock = currentStock;
	const projectedStockByMonth: RunOutResult["projectedStockByMonth"] = [];
	let runOutMonth: number | null = null;
	let runOutYear: number | null = null;

	for (let i = 0; i < 12; i++) {
		const m = (startMonth + i) % 12;
		const y = startYear + Math.floor((startMonth + i) / 12);
		const monthDemand = getDemandForMonth(m) * demandMultiplier;
		stock -= monthDemand;
		stock = Math.max(0, stock);
		projectedStockByMonth.push({
			month: m,
			year: y,
			monthLabel: `${getMonthName(m)} '${String(y).slice(2)}`,
			stock,
		});
		if (runOutMonth === null && stock <= 0) {
			runOutMonth = m;
			runOutYear = y;
		}
	}

	let placeOrderByMonth: number | null = null;
	let placeOrderByYear: number | null = null;
	if (runOutMonth !== null && runOutYear !== null) {
		let pm = runOutMonth - leadTimeMonths;
		let py = runOutYear;
		while (pm < 0) {
			pm += 12;
			py -= 1;
		}
		placeOrderByMonth = pm;
		placeOrderByYear = py;
	}

	return {
		projectedStockByMonth,
		runOutMonth,
		runOutYear,
		placeOrderByMonth,
		placeOrderByYear,
	};
}
