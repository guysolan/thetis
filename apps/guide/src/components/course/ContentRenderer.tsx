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
  CheckCircle2,
  XCircle,
  Info,
  Lightbulb,
  Check,
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
      {items.map((item, i) => (
        <li key={i}>{parseInlineMarkdown(item)}</li>
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
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
    danger: <XCircle className="h-4 w-4" />,
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
      {title && <AlertTitle className={titleStyles[variant]}>{title}</AlertTitle>}
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
    <Accordion type="single" collapsible className="w-full my-6">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left font-semibold">
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
    <Accordion type="single" collapsible className="w-full my-6">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`accordion-${i}`}>
          <AccordionTrigger className="text-left text-lg font-semibold">
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
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                  item.checked
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-slate-300"
                )}
              >
                {item.checked && <Check className="h-3 w-3" />}
              </div>
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
    <Card className="my-6 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardContent className="pt-6 space-y-4">
        <div>
          <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4" />
            Do
          </h4>
          <ul className="space-y-2 text-slate-700">
            {dos.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4" />
            Don't
          </h4>
          <ul className="space-y-2 text-slate-700">
            {donts.map((item, i) => (
              <li key={i}>{parseInlineMarkdown(item)}</li>
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
    <blockquote className="my-6">
      {parseInlineMarkdown(text)}
      {author && (
        <footer className="mt-2 text-sm text-slate-500">— {author}</footer>
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
    <div className="my-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
      <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-semibold text-blue-900 mb-1">{title}</p>}
        <p className="text-blue-800">{parseInlineMarkdown(content)}</p>
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
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100">
            {headers.map((header, i) => (
              <th
                key={i}
                className="border border-slate-200 px-4 py-2 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {row.map((cell, j) => (
                <td key={j} className="border border-slate-200 px-4 py-2">
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
    highlight: "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
    muted: "bg-slate-50",
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
        <ContentBlockRenderer key={i} block={block} />
      ))}
    </section>
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
      return <ChecklistBlockComponent title={block.title} items={block.items} />;
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
      return <SectionBlockComponent title={block.title} content={block.content} />;
    default:
      return null;
  }
}

// Main content renderer
export function ContentRenderer({ content }: { content: SectionContent }) {
  return (
    <div className="prose-course space-y-6">
      {content.intro && (
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
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

