export type PatentTimelineStatus = "granted" | "filed" | "pending";

export type PatentTimelineStep = {
  year: string;
  title: string;
  detail: string;
  status: PatentTimelineStatus;
};

export const tradePatentPortfolio = [
  {
    label: "UK registered designs",
    detail: "3 registrations — granted 2023",
  },
  {
    label: "US design patents",
    detail: "3 patents — granted 2025",
  },
  {
    label: "US utility patent",
    detail: "Application filed 2024 · examination ongoing",
  },
  {
    label: "European patent (EP)",
    detail: "Pan-European utility application filed 2024 · examination ongoing",
  },
] as const;

export const tradePatentTimelineSteps: PatentTimelineStep[] = [
  {
    year: "2020",
    title: "Design & utility filed",
    detail: "Initial UK design and utility applications filed.",
    status: "filed",
  },
  {
    year: "2022",
    title: "PCT (international) utility",
    detail: "International utility application filed under the Patent Cooperation Treaty.",
    status: "filed",
  },
  {
    year: "2023",
    title: "UK designs registered",
    detail: "Three UK registered designs granted.",
    status: "granted",
  },
  {
    year: "2024",
    title: "US & EU utility filed",
    detail: "United States utility and European (EP) patent applications entered national/regional phase.",
    status: "filed",
  },
  {
    year: "2025",
    title: "US design patents granted",
    detail: "Three US design patents granted.",
    status: "granted",
  },
  {
    year: "2026",
    title: "US & EU utility — examination",
    detail:
      "Final examination responses returned; grant expected late 2026 for US and European utility patents.",
    status: "pending",
  },
];
