import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import TechStackSection from "@/components/TechStackSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import GitHubContributionsSection from "@/components/GitHubContributionsSection";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="mx-auto flex min-h-dvh w-full max-w-[740px] flex-col px-4 py-5 sm:px-5 sm:py-7">
        <Header />
        <div className="my-4 h-px w-full bg-[var(--color-border)]" />
        <TechStackSection />
        <div className="my-4 h-px w-full bg-[var(--color-border)]" />
        <WorkExperienceSection />
        <div className="my-4 h-px w-full bg-[var(--color-border)]" />
        <Timeline showHeader={true} showAll={true} limit={3} />
        <div className="my-4 h-px w-full bg-[var(--color-border)]" />
        <GitHubContributionsSection />
        <Footer />
      </main>
    </PageTransition>
  );
}
