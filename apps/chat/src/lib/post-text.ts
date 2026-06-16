function pickString(
  obj: Record<string, unknown>,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    for (const [k, v] of Object.entries(obj)) {
      if (
        k.toLowerCase().replace(/[\s_-]/g, "") ===
          key.toLowerCase().replace(/[\s_-]/g, "") &&
        typeof v === "string" &&
        v.trim()
      ) {
        return v.trim();
      }
    }
  }
  return undefined;
}

function formatSlideObject(
  slide: Record<string, unknown>,
  index: number,
): string | undefined {
  const slideLabel = pickString(slide, ["slide"]) ??
    (typeof slide.slide === "number"
      ? `Slide ${slide.slide}`
      : `Slide ${index + 1}`);

  const series = pickString(slide, ["serieslabel", "series_label", "series"]);
  const headline = pickString(slide, [
    "headline",
    "title",
    "hook",
    "heading",
  ]);
  const body = pickString(slide, [
    "body",
    "text",
    "content",
    "copy",
    "bullets",
    "subtext",
    "description",
    "subtitle",
    "summary",
  ]);
  const visual = pickString(slide, [
    "visual",
    "visualdirection",
    "visual_direction",
    "image",
    "photo",
  ]);

  if (headline && body && !visual && !series) {
    return `${headline}\n${body}`;
  }
  if (headline && !body && !visual && !series) {
    return headline;
  }

  const parts: string[] = [`[${slideLabel}]`];
  if (series) parts.push(`Series label: ${series}`);
  if (headline) parts.push(`Headline: ${headline}`);
  if (body) parts.push(`Body: ${body}`);
  if (visual) parts.push(`Visual: ${visual}`);

  if (parts.length > 1) return parts.join("\n");

  const lines = Object.entries(slide)
    .filter(([, v]) => typeof v === "string" && v.trim())
    .map(([k, v]) => `${k}: ${(v as string).trim()}`);
  return lines.length ? lines.join("\n") : undefined;
}

function formatSlideItem(item: unknown, index: number): string | undefined {
  if (typeof item === "string") {
    const trimmed = item.trim();
    return trimmed || undefined;
  }
  if (item && typeof item === "object" && !Array.isArray(item)) {
    return formatSlideObject(item as Record<string, unknown>, index);
  }
  return undefined;
}

function appendCaptionParts(
  obj: Record<string, unknown>,
  parts: string[],
): void {
  const captions: [string, string[]][] = [
    ["Instagram caption", ["instagramcaption", "instagram_caption", "caption"]],
    ["Facebook caption", ["facebookcaption", "facebook_caption"]],
    ["Carousel summary", ["carouselsummary", "carousel_summary", "summary"]],
    ["Notes", ["notes"]],
  ];

  for (const [label, keys] of captions) {
    const text = pickString(obj, keys);
    if (text) parts.push(`[${label}]\n${text}`);
  }
}

/** Coerce model output into displayable post text (handles carousel slides, etc.). */
export function postText(value: unknown): string | undefined {
  if (value == null) return undefined;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || undefined;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const text = value
      .map((item, i) => formatSlideItem(item, i))
      .filter(Boolean)
      .join("\n\n---\n\n")
      .trim();
    return text || undefined;
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const parts: string[] = [];

    if (Array.isArray(obj.slides)) {
      const slides = postText(obj.slides);
      if (slides) parts.push(slides);
    }

    appendCaptionParts(obj, parts);

    for (const key of ["caption", "text", "content", "body"] as const) {
      const text = pickString(obj, [key]);
      if (text && !parts.some((p) => p.includes(text))) {
        parts.push(`${key === "caption" ? "Caption" : "Text"}:\n${text}`);
      }
    }

    const combined = parts.filter(Boolean).join("\n\n").trim();
    return combined || undefined;
  }

  return undefined;
}

export function normalizeResult<
  T extends {
    post?: unknown;
    slides?: unknown;
    carousel?: unknown;
    draft?: unknown;
  },
>(
  result: T,
): T & { post?: string } {
  const text = postText(result.post) ??
    postText({
      slides: (result as Record<string, unknown>).slides,
      caption: (result as Record<string, unknown>).caption,
      instagram_caption: (result as Record<string, unknown>).instagram_caption,
      facebook_caption: (result as Record<string, unknown>).facebook_caption,
      carousel_summary: (result as Record<string, unknown>).carousel_summary,
    }) ??
    postText(result.slides) ??
    postText(result.carousel) ??
    postText(result.draft);
  return text ? { ...result, post: text } : result;
}
