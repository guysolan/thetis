import { createFileRoute, Link } from "@tanstack/react-router";
import { sections } from "@/content/course/sections";
import { ArrowRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const totalSections = sections.length;
  const totalWeeks = Math.max(...sections.map((s) => s.week)) + 1;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-20">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
          <BookOpen className="h-4 w-4" />
          Achilles Rupture Recovery
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight">
          Your Complete Guide to{" "}
          <span className="text-blue-600">Recovery</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Evidence-based guidance for every stage of your Achilles tendon rupture recovery, from emergency care to return to sport.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/essentials"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/30"
          >
            Start the Course
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://thetismedical.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Visit Thetis Medical
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
        <div className="text-center p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
            {totalSections}
          </div>
          <div className="text-sm text-slate-600">Sections</div>
        </div>
        <div className="text-center p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
            {totalWeeks}
          </div>
          <div className="text-sm text-slate-600">Weeks Covered</div>
        </div>
        <div className="text-center p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
            6+
          </div>
          <div className="text-sm text-slate-600">Months to Recovery</div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
        <h2 className="font-serif text-2xl font-semibold text-slate-900 mb-6">
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: Clock,
              title: "Week 0-1: Emergency Care",
              description: "Initial assessment, A&E expectations, blood clot prevention",
            },
            {
              icon: CheckCircle2,
              title: "Weeks 1-3: Treatment Decision",
              description: "Surgery vs non-surgical, walking boot fitting, protection",
            },
            {
              icon: CheckCircle2,
              title: "Weeks 4-9: Boot Phase",
              description: "Wedge removal, walking progress, healing milestones",
            },
            {
              icon: CheckCircle2,
              title: "Weeks 10-12: Boot Transition",
              description: "First steps in shoes, starting physiotherapy",
            },
            {
              icon: CheckCircle2,
              title: "Weeks 13-25: Strengthening",
              description: "Progressive exercises, cardio, functional milestones",
            },
            {
              icon: CheckCircle2,
              title: "Week 26+: Return to Sport",
              description: "Running, plyometrics, long-term recovery",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

