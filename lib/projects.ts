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
    date: "June 2026",
    name: "ChatVibe",
    github: "https://github.com/karmpluswin/ChatVibe",
    live: "https://chatvibe-online.vercel.app/",
    image: "/chatvibe.png",
    description: "Real-time chat app with 1-on-1 & group messaging, emoji reactions, file sharing, and OAuth, built with Next.js 14, Socket.io, MongoDB & Framer Motion.",
    featured: true,
  },
  {
    date: "June 2026",
    name: "Coming soon",
    github: "#",
    live: "#",
    image: "/project2.jpg",
    description: "Coming soon.",
    featured: true,
  },
  {
    date: "June 2026",
    name: "Coming soon",
    github: "#",
    live: "#",
    image: "/project3.jpg",
    description: "Coming soon.",
    featured: true,
  },
];
