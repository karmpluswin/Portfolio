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
    name: "Kairo",
    github: "https://github.com/karmpluswin/Kairo",
    live: "https://kairo-tracker.vercel.app",
    image: "/kairo.png",
    description: "A clean, minimal seasonal anime tracker. Browse currently airing shows, track your watch progress episode by episode and filter by genre, all powered by the Jikan MAL API.",
    featured: true,
  },
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
    name: "Link Forge",
    github: "https://github.com/karmpluswin/Linkforge",
    live: "https://linkforge-online.vercel.app/",
    image: "/linkforge.png",
    description: "A production-ready URL shortener with authentication, analytics, and QR code generation.Built with Next.js, Express.js, MongoDB, and TypeScript for a fast, scalable experience",
    featured: true,
  },
];
