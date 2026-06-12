/** Internal audience mapping — always apply unless custom instructions override. */
export const PLATFORM_AUDIENCES: Record<string, string> = {
  linkedin:
    "Clinicians — orthopaedic surgeons, physiotherapists, sports medicine professionals",
  instagram: "Patients",
  facebook: "Patients",
  website: "Patients (website blog readers)",
};

export function platformAudienceBlock(platforms?: string[]): string {
  if (!platforms?.length) {
    return `## PLATFORM AUDIENCES (internal — always respect)
- linkedin: ${PLATFORM_AUDIENCES.linkedin}
- instagram: ${PLATFORM_AUDIENCES.instagram}
- facebook: ${PLATFORM_AUDIENCES.facebook}
- website: ${PLATFORM_AUDIENCES.website}`;
  }

  const lines = platforms.map(
    (p) => `- ${p}: ${PLATFORM_AUDIENCES[p] ?? "Unknown platform"}`,
  );
  return `## PLATFORM AUDIENCES (internal — always respect)\n${
    lines.join("\n")
  }`;
}

export function formatPlatformContext(
  platforms?: string[],
  postType?: string,
): string {
  const parts: string[] = [];
  if (platforms?.length) {
    parts.push(
      `Platforms: ${platforms.join(", ")}`,
      ...platforms.map((p) => {
        const audience = PLATFORM_AUDIENCES[p];
        return audience ? `${p} audience: ${audience}` : null;
      }).filter(Boolean) as string[],
    );
  }
  if (postType) parts.push(`Post type: ${postType}`);
  return parts.join("\n");
}
