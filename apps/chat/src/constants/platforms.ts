import type { Platform } from "@/api/knowledge";

export const PLATFORMS: {
  value: Platform;
  label: string;
  audience: string;
}[] = [
  {
    value: "linkedin",
    label: "LinkedIn",
    audience: "Clinicians",
  },
  {
    value: "instagram",
    label: "Instagram",
    audience: "Patients",
  },
  {
    value: "facebook",
    label: "Facebook",
    audience: "Patients",
  },
  {
    value: "website",
    label: "Website blog",
    audience: "Patients",
  },
];

export const PLATFORM_AUDIENCE_NOTE =
  "LinkedIn → clinicians. Instagram, Facebook, and website blog → patients.";

export function formatPlatforms(platforms: Platform[]): string {
  if (!platforms.length) return "No platforms";
  return platforms
    .map((p) => PLATFORMS.find((x) => x.value === p)?.label ?? p)
    .join(", ");
}
