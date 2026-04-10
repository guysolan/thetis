"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  Droplets,
  Gauge,
  LayoutList,
  Sparkles,
  Table2,
  Wallet,
} from "lucide-react";
import {
  bootFamilyLabel,
  type BootModel,
  BOOTS,
  PRIORITIES,
  type PriorityId,
} from "./boots-data";

type TabId = "match" | "table" | "compare";

/** Table & dropdowns: wedge CAM group first, then alphabetical within group. */
function sortBootsForDisplay(list: BootModel[]): BootModel[] {
  return [...list].sort((a, b) => {
    if (a.family !== b.family) {
      return a.family === "wedge-cam" ? -1 : 1;
    }
    return a.shortName.localeCompare(b.shortName);
  });
}

const PRIORITY_ICONS: Record<PriorityId, React.ReactNode> = {
  budget: <Wallet className="w-5 h-5 shrink-0" aria-hidden />,
  lightweight: <Sparkles className="w-5 h-5 shrink-0" aria-hidden />,
  showering: <Droplets className="w-5 h-5 shrink-0" aria-hidden />,
  ankleAngle: <Gauge className="w-5 h-5 shrink-0" aria-hidden />,
  romLater: <ArrowRightLeft className="w-5 h-5 shrink-0" aria-hidden />,
  simplicity: <BadgeCheck className="w-5 h-5 shrink-0" aria-hidden />,
};

function averageMatch(
  boot: BootModel,
  active: PriorityId[],
): { score: number; label: string } {
  if (active.length === 0) {
    return { score: 0, label: "Select priorities" };
  }
  const sum = active.reduce((s, id) => s + boot.match[id], 0);
  return {
    score: Math.round(sum / active.length),
    label: `${Math.round(sum / active.length)}% match`,
  };
}

export default function BootComparisonTool() {
  const [tab, setTab] = useState<TabId>("match");
  const [activePriorities, setActivePriorities] = useState<PriorityId[]>([
    "budget",
    "lightweight",
  ]);
  const [expanded, setExpanded] = useState<string | null>("aircast-airselect");
  const [compareA, setCompareA] = useState<string>("aircast-airselect");
  const [compareB, setCompareB] = useState<string>("vacoped");

  const ranked = useMemo(() => {
    const list = BOOTS.map((b) => ({
      boot: b,
      ...averageMatch(b, activePriorities),
    }));
    if (activePriorities.length === 0) {
      return list.sort((a, b) =>
        a.boot.shortName.localeCompare(b.boot.shortName)
      );
    }
    return list.sort((a, b) => b.score - a.score);
  }, [activePriorities]);

  const togglePriority = (id: PriorityId) => {
    setActivePriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const bootA = BOOTS.find((b) => b.id === compareA)!;
  const bootB = BOOTS.find((b) => b.id === compareB)!;

  return (
    <div className="bg-white shadow-lg my-8 border border-gray-200 rounded-2xl text-gray-900 text-lg leading-relaxed">
      <div
        className="px-4 sm:px-8 pt-8 pb-6 border-gray-100 border-b rounded-t-2xl"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
        }}
      >
        <h2 className="mb-3 font-bold text-gray-900 text-2xl sm:text-3xl tracking-tight">
          Walking boot comparison
        </h2>
        <p className="max-w-3xl text-gray-700 text-base sm:text-lg leading-relaxed">
          There are{" "}
          <strong className="font-semibold text-gray-800">
            many brand names and catalogue numbers
          </strong>{" "}
          — they almost all fall into{" "}
          <strong className="font-semibold text-gray-800">two families</strong>
          : wedge CAM walkers vs hinged ROM boots. Below lists common examples
          plus a generic hospital boot; rankings are illustrative. Evidence
          lines up with our{" "}
          <a
            href="/articles/aircast-vs-vacoped"
            className="font-medium text-[#2337ff] hover:underline underline-offset-2"
          >
            Aircast vs VACOped guide
          </a>
          . This does not replace your clinician’s protocol.
        </p>

        <div
          className="flex flex-wrap gap-2 mt-6"
          role="tablist"
          aria-label="Comparison views"
        >
          <TabButton
            isActive={tab === "match"}
            onClick={() => setTab("match")}
            icon={<LayoutList className="w-5 h-5" />}
          >
            Match finder
          </TabButton>
          <TabButton
            isActive={tab === "table"}
            onClick={() => setTab("table")}
            icon={<Table2 className="w-5 h-5" />}
          >
            Full table
          </TabButton>
          <TabButton
            isActive={tab === "compare"}
            onClick={() => setTab("compare")}
            icon={<ArrowRightLeft className="w-5 h-5" />}
          >
            Side-by-side
          </TabButton>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8 sm:py-10">
        {tab === "match" && (
          <div className="gap-10 grid lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5">
              <h3 className="font-semibold text-gray-900 text-base uppercase tracking-wide">
                Your priorities
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Toggle what matters. More selected = a blended score (not a
                diagnosis).
              </p>
              <div className="flex flex-col gap-2">
                {PRIORITIES.map((p) => {
                  const on = activePriorities.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="switch"
                      aria-checked={on}
                      onClick={() => togglePriority(p.id)}
                      className={[
                        "flex gap-3 items-start text-left p-4 rounded-xl border-2 transition-colors",
                        on
                          ? "border-[#2337ff] bg-[#2337ff]/5 shadow-sm"
                          : "border-gray-200 bg-gray-50/80 hover:border-gray-300",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          on
                            ? "bg-[#2337ff] text-white"
                            : "bg-white text-gray-500 border border-gray-200",
                        ].join(" ")}
                      >
                        {PRIORITY_ICONS[p.id]}
                      </span>
                      <span>
                        <span className="block font-semibold text-gray-900 text-base">
                          {p.label}
                        </span>
                        <span className="block mt-1.5 text-gray-600 text-sm leading-snug">
                          {p.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {activePriorities.length === 0 && (
                <p className="bg-amber-50 px-4 py-3 border border-amber-100 rounded-lg text-amber-950 text-base leading-relaxed">
                  Select at least one priority to rank boots, or switch to{" "}
                  <strong>Full table</strong> to see everything at once.
                </p>
              )}
            </div>

            <div className="space-y-4 lg:col-span-7">
              <h3 className="font-semibold text-gray-900 text-base uppercase tracking-wide">
                Ranked for you
              </h3>
              <ul className="space-y-3 m-0 p-0 list-none">
                {ranked.map((row, idx) => (
                  <li key={row.boot.id}>
                    <article
                      className={[
                        "rounded-xl border-2 overflow-hidden transition-shadow",
                        idx === 0 && activePriorities.length > 0
                          ? "border-[#2337ff]/40 shadow-md"
                          : "border-gray-200 shadow-sm",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        className="flex items-start gap-4 hover:bg-gray-50/80 p-5 w-full text-left transition-colors"
                        onClick={() =>
                          setExpanded((e) =>
                            e === row.boot.id ? null : row.boot.id
                          )}
                        aria-expanded={expanded === row.boot.id}
                      >
                        <div
                          className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-base",
                            idx === 0 && activePriorities.length > 0
                              ? "bg-[#2337ff] text-white"
                              : "bg-gray-200 text-gray-700",
                          ].join(" ")}
                        >
                          {activePriorities.length > 0 ? idx + 1 : "—"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-gray-900 text-xl leading-snug">
                              {row.boot.shortName}
                            </h4>
                            {activePriorities.length > 0 && (
                              <span className="inline-flex items-center bg-gray-100 px-3 py-0.5 rounded-full font-medium text-gray-800 text-sm">
                                {row.label}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-gray-700 text-base leading-relaxed">
                            {row.boot.tagline}
                          </p>
                          <div className="bg-gray-100 mt-3 rounded-full h-2 overflow-hidden">
                            <div
                              className="rounded-full h-full transition-all duration-500"
                              style={{
                                width: `${
                                  activePriorities.length > 0 ? row.score : 0
                                }%`,
                                backgroundColor: "#2337ff",
                              }}
                            />
                          </div>
                        </div>
                        <span className="self-center text-gray-500 shrink-0">
                          {expanded === row.boot.id
                            ? <ChevronUp className="w-7 h-7" />
                            : <ChevronDown className="w-7 h-7" />}
                        </span>
                      </button>
                      {expanded === row.boot.id && (
                        <div className="gap-6 grid sm:grid-cols-2 bg-gray-50/50 px-4 pt-0 pb-5 border-gray-100 border-t">
                          <div className="pt-4 sm:pt-4">
                            <p className="mb-3 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                              Snapshot
                            </p>
                            <dl className="space-y-3 m-0 text-base leading-relaxed">
                              <div className="flex justify-between gap-4">
                                <dt className="m-0 text-gray-600">Family</dt>
                                <dd className="m-0 font-medium text-gray-900 text-right">
                                  {bootFamilyLabel(row.boot.family)}
                                </dd>
                              </div>
                              <div className="flex justify-between gap-4">
                                <dt className="m-0 text-gray-600">Mechanism</dt>
                                <dd className="m-0 font-medium text-gray-900 text-right">
                                  {row.boot.mechanism}
                                </dd>
                              </div>
                              <div className="flex justify-between gap-4">
                                <dt className="m-0 text-gray-600">
                                  UK / US cost
                                </dt>
                                <dd className="m-0 font-medium text-gray-900 text-right">
                                  {row.boot.costUK}
                                  <br />
                                  {row.boot.costUS}
                                </dd>
                              </div>
                              <div className="flex justify-between gap-4">
                                <dt className="m-0 text-gray-600">
                                  Weight feel
                                </dt>
                                <dd className="m-0 font-medium text-gray-900 text-right">
                                  {row.boot.weightFeel}
                                </dd>
                              </div>
                            </dl>
                          </div>
                          <div className="pt-2 sm:pt-4">
                            <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                              Strengths
                            </p>
                            <ul className="space-y-2 m-0 pl-5 text-gray-800 text-base leading-relaxed list-disc">
                              {row.boot.pros.map((x) => <li key={x}>{x}</li>)}
                            </ul>
                            <p className="mt-5 mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                              Trade-offs
                            </p>
                            <ul className="space-y-2 m-0 pl-5 text-gray-800 text-base leading-relaxed list-disc">
                              {row.boot.cautions.map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4 sm:col-span-2 pb-1">
                            <p className="bg-white m-0 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 text-base leading-relaxed">
                              <strong className="text-gray-900">
                                Evidence:
                              </strong>{" "}
                              {row.boot.evidenceNote}
                            </p>
                            <BootSourcesPanel boot={row.boot} />
                          </div>
                        </div>
                      )}
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "table" && (
          <div className="-mx-1 overflow-x-auto">
            <table className="w-full min-w-[880px] text-base border-collapse">
              <thead>
                <tr className="border-gray-200 border-b-2">
                  <th className="left-0 z-10 sticky bg-gray-50 p-4 border-gray-200 border-r font-semibold text-gray-900 text-left">
                    Boot
                  </th>
                  <th className="bg-gray-50 p-4 font-semibold text-gray-900 text-left">
                    Family
                  </th>
                  <th className="bg-gray-50 p-4 font-semibold text-gray-900 text-left">
                    Mechanism
                  </th>
                  <th className="bg-gray-50 p-4 font-semibold text-gray-900 text-left">
                    UK / US
                  </th>
                  <th className="bg-gray-50 p-4 font-semibold text-gray-900 text-left">
                    Weight
                  </th>
                  <th className="bg-gray-50 p-4 font-semibold text-gray-900 text-left">
                    Water
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortBootsForDisplay(BOOTS).map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-gray-50/80 border-gray-100 border-b"
                  >
                    <td className="left-0 sticky bg-white p-4 border-gray-100 border-r font-medium text-gray-900 align-top">
                      <span className="block text-base">{b.shortName}</span>
                      <span className="block mt-1.5 font-normal text-gray-600 text-sm leading-snug">
                        {b.fullName}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800 align-top whitespace-nowrap">
                      {bootFamilyLabel(b.family)}
                    </td>
                    <td className="p-4 text-gray-800 align-top leading-relaxed">
                      {b.mechanism}
                    </td>
                    <td className="p-4 text-gray-800 align-top leading-relaxed">
                      {b.costUK}
                      <br />
                      {b.costUS}
                    </td>
                    <td className="p-4 text-gray-800 align-top">
                      {b.weightFeel}
                    </td>
                    <td className="p-4 max-w-[260px] text-gray-800 align-top leading-relaxed">
                      {b.waterproof}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed max-w-4xl">
              NHS patients often receive boots without paying retail. UK/US £/$
              in the table match the{" "}
              <strong className="font-semibold text-gray-800">
                retailer or manufacturer pages linked under each boot
              </strong>{" "}
              (snapshots checked 2026-04); carts change — re-verify before
              buying. Other wedge CAM examples include Ovation, Orthomen, and
              own-brand fracture-clinic walkers. Always confirm angle
              progressions with your clinician.
            </p>
          </div>
        )}

        {tab === "compare" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-4">
              <label className="block">
                <span className="block mb-1.5 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                  Option A
                </span>
                <select
                  value={compareA}
                  onChange={(e) => setCompareA(e.target.value)}
                  className="shadow-sm px-3 py-2.5 border border-gray-300 focus:border-[#2337ff] rounded-lg focus:outline-none focus:ring-[#2337ff]/30 focus:ring-2 min-w-[220px] text-gray-900 text-base"
                >
                  {sortBootsForDisplay(BOOTS).map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.shortName}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block mb-1.5 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                  Option B
                </span>
                <select
                  value={compareB}
                  onChange={(e) => setCompareB(e.target.value)}
                  className="shadow-sm px-3 py-2.5 border border-gray-300 focus:border-[#2337ff] rounded-lg focus:outline-none focus:ring-[#2337ff]/30 focus:ring-2 min-w-[220px] text-gray-900 text-base"
                >
                  {sortBootsForDisplay(BOOTS).map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.shortName}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="hover:bg-gray-50 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 text-base"
                onClick={() => {
                  setCompareA("aircast-airselect");
                  setCompareB("vacoped");
                }}
              >
                Reset to Aircast vs VACOped
              </button>
            </div>

            {compareA === compareB
              ? (
                <p className="text-amber-950 text-base leading-relaxed">
                  Choose two different boots.
                </p>
              )
              : (
                <div className="gap-6 grid md:grid-cols-2">
                  <CompareColumn boot={bootA} other={bootB} />
                  <CompareColumn boot={bootB} other={bootA} />
                </div>
              )}
          </div>
        )}
      </div>

      <footer className="bg-gray-50 px-4 sm:px-8 py-5 border-gray-100 border-t rounded-b-2xl text-gray-600 text-sm sm:text-base leading-relaxed">
        <strong className="text-gray-800">Medical disclaimer:</strong>{" "}
        Educational only. Boot choice must follow your treating team.{" "}
        <a
          href="/articles/science-of-achilles-tendon-healing"
          className="text-[#2337ff] hover:underline underline-offset-2"
        >
          Healing fundamentals
        </a>{" "}
        ·{" "}
        <a
          href="/articles/plaster-vs-boot"
          className="text-[#2337ff] hover:underline underline-offset-2"
        >
          Cast vs boot
        </a>
      </footer>
    </div>
  );
}

function BootSourcesPanel({ boot }: { boot: BootModel }) {
  return (
    <div className="space-y-4 bg-gray-50/80 px-4 py-4 border border-gray-100 rounded-xl text-base">
      {boot.pricingNote
        ? (
          <p className="m-0 text-gray-700 text-sm sm:text-base leading-relaxed">
            {boot.pricingNote}
          </p>
        )
        : null}
      {boot.verifiedSpecs && boot.verifiedSpecs.length > 0
        ? (
          <div>
            <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Cited specs
            </p>
            <ul className="space-y-2.5 m-0 pl-4 text-gray-800 text-sm sm:text-base leading-relaxed list-disc">
              {boot.verifiedSpecs.map((s) => (
                <li key={s.label}>
                  <span className="font-medium text-gray-900">{s.label}:</span>
                  {" "}
                  {s.value}{" "}
                  <a
                    href={s.citation.url}
                    className="text-[#2337ff] hover:underline underline-offset-2 break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ({s.citation.label})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
        : null}
      <div>
        <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
          Manufacturer / product
        </p>
        <ul className="space-y-1.5 m-0 pl-4 text-sm sm:text-base list-disc leading-relaxed">
          {boot.manufacturerSources.map((s) => (
            <li key={s.url} className="break-words">
              <a
                href={s.url}
                className="text-[#2337ff] hover:underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {boot.priceCitations.length > 0
        ? (
          <div>
            <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Price snapshots ({boot.priceChecked})
            </p>
            <ul className="space-y-1.5 m-0 pl-4 text-sm sm:text-base list-disc leading-relaxed">
              {boot.priceCitations.map((s) => (
                <li key={s.url} className="break-words">
                  <a
                    href={s.url}
                    className="text-[#2337ff] hover:underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
        : null}
      {boot.clinicalReferences && boot.clinicalReferences.length > 0
        ? (
          <div>
            <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Clinical references
            </p>
            <ul className="space-y-1.5 m-0 pl-4 text-sm sm:text-base list-disc leading-relaxed">
              {boot.clinicalReferences.map((s) => (
                <li key={s.url} className="break-words">
                  <a
                    href={s.url}
                    className="text-[#2337ff] hover:underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
        : null}
    </div>
  );
}

function TabButton({
  children,
  icon,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-base font-medium transition-colors",
        isActive
          ? "bg-[#2337ff] text-white shadow-md"
          : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300",
      ].join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}

function CompareColumn({ boot, other }: { boot: BootModel; other: BootModel }) {
  return (
    <div className="bg-white shadow-sm p-6 sm:p-7 border-2 border-gray-200 rounded-xl">
      <h3 className="font-bold text-gray-900 text-xl leading-snug">{boot.fullName}</h3>
      <p className="mt-3 text-gray-700 text-base leading-relaxed">{boot.summary}</p>
      <dl className="space-y-3 m-0 mt-6 text-base leading-relaxed">
        <Row label="Compared with" value={other.shortName} />
        <Row label="Family" value={bootFamilyLabel(boot.family)} />
        <Row label="Mechanism" value={boot.mechanism} />
        <Row label="Cost (UK)" value={boot.costUK} />
        <Row label="Cost (US)" value={boot.costUS} />
        <Row label="Weight feel" value={boot.weightFeel} />
        <Row label="Water / shower" value={boot.waterproof} />
        <Row label="Availability" value={boot.availability} />
      </dl>
      <div className="gap-5 grid sm:grid-cols-2 mt-6">
        <div>
          <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Pros
          </p>
          <ul className="space-y-2 m-0 pl-4 text-gray-800 text-base leading-relaxed list-disc">
            {boot.pros.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div>
          <p className="mb-2 font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Cautions
          </p>
          <ul className="space-y-2 m-0 pl-4 text-gray-800 text-base leading-relaxed list-disc">
            {boot.cautions.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
      <div className="mt-6 pt-4 border-gray-100 border-t">
        <BootSourcesPanel boot={boot} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 pb-2 border-gray-100 last:border-0 border-b">
      <dt className="m-0 font-medium text-gray-600 shrink-0">{label}</dt>
      <dd className="m-0 text-gray-900 text-right font-normal">{value}</dd>
    </div>
  );
}
