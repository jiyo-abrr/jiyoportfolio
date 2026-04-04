export interface TechItem {
  name: string;
  logo: string;
  invertLogo?: boolean;
}

export interface TechGroup {
  title: string;
  items: TechItem[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    title: "Programming Languages",
    items: [
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "C#",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      },
    ],
  },
  {
    title: "Frontend & UI/UX",
    items: [
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        invertLogo: true,
      },
      {
        name: "React.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Material UI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
      },
      { name: "shadcn/ui", logo: "/shadcn.svg", invertLogo: true },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "HTML",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
    ],
  },
  {
    title: "Backend & Architecture",
    items: [
      {
        name: "FastAPI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        name: "Laravel",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      },
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "SpringBoot",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      },
      {
        name: "Flask",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
        invertLogo: true,
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        invertLogo: true,
      },
      {
        name: "ASP.NET",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
      },
      {
        name: "RabbitMQ",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg",
      },
      {
        name: "Kafka",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        invertLogo: true,
      },
    ],
  },
  {
    title: "Data & Storage",
    items: [
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Redis",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        name: "Elasticsearch",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Supabase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      },
    ],
  },
  {
    title: "Infrastructure & Automation",
    items: [
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Podman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/podman/podman-original.svg",
      },
      {
        name: "Vercel",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        invertLogo: true,
      },
      {
        name: "Webmin",
        logo: "https://cdn.simpleicons.org/webmin",
      },
      {
        name: "Bash",
        logo: "/bash-icon.svg",
        invertLogo: true,
      },
      {
        name: "Makefile",
        logo: "/code-icon.svg",
        invertLogo: true,
      },
    ],
  },
  {
    title: "Development Tools",
    items: [
      {
        name: "Antigravity",
        logo: "https://cdn.simpleicons.org/googlegemini",
        invertLogo: true,
      },
      {
        name: "VSCode",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
      {
        name: "Anaconda",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg",
      },
      {
        name: "DBeaver",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dbeaver/dbeaver-original.svg",
      },
      {
        name: "DBngin",
        logo: "/dbngin.svg",
      },
    ],
  },
  {
    title: "Version Control",
    items: [
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        invertLogo: true,
      },
      {
        name: "Fork",
        logo: "https://git-fork.com/favicon.ico",
      },
      {
        name: "Bitbucket",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
      },
      {
        name: "GitLab",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
      },
    ],
  },
  {
    title: "Platforms & OS",
    items: [
      {
        name: "MacOS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
        invertLogo: true,
      },
      {
        name: "Ubuntu",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg",
      },
      {
        name: "Debian",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg",
      },
      {
        name: "Windows",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
      },
    ],
  },
];
