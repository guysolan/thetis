// Content block types for course sections

export interface TextBlock {
  type: "text";
  content: string; // Can include **bold** and *italic* markdown
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

export interface ListBlock {
  type: "list";
  style: "bullet" | "numbered";
  items: string[]; // Can include **bold** markdown
}

export interface AlertBlock {
  type: "alert";
  variant: "info" | "warning" | "success" | "danger";
  title?: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock {
  type: "faq";
  items: FAQItem[];
}

export interface AccordionItem {
  title: string;
  content: ContentBlock[];
}

export interface AccordionBlock {
  type: "accordion";
  items: AccordionItem[];
}

export interface ChecklistItem {
  text: string;
  checked?: boolean;
}

export interface ChecklistBlock {
  type: "checklist";
  title?: string;
  items: ChecklistItem[];
}

export interface DosDontsBlock {
  type: "dos-donts";
  dos: string[];
  donts: string[];
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

export interface TipBlock {
  type: "tip";
  title?: string;
  content: string;
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface CardBlock {
  type: "card";
  title: string;
  description?: string;
  content: ContentBlock[];
  variant?: "default" | "highlight" | "muted";
}

export interface SectionBlock {
  type: "section";
  title?: string;
  content: ContentBlock[];
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface IllustrationPromptBlock {
  type: "illustration-prompt";
  title: string;
  prompt: string;
  filename_suggestion?: string;
  alt_text?: string;
  notes?: string;
}

// Union of all content block types
export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | ListBlock
  | AlertBlock
  | FAQBlock
  | AccordionBlock
  | ChecklistBlock
  | DosDontsBlock
  | QuoteBlock
  | TipBlock
  | TableBlock
  | CardBlock
  | SectionBlock
  | ImageBlock
  | IllustrationPromptBlock;

// Section content definition
export interface SectionContent {
  intro?: string;
  blocks: ContentBlock[];
}
