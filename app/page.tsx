import { ScrollArea } from "@/components/ui/scroll-area";
import Squares from "@/components/Squares";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { TechStacks, Education } from "@/components/sections/SkillsAndEducation";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Portfolio() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background selection:bg-primary/10">
      <LoadingScreen />
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.03),transparent_70%)]" />
        
        <Squares 
          direction="diagonal"
          speed={0.1}
          squareSize={40}
          borderColor="var(--square-line)"
          hoverFillColor="var(--square-hover)"
          className="opacity-30"
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

          <div className="container mx-auto px-6 py-20 md:py-32 max-w-5xl space-y-24 md:space-y-48">
            <About />
            <Experience />
            <Projects />
            <TechStacks />
            <Education />
            <Contact />
          </div>

          <Footer />
        </div>
      </ScrollArea>
    </main>
  );
}
