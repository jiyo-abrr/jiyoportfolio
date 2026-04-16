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
      <section id="projects" className="py-10 space-y-12">
        <div className="flex flex-col gap-2">
          <span className="section-title">{PROJECTS_CONTENT.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">{PROJECTS_CONTENT.title}</h2>
          <p className="text-muted-foreground text-lg">{PROJECTS_CONTENT.description}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="group relative glass rounded-2xl overflow-hidden transition-all duration-700 
              hover:border-primary/90 
              outline outline-[1px] outline-primary/30 dark:outline-primary/10 outline-offset-2 
              hover:outline-offset-4 md:hover:outline-offset-8 hover:outline-primary/70
              hover:!shadow-[0_0_20px_rgba(var(--primary-rgb),0.8),0_0_40px_rgba(var(--primary-rgb),0.4),inset_0_0_15px_rgba(var(--primary-rgb),0.3)]
              bg-gradient-to-br from-background/80 via-background/40 to-primary/5"
            >
              
              {/* Subtle Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(rgba(var(--primary-rgb),0.5)_1px,transparent_1px)]" />
              
              <div className="relative p-6 md:p-12 space-y-6 md:space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[9px] md:text-[10px] uppercase tracking-widest font-bold inline-block">
                        {project.type}
                      </span>
                      <span className="text-[10px] md:text-xs font-mono text-muted-foreground/40 uppercase tracking-widest">
                        {project.architecture}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-5xl font-medium tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                  </div>

                  {project.isPrivate && (
                    <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/60 font-mono text-[9px] md:text-[10px] uppercase tracking-widest self-start md:self-auto">
                      <Lock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      <span>Access Restricted</span>
                    </div>
                  )}
                </div>

                {/* Body Section */}
                <div className="max-w-4xl">
                  <p className="text-muted-foreground font-light text-base md:text-xl leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer Section: Metrics & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 pt-8 md:pt-10 border-t border-primary/10">
                  {/* Metrics */}
                  <div className="lg:col-span-8 grid grid-cols-2 md:flex md:flex-wrap items-center gap-x-8 md:gap-x-12 gap-y-6">
                    {project.metrics?.map((m, i) => (
                      <div key={i} className="flex flex-col gap-1 md:gap-1.5 min-w-[100px]">
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/40">{m.label}</span>
                        <span className="text-lg md:text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-500">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags & Action */}
                  <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6 md:gap-8">
                    <div className="flex flex-wrap lg:justify-end gap-1.5 md:gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 md:px-3 md:py-1 bg-secondary/30 border border-primary/5 text-[9px] md:text-xs text-muted-foreground/80 rounded-lg font-medium tracking-tight">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={project.github} 
                      className={`flex items-center gap-4 text-xs md:text-sm font-semibold transition-all duration-500 px-6 py-2.5 md:px-8 md:py-3 rounded-xl border w-full md:w-auto justify-center md:justify-between shadow-sm hover:shadow-primary/10 ${project.isPrivate 
                        ? 'bg-secondary/40 border-primary/10 text-muted-foreground/70 hover:text-primary hover:border-primary/40 hover:bg-primary/5' 
                        : 'bg-primary border-primary text-primary-foreground hover:bg-primary/90'
                      }`} 
                      target={project.isPrivate ? undefined : "_blank"} 
                      rel={project.isPrivate ? undefined : "noopener noreferrer"}
                    >
                      <span className="flex items-center gap-3">
                        {project.isPrivate ? (
                          <Lock className={`h-3.5 w-3.5 md:h-4 md:w-4 transition-opacity duration-700 ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                        ) : (
                          <Github className={`h-3.5 w-3.5 md:h-4 md:w-4 transition-opacity duration-700 ${hasHydrated ? "opacity-100" : "opacity-0"}`} /> 
                        )}
                        {project.isPrivate ? "Private Repository" : "View Source"}
                      </span>
                      {!project.isPrivate && (
                        <ArrowUpRight className={`h-3.5 w-3.5 md:h-4 md:w-4 opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all ${hasHydrated ? "opacity-100" : "opacity-0"}`} />
                      )}
                    </a>
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
