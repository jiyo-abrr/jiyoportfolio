import { SectionWrapper } from "@/components/SectionWrapper";
import { Zap, Shield, Code, Server } from "lucide-react";

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
            I craft systems that don't just <span className="text-primary italic">work</span>, but <span className="text-primary font-medium">endure</span>.
          </h3>
          <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
            With a background in high-concurrency architecture and asynchronous workflow design, I bridge the gap between complex industrial requirements and scalable software solutions. My approach is surgical: identify the bottleneck, engineer the solution, and ensure long-term stability.
          </p>
        </div>

        {/* Stat 1 */}
        <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col justify-between gap-8 hover:border-primary/30 transition-all duration-500">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Code className="h-6 w-6" />
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-medium tracking-tighter">3+</p>
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
            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">Manual Effort Cut</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="md:col-span-2 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 md:gap-12 hover:border-primary/30 transition-all duration-500">
           <div className="space-y-3 flex-1">
             <div className="flex items-center gap-3 text-primary mb-2 md:mb-4">
               <Shield className="h-4 w-4 md:h-5 md:w-5" />
               <span className="text-[9px] md:text-xs font-semibold uppercase tracking-widest">Resilience</span>
             </div>
             <p className="font-medium text-lg md:text-xl tracking-tight">Fault-Tolerant</p>
             <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">Building reliable systems utilizing RabbitMQ and containerized deployments.</p>
           </div>
           <div className="w-px h-24 bg-border/50 hidden sm:block" />
           <div className="space-y-3 flex-1">
             <div className="flex items-center gap-3 text-primary mb-2 md:mb-4">
               <Zap className="h-4 w-4 md:h-5 md:w-5" />
               <span className="text-[9px] md:text-xs font-semibold uppercase tracking-widest">Performance</span>
             </div>
             <p className="font-medium text-lg md:text-xl tracking-tight">Sub-second Latency</p>
             <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">Optimized querying and caching for high-throughput enterprise environments.</p>
           </div>
        </div>

      </div>
    </section>
  </SectionWrapper>
);
