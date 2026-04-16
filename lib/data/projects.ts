export interface Project {
  title: string;
  type: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  metrics: { label: string; value: string }[];
  architecture: string;
  isPrivate?: boolean;
}

export const PROJECTS_CONTENT = {
  title: "Projects",
  subtitle: "05. Projects",
  description: "Key projects and architectural implementations."
};

export const PROJECTS: Project[] = [
  {
    title: "TAKLUBAN",
    type: "Machine Learning / NLP",
    description: "Advanced NLP-driven profanity detection for Filipino languages. Built with Python and Flask, achieving 85.5% accuracy across three dialects using custom part-of-speech tagging and N-gram analysis.",
    tags: ["Python", "Flask", "React", "NLP", "Machine Learning"],
    github: "#contact",
    demo: "",
    metrics: [
      { label: "Accuracy", value: "85.5%" },
      { label: "Dataset", value: "3 Dialects" }
    ],
    architecture: "Flask API + NLTK + Scikit-learn",
    isPrivate: true
  },
  {
    title: "W.AIS",
    type: "Financial AI",
    description: "A comprehensive finance-focused AI ecosystem utilizing the Gemini API. Features predictive budget planning, transaction management, and automated financial insights built on a high-performance Next.js foundation.",
    tags: ["Next.js", "Gemini API", "Supabase", "Prisma", "Clerk"],
    github: "#contact",
    demo: "",
    metrics: [
      { label: "Response", value: "AI-driven" },
      { label: "Processing", value: "Real-time" }
    ],
    architecture: "Next.js 14 + Edge Functions + Supabase",
    isPrivate: true
  }
];
