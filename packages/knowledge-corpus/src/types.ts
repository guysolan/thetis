export type ContentType =
  | "lesson"
  | "guide"
  | "blog"
  | "article"
  | "faq"
  | "research"
  | "rule";

export type Condition =
  | "achilles-rupture"
  | "plantar-fasciitis"
  | "achilles-tendinitis"
  | "insertional-achilles-tendonitis"
  | "general";

export interface ChunkMetadata {
  /** Repo-relative path of the source file */
  source_path: string;
  content_type: ContentType;
  condition: Condition;
  /** Human-readable title of the parent document */
  title: string;
  /** Recovery phase / section slug where applicable (e.g. "03-boot-phase", "weeks-7-9") */
  phase?: string;
  language: string;
  /** Canonical clinical content (true) vs style/derived content (false) */
  canonical: boolean;
  /** DOI/source URLs cited by the chunk, where available */
  references?: string[];
}

export interface Chunk {
  /** Stable id: source path + ordinal, e.g. "apps/course/.../wedge-removal.tsx#2" */
  id: string;
  text: string;
  metadata: ChunkMetadata;
}

export interface ChunkRow {
  id: string;
  content: string;
  content_hash: string;
  embedding?: number[];
  source_path: string;
  content_type: ContentType;
  condition: Condition;
  canonical: boolean;
  metadata: ChunkMetadata;
}
