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
        type: "Full Time",
        description: [
          "<strong>Led development</strong> of <strong>HRIS</strong> and <strong>inventory/asset management</strong> systems, implementing features from requirements through deployment and maintenance, <strong>reducing operational effort by ~80%</strong> through workflow automation and system integration.",
          "<strong>Developed client-facing</strong> web-based <strong>demonstration platforms</strong> to support stakeholder engagements, enabling <strong>clear visualization</strong> of system capabilities and workflows.",
          "<strong>Engineered ASP.NET integration</strong> with <strong>high-security printing SDKs</strong>, implementing <strong>ID data mapping</strong> and <strong>API orchestration</strong> to support secure card personalization workflows.",
          "<strong>Contributed</strong> to the development of a compliance-driven <strong>SaaS platform</strong> for regulated asset distribution by building <strong>backend services</strong> using <strong>FastAPI</strong> within a <strong>distributed system architecture</strong>.",
          "<strong>Managed Podman-based deployments</strong> and maintained <strong>Ubuntu production servers</strong> via <strong>Webmin</strong> for system administration, supporting application hosting and operational workflows.",
          "<strong>Led technical guidance</strong> for <strong>interns</strong> through code reviews, task decomposition, and hands-on support within an <strong>Agile development environment</strong>."
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
    location: "Spokane, WA, USA — Remote",
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
