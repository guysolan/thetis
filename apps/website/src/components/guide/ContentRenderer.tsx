import type { ContentBlock, GuideContent } from "./types";
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
  CheckCircle2,
  CheckSquare,
  Info,
  Lightbulb,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Parse simple markdown: **bold**, *italic*, and [link text](url)
function parseInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    // Match markdown links: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          className="text-primary hover:text-primary/80 underline"
        >
          {linkText}
        </a>
      );
    }
    return part;
  });
}

function TextBlockComponent({ content }: { content: string }) {
  return (
    <p className="mb-6 text-neutral-600 leading-relaxed">
      {parseInlineMarkdown(content)}
    </p>
  );
}

function HeadingBlockComponent({
  level,
  text,
}: {
  level: 2 | 3 | 4;
  text: string;
}) {
  const styles = {
    2: "text-xl font-bold text-neutral-900 mt-10 mb-4 pb-2 border-b border-neutral-200",
    3: "text-lg font-semibold text-neutral-800 mt-8 mb-3",
    4: "text-base font-semibold text-neutral-700 mt-6 mb-2",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={styles[level]}>{text}</Tag>;
}

function ListBlockComponent({
  style,
  items,
}: {
  style: "bullet" | "numbered";
  items: string[];
}) {
  const Tag = style === "numbered" ? "ol" : "ul";
  const listStyles = style === "numbered" ? "list-decimal" : "list-disc";

  return (
    <Tag className={cn("space-y-2 mb-6 pl-5", listStyles)}>
      {items.map((item, i) => (
        <li key={i} className="pl-1 text-neutral-600 leading-relaxed">
          {parseInlineMarkdown(item)}
        </li>
      ))}
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
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
    success: <CheckCircle2 size={20} />,
    danger: <XCircle size={20} />,
  };

  const styles = {
    info: "border-blue-200 bg-blue-50 [&>svg]:text-blue-600",
    warning: "border-amber-200 bg-amber-50 [&>svg]:text-amber-600",
    success: "border-green-200 bg-green-50 [&>svg]:text-green-600",
    danger: "border-red-200 bg-red-50 [&>svg]:text-red-600",
  };

  const titleStyles = {
    info: "text-blue-800 font-semibold",
    warning: "text-amber-800 font-semibold",
    success: "text-green-800 font-semibold",
    danger: "text-red-800 font-semibold",
  };

  const contentStyles = {
    info: "text-blue-700",
    warning: "text-amber-700",
    success: "text-green-700",
    danger: "text-red-700",
  };

  return (
    <Alert
      className={cn("flex lg:flex-row flex-col gap-2 my-6", styles[variant])}
    >
      <div className={cn("w-6 h-6", titleStyles[variant])}>
        {icons[variant]}
      </div>
      <div
        className={cn(
          "flex flex-col justify-start items-start gap-1",
        )}
      >
        {title && (
          <AlertTitle className={titleStyles[variant]}>{title}</AlertTitle>
        )}
        <AlertDescription className={contentStyles[variant]}>
          {parseInlineMarkdown(content)}
        </AlertDescription>
      </div>
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
          <AccordionTrigger className="font-semibold text-neutral-800 text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-neutral-600">
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
          <AccordionTrigger className="font-semibold text-neutral-800 text-lg text-left">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
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
              <CheckSquare
                className={cn(
                  "mt-0.5 w-5 h-5 shrink-0",
                  item.checked ? "text-primary" : "text-neutral-400",
                )}
              />
              <span className="text-neutral-600">
                {parseInlineMarkdown(item.text)}
              </span>
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
          <h4 className="flex items-center gap-2 mb-3 font-semibold text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            Do
          </h4>
          <ul className="space-y-2">
            {dos.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-neutral-600">
                <span className="mt-1 text-green-600">•</span>
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-4 border-neutral-200 border-t">
          <h4 className="flex items-center gap-2 mb-3 font-semibold text-red-700">
            <XCircle className="w-5 h-5" />
            Don't
          </h4>
          <ul className="space-y-2">
            {donts.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-neutral-600">
                <span className="mt-1 text-red-600">•</span>
                {parseInlineMarkdown(item)}
              </li>
            ))}
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
    <blockquote className="my-6 pl-4 border-primary/30 border-l-4 text-neutral-600 italic">
      <p className="mb-2">{parseInlineMarkdown(text)}</p>
      {author && (
        <footer className="text-neutral-500 text-sm not-italic">
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
    <div className="flex gap-3 bg-primary/5 my-6 p-4 border border-primary/20 rounded-lg">
      <Lightbulb className="mt-0.5 w-5 h-5 text-primary shrink-0" />
      <div>
        {title && <p className="mb-1 font-semibold text-neutral-800">{title}
        </p>}
        <p className="text-neutral-600">{parseInlineMarkdown(content)}</p>
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
    <div className="my-6 border border-neutral-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 border-neutral-200 border-b font-semibold text-neutral-700 text-left"
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
              className={i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 border-neutral-100 border-b text-neutral-600"
                >
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
    muted: "bg-neutral-50",
  };

  return (
    <Card className={cn("my-6", variantStyles[variant])}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
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
      {title && (
        <h2 className="mb-4 pb-2 border-neutral-200 border-b font-bold text-neutral-900 text-xl">
          {title}
        </h2>
      )}
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
        className="shadow-sm rounded-lg w-full"
      />
      {caption && (
        <figcaption className="mt-3 text-neutral-500 text-sm text-center">
          {caption}
        </figcaption>
      )}
    </figure>
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
    default:
      return null;
  }
}

// Main content renderer
export function ContentRenderer({ content }: { content: GuideContent }) {
  return (
    <div className="guide-content">
      {content.intro && (
        <p className="mb-8 text-neutral-600 text-lg leading-relaxed">
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
