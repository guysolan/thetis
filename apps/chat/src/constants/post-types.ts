export const POST_TYPES = [
  { value: "clinical_tip", label: "Clinical tip" },
  { value: "research_summary", label: "Research summary" },
  { value: "patient_education", label: "Patient education" },
  { value: "product", label: "Product" },
  { value: "community", label: "Community / engagement" },
  { value: "review", label: "Review" },
  { value: "general", label: "General" },
] as const;

export type PostType = (typeof POST_TYPES)[number]["value"];
