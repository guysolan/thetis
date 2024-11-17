import { createFileRoute, ReactNode } from "@tanstack/react-router";
import PageTitle from "../components/PageTitle";
import { Link } from "@tanstack/react-router";

import { jobs } from "../features/navigation/content";
import Navigation from "../features/navigation/Navigation";

export const Route = createFileRoute("/")({
  component: () => (
    <section className="p-8 w-full">
      <Navigation />
      <div className="flex flex-col space-y-12 mt-8">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 w-full">
          <Link
            to="/stock/orders"
            className="flex flex-col bg-white hover:bg-zinc-50 shadow-sm hover:shadow-md p-8 border rounded-xl transition-colors"
          >
            <div className="flex-grow">
              <h4 className="mb-4 font-bold text-2xl">Stock Orders</h4>
              <p className="text-lg text-zinc-600">
                View and manage your stock orders, track inventory levels, and
                monitor order status. Keep your stock organized and up-to-date.
              </p>
            </div>
          </Link>
          <Link
            to="/finances/amazon/settlements"
            className="flex flex-col bg-white hover:bg-zinc-50 shadow-sm hover:shadow-md p-8 border rounded-xl transition-colors"
          >
            <div className="flex-grow">
              <h4 className="mb-4 font-bold text-2xl">Finances</h4>
              <p className="text-lg text-zinc-600">
                Manage your financial transactions, track expenses, and monitor
                your budget. Get insights into your spending patterns and
                financial health.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  ),
});
