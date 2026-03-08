"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Code, Server } from "lucide-react";
import { Terminal } from "@/components/features/Terminal";
import { ABOUT_CONTENT } from "@/lib/data/about";

export const About = () => {
  const icons = {
    Code: <Code className="h-6 w-6" />,
    Server: <Server className="h-6 w-6" />,
  };

  return (
    <SectionWrapper>
      <section id="about" className="space-y-10 md:space-y-12 py-10">
        <div className="flex flex-col gap-2">
          <span className="section-title">{ABOUT_CONTENT.subtitle}</span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight">{ABOUT_CONTENT.title}</h2>
          <p className="text-muted-foreground text-base md:text-lg font-light">{ABOUT_CONTENT.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Text Block */}
          <div className="md:col-span-2 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col justify-center gap-6 hover:border-primary/30 transition-all duration-500">
            <h3 className="text-xl md:text-3xl font-medium leading-relaxed tracking-tight">
              Passionate about <span className="text-primary italic">{ABOUT_CONTENT.highlight.italic}</span> and <span className="text-primary font-medium">{ABOUT_CONTENT.highlight.bold}</span>.
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
              {ABOUT_CONTENT.detailedDescription}
            </p>
          </div>

          {/* Stats */}
          {ABOUT_CONTENT.stats.map((stat) => (
            <div key={stat.id} className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col justify-between gap-8 hover:border-primary/30 transition-all duration-500">
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {icons[stat.icon as keyof typeof icons]}
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-medium tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}

          {/* Terminal Component */}
          <div className="md:col-span-2 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
            <Terminal />
          </div>

        </div>
      </section>
    </SectionWrapper>
  );
};
