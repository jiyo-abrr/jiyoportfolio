import { Github, Globe, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";

export const Projects = () => (
  <SectionWrapper>
    <section id="projects" className="py-10 space-y-12">
      <div className="flex flex-col gap-2">
        <span className="section-title">03. Selected Works</span>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Selected Works</h2>
        <p className="text-muted-foreground text-lg">Key projects and architectural implementations.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {[
          {
            title: "TAKLUBAN",
            type: "Machine Learning / NLP",
            description: "Advanced NLP-driven profanity detection for Filipino languages. Built with Python and Flask, achieving 85.5% accuracy across three dialects using custom part-of-speech tagging and N-gram analysis.",
            tags: ["Python", "Flask", "React", "NLP", "Machine Learning"],
            github: "#",
            demo: "#",
            metrics: [
              { label: "Accuracy", value: "85.5%" },
              { label: "Latencies", value: "<150ms" }
            ],
            architecture: "Flask API + NLTK + Scikit-learn"
          },
          {
            title: "W.AIS",
            type: "Financial AI",
            description: "A comprehensive finance-focused AI ecosystem utilizing the Gemini API. Features predictive budget planning, transaction management, and automated financial insights built on a high-performance Next.js foundation.",
            tags: ["Next.js", "Gemini API", "Supabase", "Prisma", "Clerk"],
            github: "#",
            demo: "#",
            metrics: [
              { label: "Response", value: "AI-driven" },
              { label: "Uptime", value: "99.9%" }
            ],
            architecture: "Next.js 14 + Edge Functions + Supabase"
          }
        ].map((project, idx) => (
          <div key={idx} className="group relative glass rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12">
              
              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[9px] md:text-[10px] uppercase tracking-widest font-semibold inline-block">
                      {project.type}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-mono text-muted-foreground/60 uppercase tracking-tighter">
                      {project.architecture}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 md:gap-8">
                  {project.metrics?.map((m, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">{m.label}</span>
                      <span className="text-lg md:text-xl font-medium text-primary">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 md:px-3 md:py-1 bg-background border border-border/50 text-[10px] md:text-xs text-muted-foreground rounded-full font-medium shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 md:gap-6 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/50 lg:pl-12">
                <a href={project.github} className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-all group/link bg-background/50 px-6 py-3 rounded-full border border-border/50 w-full justify-between shadow-sm hover:shadow-md">
                  <span className="flex items-center gap-2"><Github className="h-4 w-4" /> Source Code</span>
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                </a>
                <a href={project.demo} className="flex items-center gap-3 text-sm font-medium text-background bg-foreground hover:bg-primary transition-all group/link px-6 py-3 rounded-full w-full justify-between shadow-md hover:shadow-lg">
                  <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Live Preview</span>
                  <ArrowUpRight className="h-4 w-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  </SectionWrapper>
);
