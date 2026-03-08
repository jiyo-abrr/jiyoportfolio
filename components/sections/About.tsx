import { SectionWrapper } from "@/components/SectionWrapper";
import { Zap, Shield, Code, Server } from "lucide-react";
import { Terminal } from "@/components/Terminal";

export const About = () => (
  <SectionWrapper>
    <section id="about" className="space-y-10 md:space-y-12 py-10">
      <div className="flex flex-col gap-2">
        <span className="section-title">01. Background</span>
        <h2 className="text-2xl md:text-5xl font-medium tracking-tight">Background</h2>
        <p className="text-muted-foreground text-base md:text-lg font-light">A brief overview of my focus and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Text Block */}
        <div className="md:col-span-2 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col justify-center gap-6 hover:border-primary/30 transition-all duration-500">
          <h3 className="text-xl md:text-3xl font-medium leading-relaxed tracking-tight">
            Passionate about <span className="text-primary italic">high-concurrency systems</span> and <span className="text-primary font-medium">asynchronous architectures</span>.
          </h3>
          <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
            I turn complex requirements into efficient solutions while writing clean, maintainable code and continuously optimizing workflows for long-term scalability.
          </p>
        </div>

        {/* Stat 1 */}
        <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col justify-between gap-8 hover:border-primary/30 transition-all duration-500">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Code className="h-6 w-6" />
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-medium tracking-tighter">
              {new Date().getFullYear() - 2023}+
            </p>
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">Years of Dev</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col justify-between gap-8 hover:border-primary/30 transition-all duration-500">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-medium tracking-tighter">80%</p>
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">Automation Efficiency</p>
          </div>
        </div>

        {/* Terminal Component (Replacing Stat 3) */}
        <div className="md:col-span-2 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
          <Terminal />
        </div>

      </div>
    </section>
  </SectionWrapper>
);
