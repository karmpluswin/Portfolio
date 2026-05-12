export type Project = {
  date: string;
  name: string;
  github: string;
  live?: string;
  image?: string;
  description?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    date: "May 2026",
    name: "Coming soon",
    github: "#",
    live: "#",
    image: "/project.jpg",
    description: "Coming soon.",
    featured: true,
  },
  {
    date: "May 2026",
    name: "Coming soon",
    github: "#",
    live: "#",
    image: "/project2.jpg",
    description: "Coming soon.",
    featured: true,
  },
  {
    date: "May 2026",
    name: "Coming soon",
    github: "#",
    live: "#",
    image: "/project3.jpg",
    description: "Coming soon.",
    featured: true,
  },
];
