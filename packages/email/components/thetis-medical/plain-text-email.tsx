import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Font,
} from "@react-email/components";

interface PlainTextEmailProps {
  subject?: string;
  body: string;
  previewText?: string;
  fontFamily?: string;
}

export const PlainTextEmail = ({
  subject,
  body,
  previewText,
  fontFamily = "system-ui, -apple-system, 'Segoe UI', 'Roboto', sans-serif",
}: PlainTextEmailProps) => {
  // Split body into paragraphs on double newlines
  const paragraphs = body.trim().split("\n\n");

  return (
    <Html>
      <Head>
        <title>{subject}</title>
        <Font
          fontFamily={fontFamily}
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Preview>{previewText || paragraphs[0]}</Preview>
      <Body style={{ backgroundColor: "#ffffff" }}>
        <Container style={{ margin: "0 auto", padding: "20px 0 48px" }}>
          {paragraphs.map((paragraph, i) => (
            <Text
              key={i}
              style={{
                fontFamily,
                fontSize: "14px",
                lineHeight: "24px",
                color: "#333333",
                marginBottom: "8px",
                whiteSpace: "pre-line", // Preserves line breaks within paragraphs
              }}
            >
              {paragraph}
            </Text>
          ))}
        </Container>
      </Body>
    </Html>
  );
};

export default PlainTextEmail;
