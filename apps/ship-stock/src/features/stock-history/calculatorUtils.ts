// Seasonal sales distribution percentages by month (0-indexed: 0=Jan, 11=Dec)
const MONTHLY_PERCENTAGES = [
    0.05, // Jan
    0.08, // Feb
    0.11, // Mar
    0.15, // Apr (spring peak)
    0.14, // May
    0.12, // Jun
    0.12, // Jul
    0.12, // Aug (summer peak)
    0.10, // Sep
    0.08, // Oct
    0.06, // Nov
    0.05, // Dec
];

/**
 * Get the seasonal percentage for a given month
 * @param month - Month index (0-11, where 0 = January)
 */
export const getMonthlyPercentage = (month: number): number => {
    return MONTHLY_PERCENTAGES[month % 12];
};

/**
 * Calculate expected sales for the next N months starting from a given date
 * @param annualSales - Total expected sales per year
 * @param startDate - Starting date (defaults to today)
 * @param months - Number of months to project (defaults to 3)
 */
export const calculateProjectedSales = (
    annualSales: number,
    startDate: Date = new Date(),
    months: number = 3,
): number => {
    let totalSales = 0;
    const currentDate = new Date(startDate);

    for (let i = 0; i < months; i++) {
        const monthIndex = currentDate.getMonth();
        const monthlyPercentage = getMonthlyPercentage(monthIndex);
        totalSales += annualSales * monthlyPercentage;

        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return Math.round(totalSales);
};

/**
 * Calculate the recommended order quantity to maintain stock levels
 * @param currentStock - Current inventory on hand
 * @param annualSales - Expected annual sales
 * @param leadTimeWeeks - Lead time in weeks (default 10)
 * @param bufferMonths - Desired buffer stock in months (default 3)
 */
export const calculateOrderQuantity = (
    currentStock: number,
    annualSales: number,
    leadTimeWeeks: number = 10,
    bufferMonths: number = 3,
): number => {
    const leadTimeMonths = leadTimeWeeks / 4.33; // Convert weeks to months (avg 4.33 weeks/month)
    const totalMonths = leadTimeMonths + bufferMonths;

    // Calculate sales during lead time + buffer period
    const projectedSales = calculateProjectedSales(
        annualSales,
        new Date(),
        totalMonths,
    );

    // Order quantity = what we need - what we have
    const orderQuantity = projectedSales - currentStock;

    // Don't recommend negative orders
    return Math.max(0, Math.round(orderQuantity));
};

/**
 * Get a month-by-month breakdown of projected sales
 * @param annualSales - Expected annual sales
 * @param startDate - Starting date (defaults to today)
 * @param months - Number of months to project (defaults to 12)
 */
export const getMonthlyBreakdown = (
    annualSales: number,
    startDate: Date = new Date(),
    months: number = 12,
): Array<
    { month: string; year: number; sales: number; percentage: number }
> => {
    const breakdown: Array<
        { month: string; year: number; sales: number; percentage: number }
    > = [];
    const currentDate = new Date(startDate);

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    for (let i = 0; i < months; i++) {
        const monthIndex = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const percentage = getMonthlyPercentage(monthIndex);
        const sales = Math.round(annualSales * percentage);

        breakdown.push({
            month: monthNames[monthIndex],
            year,
            sales,
            percentage,
        });

        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return breakdown;
};
