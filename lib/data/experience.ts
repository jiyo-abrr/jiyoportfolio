export interface Role {
  role: string;
  period: string;
  type: string;
  description: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  logo: string;
  invertLogo?: boolean;
  location: string;
  roles: Role[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "fmc",
    company: "FMC Research Solutions Inc.",
    logo: "/fmc-logo.png",
    location: "Mandaluyong, PH",
    roles: [
      {
        role: "Junior Software Developer",
        period: "Dec 2025 – Present",
        type: "Full-time",
        description: [
          "<strong>Engineered</strong> and enhanced enterprise web applications using <strong>Next.js and Laravel</strong> in <strong>Dockerized</strong> environments, improving system stability.",
          "<strong>Architected</strong> the company’s inventory management system, <strong>reducing manual efforts by 80%</strong> through automated system integration.",
          "<strong>Implemented</strong> a <strong>RabbitMQ</strong> producer–consumer architecture for ID processing, enabling <strong>asynchronous task execution</strong> and high concurrency.",
          "<strong>Collaborated</strong> in <strong>Agile</strong> workflows, resolving complex bugs and incorporating feedback from senior developers.",
          "<strong>Automated</strong> complex accounting and inventory workflows using <strong>ERPNext</strong>, significantly reducing reconciliation time.",
          "<strong>Integrated</strong> hardware SDKs (<strong>Face Detection, MRZ, NFC</strong>) for identity verification, ensuring reliable device communication.",
          "<strong>Mentored</strong> software developer interns, providing code reviews and technical guidance."
        ]
      },
      {
        role: "Software Developer Intern",
        period: "Aug 2025 – Nov 2025",
        type: "Internship",
        description: [
          "<strong>Developed</strong> scalable frontend components using <strong>Next.js</strong> and <strong>Material UI</strong>.",
          "<strong>Maintained</strong> backend services and <strong>RESTful APIs</strong> using <strong>Laravel</strong>.",
          "<strong>Validated</strong> API endpoints using <strong>Postman</strong> to ensure reliable functionality.",
          "<strong>Managed</strong> version control and collaborative workflows using <strong>Git and Bitbucket</strong>."
        ]
      }
    ]
  },
  {
    id: "lamina",
    company: "Lamina Studios, LLC",
    logo: "/lamina-logo.png",
    invertLogo: true,
    location: "Spokane, WA (Remote)",
    roles: [
      {
        role: "Full Stack Web Developer Intern",
        period: "Aug 2024 – Sep 2024",
        type: "Remote",
        description: [
          "<strong>Contributed</strong> to full-stack applications following <strong>MVC architecture</strong>.",
          "<strong>Built</strong> responsive frontend components using <strong>Vue.js</strong> and <strong>Tailwind CSS</strong>.",
          "<strong>Developed</strong> backend services with <strong>Laravel</strong> and <strong>PostgreSQL</strong> to support scalable features."
        ]
      }
    ]
  }
];
