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
        type: "Internship",
        description: [
          "<strong>Led development</strong> of internal <strong>HRIS</strong> and <strong>Inventory / Asset Management</strong> systems, implementing features from requirements through deployment and maintenance, <strong>reducing operational effort by ~80%</strong> through workflow automation and system integration.",
          "<strong>Contributed</strong> to the development of a compliance-driven <strong>SaaS platform</strong> for regulated asset distribution by building <strong>backend services</strong> using <strong>FastAPI</strong> within a <strong>distributed system architecture</strong> following defined system design requirements.",
          "<strong>Implemented backend services</strong> and integrations using <strong>PostgreSQL</strong> and <strong>MongoDB</strong> for data persistence, and integrated <strong>Redis (caching)</strong>, <strong>RabbitMQ (asynchronous processing)</strong>, and <strong>Elasticsearch (search indexing)</strong> to support scalable background processing, low-latency operations, and full-text search functionality.",
          "<strong>Managed Podman-based deployments</strong> and maintained <strong>Ubuntu production servers</strong> via <strong>Webmin</strong> for system administration, supporting application hosting and operational workflows.",
          "<strong>Coordinated</strong> and provided <strong>technical guidance</strong> to a team of junior developers and interns through code reviews, task decomposition, and hands-on development support within an <strong>Agile environment</strong>."
        ]
      },
      {
        role: "Software Developer Intern",
        period: "Aug 2025 – Nov 2025",
        type: "Internship",
        description: [
          "<strong>Built</strong> scalable frontend components using <strong>Next.js</strong> and the <strong>Material UI</strong>.",
          "<strong>Developed</strong> and maintained backend services and <strong>RESTful APIs</strong> using <strong>Laravel</strong>.",
          "<strong>Tested and validated</strong> API endpoints using <strong>Postman</strong> to ensure proper functionality.",
          "<strong>Applied</strong> Git-based version control practices using <strong>Bitbucket</strong> and <strong>Fork</strong>."
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
        type: "Internship",
        description: [
          "<strong>Contributed</strong> to a full-stack web application following <strong>MVC architecture</strong>.",
          "<strong>Built</strong> responsive frontend components using <strong>Vue.js</strong> and <strong>Tailwind CSS</strong>.",
          "<strong>Developed</strong> backend services with <strong>Laravel</strong> and <strong>PostgreSQL</strong> to support scalable features."
        ]
      }
    ]
  }
];
