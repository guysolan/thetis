import type { ContentBlock, SectionContent } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@thetis/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@thetis/ui/alert";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  CheckSquare,
  Info,
  Lightbulb,
  Square,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Parse simple markdown: **bold** and *italic*
function parseInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function TextBlockComponent({ content }: { content: string }) {
  return <p>{parseInlineMarkdown(content)}</p>;
}

function HeadingBlockComponent({
  level,
  text,
}: {
  level: 2 | 3 | 4;
  text: string;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag>{text}</Tag>;
}

function ListBlockComponent({
  style,
  items,
}: {
  style: "bullet" | "numbered";
  items: string[];
}) {
  const Tag = style === "numbered" ? "ol" : "ul";
  return (
    <Tag>
      {items.map((item, i) => <li key={i}>{parseInlineMarkdown(item)}</li>)}
    </Tag>
  );
}

function AlertBlockComponent({
  variant,
  title,
  content,
}: {
  variant: "info" | "warning" | "success" | "danger";
  title?: string;
  content: string;
}) {
  const icons = {
    info: <Info className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    success: <CheckCircle2 className="w-4 h-4" />,
    danger: <XCircle className="w-4 h-4" />,
  };

  const styles = {
    info: "border-blue-200 bg-blue-50 [&>svg]:text-blue-600",
    warning: "border-amber-200 bg-amber-50 [&>svg]:text-amber-600",
    success: "border-green-200 bg-green-50 [&>svg]:text-green-600",
    danger: "border-red-200 bg-red-50 [&>svg]:text-red-600",
  };

  const titleStyles = {
    info: "text-blue-800",
    warning: "text-amber-800",
    success: "text-green-800",
    danger: "text-red-800",
  };

  const contentStyles = {
    info: "text-blue-700",
    warning: "text-amber-700",
    success: "text-green-700",
    danger: "text-red-700",
  };

  return (
    <Alert className={cn("my-6", styles[variant])}>
      {icons[variant]}
      {title && (
        <AlertTitle className={titleStyles[variant]}>{title}</AlertTitle>
      )}
      <AlertDescription className={contentStyles[variant]}>
        {parseInlineMarkdown(content)}
      </AlertDescription>
    </Alert>
  );
}

function FAQBlockComponent({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="my-6 w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="font-semibold text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="prose-course">
            {parseInlineMarkdown(item.answer)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AccordionBlockComponent({
  items,
}: {
  items: { title: string; content: ContentBlock[] }[];
}) {
  return (
    <Accordion type="single" collapsible className="my-6 w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`accordion-${i}`}>
          <AccordionTrigger className="font-semibold text-lg text-left">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="prose-course">
            {item.content.map((block, j) => (
              <ContentBlockRenderer key={j} block={block} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function ChecklistBlockComponent({
  title,
  items,
}: {
  title?: string;
  items: { text: string; checked?: boolean }[];
}) {
  return (
    <Card className="my-6">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "" : "pt-6"}>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              {item.checked
                ? (
                  <CheckSquare className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                )
                : (
                  <CheckSquare className="mt-0.5 w-5 h-5 text-muted-foreground shrink-0" />
                )}
              <span>{parseInlineMarkdown(item.text)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function DosDontsBlockComponent({
  dos,
  donts,
}: {
  dos: string[];
  donts: string[];
}) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-background my-6 border-primary/20">
      <CardContent className="space-y-4 pt-6">
        <div>
          <h4 className="flex items-center gap-2 mb-2 font-semibold text-green-800">
            <CheckCircle2 className="w-4 h-4" />
            Do
          </h4>
          <ul className="space-y-2 text-foreground/80">
            {dos.map((item, i) => <li key={i}>{parseInlineMarkdown(item)}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="flex items-center gap-2 mb-2 font-semibold text-red-800">
            <XCircle className="w-4 h-4" />
            Don't
          </h4>
          <ul className="space-y-2 text-foreground/80">
            {donts.map((item, i) => <li key={i}>{parseInlineMarkdown(item)}
            </li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function QuoteBlockComponent({
  text,
  author,
}: {
  text: string;
  author?: string;
}) {
  return (
    <blockquote className="my-6">
      {parseInlineMarkdown(text)}
      {author && (
        <footer className="mt-2 text-muted-foreground text-sm">
          — {author}
        </footer>
      )}
    </blockquote>
  );
}

function TipBlockComponent({
  title,
  content,
}: {
  title?: string;
  content: string;
}) {
  return (
    <div className="flex gap-3 bg-primary/10 my-6 p-4 border border-primary/20 rounded-lg">
      <Lightbulb className="mt-0.5 w-5 h-5 text-primary shrink-0" />
      <div>
        {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
        <p className="text-foreground/80">{parseInlineMarkdown(content)}</p>
      </div>
    </div>
  );
}

function TableBlockComponent({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-2 border border-border font-semibold text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 border border-border">
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardBlockComponent({
  title,
  description,
  content,
  variant = "default",
}: {
  title: string;
  description?: string;
  content: ContentBlock[];
  variant?: "default" | "highlight" | "muted";
}) {
  const variantStyles = {
    default: "",
    highlight:
      "border-primary/20 bg-gradient-to-br from-primary/5 to-background",
    muted: "bg-muted/50",
  };

  return (
    <Card className={cn("my-6", variantStyles[variant])}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="prose-course">
        {content.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </CardContent>
    </Card>
  );
}

function SectionBlockComponent({
  title,
  content,
}: {
  title?: string;
  content: ContentBlock[];
}) {
  return (
    <section className="my-8">
      {title && <h2>{title}</h2>}
      {content.map((block, i) => (
        <ContentBlockRenderer
          key={i}
          block={block}
        />
      ))}
    </section>
  );
}

function ImageBlockComponent({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="shadow-md rounded-xl w-full"
      />
      {caption && (
        <figcaption className="mt-3 text-muted-foreground text-sm text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function IllustrationPromptBlockComponent({
  title,
  prompt,
  filename_suggestion,
  alt_text,
  notes,
}: {
  title: string;
  prompt: string;
  filename_suggestion?: string;
  alt_text?: string;
  notes?: string;
}) {
  return (
    <Card className="bg-primary/5 my-6 border-2 border-primary/30 border-dashed">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Illustration to generate: {title}
        </CardTitle>
        <CardDescription>
          Copy/paste the prompt below into your image generator.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-background p-4 border border-border rounded-lg">
          <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wide">
            Image prompt
          </p>
          <pre className="text-sm leading-relaxed whitespace-pre-wrap">
            {prompt}
          </pre>
        </div>

        {(filename_suggestion || alt_text) && (
          <div className="gap-3 grid md:grid-cols-2">
            {filename_suggestion && (
              <div className="bg-background p-4 border border-border rounded-lg">
                <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wide">
                  Suggested filename
                </p>
                <p className="font-mono text-sm">{filename_suggestion}</p>
              </div>
            )}
            {alt_text && (
              <div className="bg-background p-4 border border-border rounded-lg">
                <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wide">
                  Suggested alt text
                </p>
                <p className="text-sm">{alt_text}</p>
              </div>
            )}
          </div>
        )}

        {notes && (
          <div className="bg-background p-4 border border-border rounded-lg">
            <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wide">
              Notes
            </p>
            <p className="text-sm">{notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Main block renderer
function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlockComponent content={block.content} />;
    case "heading":
      return <HeadingBlockComponent level={block.level} text={block.text} />;
    case "list":
      return <ListBlockComponent style={block.style} items={block.items} />;
    case "alert":
      return (
        <AlertBlockComponent
          variant={block.variant}
          title={block.title}
          content={block.content}
        />
      );
    case "faq":
      return <FAQBlockComponent items={block.items} />;
    case "accordion":
      return <AccordionBlockComponent items={block.items} />;
    case "checklist":
      return (
        <ChecklistBlockComponent
          title={block.title}
          items={block.items}
        />
      );
    case "dos-donts":
      return <DosDontsBlockComponent dos={block.dos} donts={block.donts} />;
    case "quote":
      return <QuoteBlockComponent text={block.text} author={block.author} />;
    case "tip":
      return <TipBlockComponent title={block.title} content={block.content} />;
    case "table":
      return <TableBlockComponent headers={block.headers} rows={block.rows} />;
    case "card":
      return (
        <CardBlockComponent
          title={block.title}
          description={block.description}
          content={block.content}
          variant={block.variant}
        />
      );
    case "section":
      return (
        <SectionBlockComponent title={block.title} content={block.content} />
      );
    case "image":
      return (
        <ImageBlockComponent
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      );
    case "illustration-prompt":
      return (
        <IllustrationPromptBlockComponent
          title={block.title}
          prompt={block.prompt}
          filename_suggestion={block.filename_suggestion}
          alt_text={block.alt_text}
          notes={block.notes}
        />
      );
    default:
      return null;
  }
}

// Main content renderer
export function ContentRenderer({ content }: { content: SectionContent }) {
  return (
    <div className="space-y-6 prose-course">
      {content.intro && (
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          {parseInlineMarkdown(content.intro)}
        </p>
      )}
      {content.blocks.map((block, i) => (
        <ContentBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

export { ContentBlockRenderer };
