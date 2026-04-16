"use client";

import { Github, Globe, ArrowUpRight, Lock } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PROJECTS, PROJECTS_CONTENT } from "@/lib/data/projects";
import { useState, useEffect } from "react";

export const Projects = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <SectionWrapper>
      <section id="projects" className="py-8 space-y-8">
        <div className="flex flex-col gap-1.5">
          <span className="section-title">{PROJECTS_CONTENT.subtitle}</span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight">{PROJECTS_CONTENT.title}</h2>
          <p className="text-muted-foreground text-sm md:text-lg">{PROJECTS_CONTENT.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="group relative glass rounded-xl overflow-hidden transition-all duration-500
                outline outline-[1px] outline-primary/20 dark:outline-primary/10 outline-offset-2
                hover:outline-offset-4 hover:outline-primary/50
                hover:shadow-[0_0_32px_rgba(var(--primary-rgb),0.12),0_0_64px_rgba(var(--primary-rgb),0.06)]
                bg-gradient-to-br from-background/90 via-background/60 to-primary/[0.03]"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-4 md:p-8 flex flex-col gap-4">
                {/* Header row: badges + index */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-[9px] uppercase tracking-widest font-bold">
                      {project.type}
                    </span>
                    {project.isPrivate && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-red-500/15 bg-red-500/5 text-red-400/60 text-[9px] uppercase tracking-widest font-mono">
                        <Lock className="h-2 w-2" />
                        Private
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground/20 tracking-widest select-none shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title + description */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground/70 text-xs md:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

                {/* Footer */}
                <div className="flex flex-col gap-3">
                  {/* Metrics row */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="flex items-baseline gap-1.5">
                          <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-muted-foreground/35">{m.label}:</span>
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary/20 border border-primary/8 text-[9px] md:text-[10px] text-muted-foreground/55 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-2 pt-1">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-muted-foreground/70 hover:text-primary hover:border-primary/40 hover:bg-primary/10 text-[10px] font-medium transition-all duration-300"
                      >
                        <Globe className={`h-3 w-3 transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <a
                      href={project.github}
                      target={project.isPrivate ? undefined : "_blank"}
                      rel={project.isPrivate ? undefined : "noopener noreferrer"}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-medium transition-all duration-300 ${
                        project.isPrivate
                          ? "border-primary/15 bg-secondary/20 text-muted-foreground/50 hover:text-primary/70 hover:border-primary/30 cursor-default"
                          : "border-primary bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)]"
                      }`}
                    >
                      {project.isPrivate ? (
                        <Lock className={`h-3 w-3 transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                      ) : (
                        <Github className={`h-3 w-3 transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                      )}
                      <span>{project.isPrivate ? "Private Repo" : "View Source"}</span>
                      {!project.isPrivate && (
                        <ArrowUpRight className={`h-2.5 w-2.5 opacity-70 transition-opacity duration-500 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                      )}
                    </a>

                    {/* Architecture — pushed to end */}
                    <p className="ml-auto text-[9px] font-mono text-muted-foreground/25 uppercase tracking-widest hidden sm:block">
                      {project.architecture}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
};
