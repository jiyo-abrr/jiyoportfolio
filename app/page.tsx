import { ScrollArea } from "@/components/ui/scroll-area";
import Squares from "@/components/visuals/Squares";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import {
  TechStacks,
  Education,
} from "@/components/sections/SkillsAndEducation";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { MobileAura } from "@/components/visuals/MobileAura";

export default function Portfolio() {
  return (
    <main className="relative min-h-dvh w-full bg-background selection:bg-primary/10">
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
          className="opacity-35"
        />

        {/* Dynamic Mobile Energy */}
        <MobileAura />
      </div>

      <Header />

      {/* Main Content Area */}
      <div className="relative z-10 w-full overflow-x-hidden">
        <div className="flex flex-col">
          <Hero />

          <div className="relative z-20 mt-12 md:mt-20">
            <LogoMarquee />
          </div>

          <div className="container mx-auto px-6 pt-16 md:pt-24 pb-20 md:py-32 max-w-5xl space-y-24 md:space-y-48">
            <About />
            <Experience />
            <Education />
            <TechStacks />
            <Projects />
            <Contact />
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
