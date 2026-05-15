"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TECH_STACK = [
  { name: "TypeScript", icon: "/stack/typescript.svg", url: "https://www.typescriptlang.org/" },
  { name: "JavaScript", icon: "/stack/javascript.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Java", icon: "/stack/java.svg", url: "https://www.java.com/" },
  { name: "Spring Boot", icon: "/stack/spring.svg", url: "https://spring.io/" },
  { name: "Node.js", icon: "/stack/nodejs.svg", url: "https://nodejs.org/" },
  { name: "Bun", icon: "/stack/bun.svg", url: "https://bun.sh/" },
  { name: "React", icon: "/stack/react.svg", url: "https://react.dev/" },
  { name: "Next.js", icon: "/stack/nextjs.svg", url: "https://nextjs.org/" },
//   { name: "Angular", icon: "/stack/angular.svg", url: "https://angular.io/" },
  { name: "Tailwind CSS", icon: "/stack/tailwindcss.svg", url: "https://tailwindcss.com/" },
  { name: "Bootstrap", icon: "/stack/bootstrap.svg", url: "https://getbootstrap.com/" },
//   { name: "shadcn/ui", icon: "/stack/shadcn-ui.svg", url: "https://ui.shadcn.com/" },
//   { name: "Radix UI", icon: "/stack/radixui.svg", url: "https://www.radix-ui.com/" },
  { name: "Motion", icon: "/stack/motion.svg", url: "https://motion.dev/" },
  { name: "Redux", icon: "/stack/redux.svg", url: "https://redux.js.org/" },
  { name: "Git", icon: "/stack/git.svg", url: "https://git-scm.com/" },
  { name: "Docker", icon: "/stack/docker.svg", url: "https://www.docker.com/" },
  { name: "MySQL", icon: "/stack/mysql.svg", url: "https://www.mysql.com/" },
  { name: "MongoDB", icon: "/stack/mongodb.svg", url: "https://www.mongodb.com/" },
  { name: "Redis", icon: "/stack/redis.svg", url: "https://redis.io/" },
  { name: "Figma", icon: "/stack/figma.svg", url: "https://www.figma.com/" },
];

export default function TechStackSection() {
  return (
    <TooltipProvider>
      <section className="w-full">
        <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--secondary)]">
          Tech Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
          {TECH_STACK.map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger asChild>
                <Link
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md transition-all"
                  aria-label={tech.name}
                >
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={32}
                    height={32}
                    className="size-8 sm:size-9 object-contain grayscale hover:grayscale-0 transition-all duration-200"
                    priority={false}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="rounded-md bg-slate-900 dark:bg-slate-100 px-2 py-1 text-xs font-medium text-white dark:text-slate-900 shadow-lg">
                {tech.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>
    </TooltipProvider>
  );
}
