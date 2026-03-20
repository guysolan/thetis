export interface ImageContext {
  imagePath: string;
  imageFilename: string;
  lessonFile: string;
  lessonTitle: string;
  lessonDescription: string;
  lessonContent: string;
  lessonFaqs: string;
  imageExists: boolean;
}

export interface GeneratedContent {
  blog: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export interface JudgeFeedback {
  winner: "openai" | "gemini" | "combined";
  feedback: string;
  synthesized: GeneratedContent;
}
