import { ScrollArea } from "@/components/ui/scroll-area";
import Squares from "@/components/Squares";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { TechStacks, Education } from "@/components/sections/SkillsAndEducation";
import { Projects } from "@/components/sections/Projects";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Portfolio() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background selection:bg-primary/10">
      <LoadingScreen />
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
        
        <Squares 
          direction="diagonal"
          speed={0.1}
          squareSize={40}
          borderColor="var(--square-line)"
          hoverFillColor="var(--square-hover)"
          className="opacity-100"
        />
      </div>

      <Header />

      {/* Main Content Area */}
      <ScrollArea className="relative z-10 h-screen w-full">
        <div className="flex flex-col">
          
          <div className="container mx-auto px-6 max-w-5xl">
            <Hero />
          </div>

          <LogoMarquee />

          <div className="container mx-auto px-6 py-32 max-w-5xl space-y-32 md:space-y-48">
            <About />
            <Experience />
            <Projects />
            <TechStacks />
            <Education />
          </div>

          {/* Footer Section */}
          <footer className="mt-20 border-t border-border/50 py-16 bg-secondary/10">
             <div className="container mx-auto px-6 max-w-5xl">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                  <div className="space-y-4">
                    <p className="text-2xl font-medium tracking-tight text-foreground">
                      Jeo Abarre<span className="text-primary">.</span>
                    </p>
                    <p className="text-sm text-muted-foreground font-light max-w-sm leading-relaxed">
                      Building the architecture of tomorrow. Focused on resilience, performance, and clean design.
                    </p>
                  </div>

                  <div className="flex gap-10">
                    <div className="space-y-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Connect</p>
                      <ul className="space-y-2">
                         <li><a href="https://github.com/jiyo-abrr" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">GitHub</a></li>
                         <li><a href="https://www.linkedin.com/in/jeo-abarre" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">LinkedIn</a></li>
                         <li><a href="mailto:jeoabarre.dev@gmail.com" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Email</a></li>
                      </ul>
                    </div>
                  </div>
               </div>
               
               <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-muted-foreground font-light">
                    &copy; {new Date().getFullYear()} Jeo C. Abarre.
                  </p>
                  <p className="text-xs text-muted-foreground font-light">
                    Manila, Philippines
                  </p>
               </div>
             </div>
          </footer>
        </div>
      </ScrollArea>
    </main>
  );
}
