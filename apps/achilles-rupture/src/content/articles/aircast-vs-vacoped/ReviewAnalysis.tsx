import { useEffect, useState } from "react";
import aircastReviews from "./aircast-reviews.json";
import vacopedReviews from "./vacoped-reviews.json";

interface Review {
  author: string;
  rating: number;
  title: string;
  date: string;
  location: string;
  verified: boolean;
  content: string;
  helpful_votes: number;
}

const ReviewAnalysis = () => {
  const [schema, setSchema] = useState<string>("");

  useEffect(() => {
    const generateSchema = (reviews: Review[]) => {
      const schema = {
        type: "array",
        items: {
          type: "object",
          properties: {
            author: { type: "string" },
            rating: { type: "number" },
            title: { type: "string" },
            date: { type: "string" },
            location: { type: "string" },
            verified: { type: "boolean" },
            content: { type: "string" },
            helpful_votes: { type: "number" },
          },
          required: [
            "author",
            "rating",
            "title",
            "date",
            "location",
            "verified",
            "content",
            "helpful_votes",
          ],
        },
      };
      return JSON.stringify(schema, null, 2);
    };

    // Generate schema from both review sets
    const aircastSchema = generateSchema(aircastReviews);
    const vacopedSchema = generateSchema(vacopedReviews);

    // Combine schemas
    const combinedSchema = {
      aircast: JSON.parse(aircastSchema),
      vacoped: JSON.parse(vacopedSchema),
    };

    setSchema(JSON.stringify(combinedSchema, null, 2));
  }, []);

  if (!schema) return null;

  return null;
};

export default ReviewAnalysis;
