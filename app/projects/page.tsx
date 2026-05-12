import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import ThemeToggle from "@/components/ThemeToggle";
import { PageTransition } from "@/components/PageTransition";
import { nameFont } from "@/app/fonts";

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="mx-auto flex min-h-dvh w-full max-w-[740px] flex-col px-4 py-5 sm:px-5 sm:py-7">
        <div className="mb-2 flex items-center justify-between">
          <h1
            className={`${nameFont.className} text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--text)] sm:text-[38px]`}
          >
            Projects
          </h1>
          <div className="inline-flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1 rounded-md border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--text)] hover:bg-[var(--line)]/50 transition-colors"
            >
              <ArrowLeftIcon className="size-4" />
              <span>back</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div className="my-6 h-px w-full bg-[var(--line)]" />

        <Timeline
          showHeader={false}
          showAll={false}
          showImages
          showProjectDividers
          alwaysShowDescription
        />

        <div className="mt-auto pt-10">
          <Footer />
        </div>
      </main>
    </PageTransition>
  );
}
