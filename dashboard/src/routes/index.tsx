import { createFileRoute, ReactNode } from "@tanstack/react-router";
import PageTitle from "../components/PageTitle";
import {
  ExternalLink
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { jobs } from '../features/navigation/content';
import Navigation from '../features/navigation/Navigation';

export const Route = createFileRoute("/")({
  component: () => (
    <section className="w-full">
      <Navigation />
      <div className="flex flex-col space-y-8">
        {Object.entries(jobs).map(([category, jobData], index) => (
          <div
            key={category}
            className="flex flex-col justify-start items-start"
          >
            <Link
              to={jobData.href}
              className="flex items-center mb-4 group"
              target={jobData.external ? "_blank" : "_self"}
              rel={jobData.external ? "noopener noreferrer" : ""}
            >
              <span className="flex justify-center items-center mr-2 w-8 h-8">
                {jobData.icon}
              </span>
              <h2 className="font-bold text-2xl group-hover:underline capitalize">{category}</h2>
              {jobData.external && <ExternalLink className="ml-2 w-4 h-4" />}
            </Link>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
              {jobData.pages && jobData.pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.href}
                  className="flex items-center bg-white hover:bg-zinc-50 p-4 border rounded-lg transition-colors"
                  target={page.external ? "_blank" : "_self"}
                  rel={page.external ? "noopener noreferrer" : ""}
                >
                  <span className="flex justify-center items-center mr-4 w-12 h-12">
                    {page.icon}
                  </span>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-md">{page.name}</h4>
                    <p className="text-sm text-zinc-600">{page.description}</p>
                  </div>
                  {page.external && <ExternalLink className="ml-2 w-4 h-4" />}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
});
