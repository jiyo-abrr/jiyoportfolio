"use client"

import { SectionWrapper } from "@/components/SectionWrapper";
import Image from "next/image";
import { motion } from "framer-motion";

const techGroups = [
  {
    title: "Programming Languages",
    items: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    ]
  },
  {
    title: "Frontend Development",
    items: [
      { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Material UI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
      { name: 'shadcn/ui', logo: '/favicon.ico' },
    ]
  },
  {
    title: "Backend & Systems",
    items: [
      { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
      { name: 'SpringBoot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'ASP.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
      { name: 'RabbitMQ', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg' },
      { name: 'Kafka', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
    ]
  },
  {
    title: "Databases & Cloud",
    items: [
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ]
  },
  {
    title: "OS & Version Control",
    items: [
      { name: 'Windows', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
      { name: 'Ubuntu', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg' },
      { name: 'MacOS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Bitbucket', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg' },
    ]
  },
  {
    title: "Tools & Design",
    items: [
      { name: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'VSCode', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Anaconda', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg' },
    ]
  }
];

export const TechStacks = () => (
  <SectionWrapper>
    <section id="skills" className="py-10">
      <div className="space-y-16">
        <div className="space-y-4">
          <span className="section-title">04. Technical Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">Tech Stacks</h2>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            A curated selection of tools and technologies I use to build robust, scalable systems.
          </p>
        </div>
        
        <div className="space-y-8">
          {techGroups.map((group, idx) => (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass hover:border-primary/30 transition-all duration-500"
            >
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground md:w-48 shrink-0">
                {group.title}
              </h3>
              
              <div className="flex flex-wrap gap-5 md:gap-8">
                {group.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center gap-3 group/item"
                  >
                    <div className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-300">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        className="object-contain drop-shadow-sm group-hover/item:drop-shadow-md transition-all"
                      />
                    </div>
                    <span className="text-[8px] md:text-[9px] font-medium text-muted-foreground/40 group-hover/item:text-primary uppercase tracking-wider transition-colors duration-300">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </SectionWrapper>
);

export const Education = () => (
  <SectionWrapper>
    <section id="education" className="py-10">
      <div className="space-y-12">
        <span className="section-title">05. Academic Foundation</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-start md:items-center gap-6 md:gap-8">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="relative h-20 w-20 md:h-28 md:w-28 shrink-0"
              >
                <Image 
                  src="/pup-logo.png" 
                  alt="PUP Logo" 
                  fill 
                  className="object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-3xl font-medium tracking-tight text-foreground leading-tight">Polytechnic University of the Philippines</h3>
                <p className="text-sm md:text-lg text-muted-foreground font-light italic">Manila, PH</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-primary font-medium tracking-tight">Bachelor of Science in Computer Science</p>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-1 text-[10px] md:text-sm font-mono text-muted-foreground">
                 <span className="px-3 py-1 rounded bg-secondary/50 border border-border shadow-sm">Oct 2021 – Sep 2025</span>
                 <span className="px-3 py-1 rounded bg-secondary/50 border border-border shadow-sm text-foreground">DOST-SEI Undergraduate Scholar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="glass p-6 md:p-8 rounded-2xl flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all">
               <p className="text-3xl md:text-4xl font-light text-primary group-hover:scale-110 transition-transform">1.29</p>
               <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2">Cumulative GWA</p>
            </div>
            <div className="glass p-6 md:p-8 rounded-2xl flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all">
               <p className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">Magna Cum Laude</p>
               <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-2">Latin Honors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SectionWrapper>
);
